import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Row, Text } from '..';
import { CONTAINER, VALUE, PLACEHOLDER, EDIT, ERROR_HINTS } from './selector.styles';
import { SelectorProps } from './selector.props';

const Selector = (props: SelectorProps) => {
  const { error = null, label, placeholder = 'Not Set', value, onPress } = props;

  return (
    <View>
      <TouchableOpacity style={CONTAINER} onPress={onPress}>
        <Row justify="space-between" align="center">
          <View>
            <Text preset="labelTiny">{label}</Text>
            {value !== '' ? <Text style={VALUE}>{value}</Text> : <Text style={PLACEHOLDER}>{placeholder}</Text>}
          </View>
          <View>
            <Text style={EDIT}>Edit</Text>
          </View>
        </Row>
      </TouchableOpacity>

      {error && error.shown && error.message && <Text style={ERROR_HINTS}>{error.message}</Text>}
    </View>
  );
};

export default Selector;
