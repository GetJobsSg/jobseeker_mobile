import React from 'react';
import { View } from 'react-native';
import { ApplicationStatus } from '../../../constants/types';
import { Icon, Row, Tag, Text, Touchable } from '../..';
import { InfoCardProps } from './info-card.props';
import {
  BORDER_RADIUS,
  CARD_AMOUNT,
  CARD_COMPANY,
  CONTAINER_WRAPPER,
  CARD_CONTAINER,
  CARD_LOCATION,
  CARD_TITLE,
} from './info-card.styles';
import { capitalise } from '../../../utils/misc';

const InfoCard = (props: InfoCardProps) => {
  const { applicationStatusId, title, companyName, location, onPress, rate, date, time } = props;

  const getApplicationStatusLabel = () => {
    if (applicationStatusId === undefined) return '';
    if (applicationStatusId === ApplicationStatus.PENDING) return 'Pending Offer';
    return capitalise(ApplicationStatus[applicationStatusId]);
  };

  return (
    <View style={CONTAINER_WRAPPER}>
      <Touchable style={BORDER_RADIUS} onPress={onPress}>
        <View style={CARD_CONTAINER}>
          <Row justify="space-between" align="top">
            <View style={{ flex: 1, paddingRight: 10 }}>
              <Text style={CARD_TITLE}>{title}</Text>
              <Text style={CARD_COMPANY}>{companyName}</Text>
              <Row>
                <Icon icon="location" size={25} style={{ marginLeft: -6 }} />
                <Text style={CARD_LOCATION}>{location}</Text>
              </Row>
            </View>
            <View>
              <Text style={CARD_AMOUNT}>{rate}</Text>
            </View>
          </Row>
          {applicationStatusId !== undefined && (
            <Row>
              <Tag preset="secondary" label={getApplicationStatusLabel()} />
            </Row>
          )}
          <Row>
            <Tag label={date} />
            <Tag label={time} />
          </Row>
        </View>
      </Touchable>
    </View>
  );
};

export default InfoCard;
