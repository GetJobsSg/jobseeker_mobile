import { firebaseErr } from '../../constants';
/** sample firebase error response structure */
// { code: 'auth/user-not-found', message: 'xxx' }

/** sample our own backend error response structure */
// { error: "Internal Server Error" }

const transformFirebaseErrMsg = (str: keyof typeof firebaseErr) => {
  const msg = firebaseErr[str] || 'Something went wrong';
  return msg;
};

export const withErrorHandler = () => ({
  actions: {
    getErrMsg(err: any): string {
      if (!err) return '';

      // is firebase auth error
      if (!err?.response && err?.code?.includes('auth/')) {
        return transformFirebaseErrMsg(err.code); // parse firebase err
      }

      // is our own backend error
      if (err?.response?.data) {
        return err?.response?.data?.error;
      }

      // eslint-disable-next-line no-console
      console.error(err.response);
      return 'Unhandled Error Structure';
    },
  },
});
