export interface OTPVerificationProps {
  cellCount?: number;
  title?: string;
  subTitle?: string;
  initCountdownTimerOnmount?: boolean;
  onConfirm: (code: string) => void;
  onResendOTP: () => void;
  errorText?: string;
}
