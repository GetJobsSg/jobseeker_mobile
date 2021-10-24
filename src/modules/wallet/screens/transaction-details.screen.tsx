import React, { useEffect } from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Routes } from '../../../navigator/routes';
import { Header, ScrollingScreen, IconButton, Text, Icon, Touchable } from '../../../components';
import { colors, spacing, fontSize } from '../../../themes';
import { useMst } from '../../../store';
import { WalletTransactionDetailsProps } from '../types';

const TransactionDetailScreen = () => {
  const navigation = useNavigation();

  const {
    params: { id },
  } = useRoute<WalletTransactionDetailsProps>();

  const {
    authStore: { isAuthenticated },
    transactionInfoStore: {
      getTransactionDetails,
      id: transactionId,
      typeName,
      isPositiveAmount,
      formattedAmountWithoutSign,
      formattedDate,
      approvalStatus,
      isApproved,
      job,
    },
  } = useMst();

  useEffect(() => {
    if (isAuthenticated) {
      getTransactionDetails(id);
    }
  }, [id, getTransactionDetails]);

  const returnApprovalStatusColor = (approved: boolean | null) => {
    if (approved === null) {
      return colors.textWarning;
    }
    if (approved) {
      return colors.textSuccess;
    }

    return colors.textDanger;
  };

  const onSelectJob = (jobId: number) => () => {
    navigation.navigate(Routes.job_stack, { screen: Routes.job_details, params: { id: jobId } });
  };

  return (
    <ScrollingScreen
      appBar={<Header leftIcon={<IconButton icon="circle_back_btn" onPress={() => navigation.goBack()} />} />}
    >
      <View style={{ marginTop: 20 }}>
        <Text preset="title3" style={{ fontWeight: 'bold' }}>
          {isPositiveAmount ? "You've received" : 'We have deducted'}
        </Text>
        <Text
          preset="titleXXL"
          style={{
            color: colors.accent,
            marginTop: spacing.xs,
            marginBottom: spacing.lg,
            fontWeight: 'bold',
          }}
        >
          {formattedAmountWithoutSign}
        </Text>

        <View style={{ height: 2, backgroundColor: colors.lightGrey1, marginTop: 10, marginBottom: 10 }} />

        <View style={{ marginTop: spacing.md }}>
          <Text preset="hint">Date</Text>
          <Text>{formattedDate}</Text>
        </View>

        <View style={{ marginTop: spacing.md }}>
          <Text preset="hint">Type</Text>
          <Text preset="bold">{typeName}</Text>
        </View>
        {job !== null && (
          <Touchable onPress={onSelectJob(job.id)}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.sm }}>
              <View>
                <Text preset="hint">From</Text>
                <Text>{job.title}</Text>
                <Text style={{ fontSize: fontSize.xs }}>{job.company.name}</Text>
              </View>
              <Icon icon="ic_arrow_right" containerStyle={{ alignSelf: 'center' }} />
            </View>
          </Touchable>
        )}

        <View style={{ marginTop: spacing.xl }}>
          <Text preset="hint">Approval Status</Text>
          <Text preset="bold" style={{ color: returnApprovalStatusColor(isApproved) }}>
            {approvalStatus}
          </Text>
        </View>
        <View style={{ marginTop: spacing.sm }}>
          <Text preset="hint">Transaction ID</Text>
          <Text>#{String(transactionId).padStart(10, '0')}</Text>
        </View>
      </View>
    </ScrollingScreen>
  );
};

export default observer(TransactionDetailScreen);
