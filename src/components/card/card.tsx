import React from 'react';
import { View } from 'react-native';
import { Touchable } from '..';
import { CardProps } from './card.props';
import { BORDER_RADIUS, CONTAINER_WRAPPER, CARD_CONTAINER } from './card.styles';

const Card = (props: CardProps) => {
  const { children, style: containerStyle, onPress } = props;

  return (
    <View style={CONTAINER_WRAPPER}>
      <Touchable style={BORDER_RADIUS} onPress={onPress}>
        <View style={[CARD_CONTAINER, containerStyle]}>{children}</View>
      </Touchable>
    </View>
  );
};

export default Card;
