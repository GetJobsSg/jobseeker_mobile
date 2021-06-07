import React, { useState } from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import { View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Text } from '..';
import { CONTROLLER_BAR, CONTROLLER_OK } from './sheet.styles';
import { SheetProps } from './sheet.props';
import { windowWidth } from '../../utils/screen';

const HEIGHT = 280;

const noop = () => {};

const Sheet = (props: SheetProps, ref: any) => {
  const [date, setDate] = useState(new Date());
  const { type = 'custom', children, onOK = noop } = props;

  const handleDone = () => {
    ref.current.close();
    onOK(date);
  };

  if (type === 'datePicker') {
    return (
      <RBSheet height={HEIGHT} ref={ref}>
        <View style={CONTROLLER_BAR}>
          <Text style={CONTROLLER_OK} onPress={handleDone}>
            Done
          </Text>
        </View>
        <DatePicker style={{ width: windowWidth }} mode="date" date={date} onDateChange={setDate} />
      </RBSheet>
    );
  }

  return (
    <RBSheet height={HEIGHT} ref={ref}>
      <View style={{ padding: 10 }}>{children}</View>
    </RBSheet>
  );
};
export default React.forwardRef(Sheet);
