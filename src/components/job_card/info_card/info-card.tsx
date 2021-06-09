import React from 'react';
import { View } from 'react-native';
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

const InfoCard = (props: InfoCardProps) => {
  const { title, companyName, location, onPress, rate, date, time } = props;

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
