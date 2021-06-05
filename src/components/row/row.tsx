import React from 'react';
import { View, ViewStyle, FlexStyle, FlexAlignType } from 'react-native';
import { RowProps, Align, Justify, JustifyContentType } from './row.props';

const ROW_STYLE = {
  display: 'flex',
  flexDirection: 'row',
} as FlexStyle;

const mapped = (alignment: Align | Justify): FlexAlignType | JustifyContentType => {
  if (alignment === 'top' || alignment === 'start') return 'flex-start';
  if (alignment === 'bottom' || alignment === 'end') return 'flex-end';
  return alignment;
};

const Row = (props: RowProps) => {
  const { children, justify = 'start', align = 'center', wrap = true } = props;

  const wrapStyle = wrap ? ({ flexWrap: 'wrap' } as ViewStyle) : {};
  const alignStyle = { alignItems: mapped(align) } as ViewStyle;
  const justifyStyle = { justifyContent: mapped(justify) } as ViewStyle;

  return <View style={[ROW_STYLE, alignStyle, justifyStyle, wrapStyle]}>{children}</View>;
};

export default Row;
