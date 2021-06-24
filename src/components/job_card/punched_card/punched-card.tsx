import React from 'react';
import { View } from 'react-native';
import { Button, Text, Tag, Row } from '../..';
import { CLOCK_IN_OUT_DETAILS, TIME, CLOCKING_BUTTON_TEXT, CLOCKING_BUTTON } from './punched-card.styles';
import { PunchedCardProps } from './punched-card.props';
import { commonStyles } from '../../../common';

const PunchedCard = (props: PunchedCardProps) => {
  const { title, companyName, date, time, clockInTime, clockOutTime, onPress } = props;

  const renderButton = () => {
    if (clockInTime && clockOutTime) return null;
    return (
      <Button
        textStyle={CLOCKING_BUTTON_TEXT}
        style={CLOCKING_BUTTON}
        block
        preset="outlined"
        label={!clockInTime ? 'Clock In' : 'Clock Out'}
        onPress={onPress}
      />
    );
  };

  return (
    <View style={[commonStyles.CARD_VIEW, { marginBottom: 10 }]}>
      <Text preset="title2">{title}</Text>
      <Text>{companyName}</Text>
      <Row>
        <Tag label={date} />
        <Tag label={time} />
      </Row>
      <Row style={CLOCK_IN_OUT_DETAILS}>
        <View style={{ flex: 1 }}>
          <Text>Clock In</Text>
          <Text style={TIME}>{clockInTime || '-- : --'}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>Clock Out</Text>
          <Text style={TIME}>{clockOutTime || '-- : --'}</Text>
        </View>
      </Row>
      {renderButton()}
    </View>
  );
};

export default PunchedCard;
