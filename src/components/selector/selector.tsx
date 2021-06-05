import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Row, Text } from '..';
import { CONTAINER, VALUE, PLACEHOLDER, EDIT } from './selector.styles';
import { SelectorProps } from './selector.props';

const Selector = (props: SelectorProps) => {
  const { label, placeholder = 'Not Set', value, onPress } = props;

  return (
    <TouchableOpacity style={CONTAINER} onPress={onPress}>
      <Row justify="space-between" align="center">
        <View>
          <Text preset="label">{label}</Text>
          {value !== '' ? <Text style={VALUE}>{value}</Text> : <Text style={PLACEHOLDER}>{placeholder}</Text>}
        </View>
        <View>
          <Text style={EDIT}>Edit</Text>
        </View>
      </Row>
    </TouchableOpacity>
  );
};

export default Selector;
