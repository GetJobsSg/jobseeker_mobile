import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { View } from 'react-native';
import { Button, Header, Text, ScrollingScreen, IconButton, Row, Spinner } from '../../../components';
import { Routes } from '../../../navigator/routes';
import { colors, spacing } from '../../../themes';
import { useMst } from '../../../store';
import { IInboxMessage } from '../../../constants/types';

type InboxParamsList = {
  [Routes.inbox_details]: {
    id: number;
    title: string;
    body: string;
    dateReceived: string;
    fullDateReceived: string;
    seen: boolean;
    type: number | null;
    jobId: number | null;
  };
};

export type InboxDetailsProps = RouteProp<InboxParamsList, Routes.inbox_details>;

const InboxDetails = () => {
  const navigation = useNavigation();

  const {
    authStore: { isAuthenticated },
    inboxStore: { updateSeenReceipt, getInboxDetails, isLoadingInboxDetails, inboxDetails },
    jobInfoStore: {
      getJobDetails,
      isLoading: isLoadingJobDetails,
      formattedDate,
      formattedTime,
      formattedHourlyRate,
      isOfferAccepted,
      isOfferDeclined,
      isAllowToAcceptOffer,
      acceptJobOffer,
      declineJobOffer,
    },
  } = useMst();

  const {
    params: { id },
  } = useRoute<InboxDetailsProps>();

  // load inbox message details
  useEffect(() => {
    if (id && isAuthenticated) {
      getInboxDetails(id);
    }
  }, [getInboxDetails, isAuthenticated, id]);

  const { jobId, type, title, body, fullDateReceived, seen } = inboxDetails;

  // after loaded inbox details, load job details if message type is job_offer
  useEffect(() => {
    if (jobId && type === IInboxMessage.JOB_OFFER) {
      getJobDetails(jobId);
    }
  }, [getJobDetails, jobId, type]);

  // update receipt seen
  useEffect(() => {
    if (isAuthenticated && !seen) {
      updateSeenReceipt(id);
    }
  }, [id, isAuthenticated, seen, updateSeenReceipt]);

  const renderActionInfo = () => {
    // user have accepted or declined
    if (isOfferAccepted || isOfferDeclined) {
      return (
        <Text preset="title3" style={{ backgroundColor: colors.lightGrey0, borderRadius: 10, padding: 12 }}>
          {isOfferAccepted && 'You accepted the job offer'}
          {isOfferDeclined && 'You declined the job offer'}
        </Text>
      );
    }

    // job no longer accept offer
    if (!isAllowToAcceptOffer) {
      return (
        <Text preset="title3" style={{ backgroundColor: colors.lightGrey0, borderRadius: 10, padding: 12 }}>
          Job stop accepting candidate
        </Text>
      );
    }

    return (
      <Row>
        <View style={{ flex: 1 }}>
          <Button style={{ width: '100%' }} label="Accept" onPress={() => acceptJobOffer(jobId as number)} />
        </View>
        <View style={{ width: 10 }} />
        <View style={{ flex: 1 }}>
          <Button
            block
            preset="outlined"
            style={{ width: '100%', flex: 1, borderColor: colors.danger }}
            onPress={() => declineJobOffer(jobId as number)}
          >
            <Text style={{ color: colors.danger, fontWeight: 'bold' }}>Declined</Text>
          </Button>
        </View>
      </Row>
    );
  };

  const renderMessageBody = () => {
    // render job offer ui
    // TODO: break this to separate component
    if (type === IInboxMessage.JOB_OFFER) {
      if (isLoadingJobDetails) return <Spinner preset="center" />;

      return (
        <View>
          <Text>{body}</Text>

          <View style={{ marginTop: spacing.sm }}>
            <Text style={{ fontWeight: 'bold' }}>{formattedDate}</Text>
            <Text style={{ fontWeight: 'bold' }}>{formattedTime}</Text>
            <Text style={{ fontWeight: 'bold', color: colors.accent }}>{formattedHourlyRate}</Text>
          </View>

          <View style={{ marginTop: spacing.xl }}>{renderActionInfo()}</View>
        </View>
      );
    }

    return <Text>{body}</Text>;
  };

  if (isLoadingInboxDetails) {
    return <Spinner preset="center" />;
  }

  return (
    <ScrollingScreen
      appBar={
        <Header title="Message" leftIcon={<IconButton icon="circle_back_btn" onPress={() => navigation.goBack()} />} />
      }
    >
      <Text preset="title2" style={{ marginTop: spacing.md }}>
        {title}
      </Text>

      <View style={{ height: 2, backgroundColor: colors.lightGrey1, marginTop: 20, marginBottom: 20 }} />

      {renderMessageBody()}

      <Text preset="hint" style={{ marginTop: spacing.xl }}>
        {fullDateReceived}
      </Text>
    </ScrollingScreen>
  );
};

export default observer(InboxDetails);
