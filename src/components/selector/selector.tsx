import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Row, Text } from '..';
import { CONTAINER, VALUE, PLACEHOLDER, ACTION_TEXT, ERROR_HINTS } from './selector.styles';
import { SelectorProps } from './selector.props';
import { spacing } from '../../themes';

const Selector = (props: SelectorProps) => {
  const { actionLabel = 'Edit', error = null, label, placeholder = 'Not Set', value, onPress } = props;

  return (
    <View>
      <TouchableOpacity style={CONTAINER} onPress={onPress}>
        <View>
          <Text preset="labelXXS">{label}</Text>
          <Row justify="space-between" align="center" style={{ paddingTop: spacing.sm, paddingBottom: spacing.xxs }}>
            {value !== '' ? <Text style={VALUE}>{value}</Text> : <Text style={PLACEHOLDER}>{placeholder}</Text>}
            <Text style={ACTION_TEXT}>{actionLabel}</Text>
          </Row>
        </View>
      </TouchableOpacity>
      {error && error.shown && error.message && <Text style={ERROR_HINTS}>{error.message}</Text>}
    </View>
  );
};

export default Selector;
