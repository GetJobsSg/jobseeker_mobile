export interface SheetProps {
  children?: React.ReactNode;
  type?: 'datePicker' | 'custom';
  onOK?: (value: any) => void;
}
