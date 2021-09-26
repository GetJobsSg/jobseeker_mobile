export interface OTPVerificationProps {
  cellCount?: number;
  title?: string;
  subTitle?: string;
  initResendCounterOnMount?: false;
  onConfirm: (code: string) => void;
  onResendOTP?: () => void;
  errorText?: string;
}
