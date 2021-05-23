import { getEnv, IStateTreeNode } from 'mobx-state-tree';

export const withAccessToken = (self: IStateTreeNode) => ({
  views: {
    get token() {
      return getEnv<string>(self);
    },
  },
});
