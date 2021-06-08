import { getRoot, IStateTreeNode } from 'mobx-state-tree';
import { RootStoreInstance } from '../root/root-store';

export const withRootStore = (self: IStateTreeNode) => ({
  views: {
    get rootStore(): RootStoreInstance {
      return getRoot(self);
    },
  },
});

export default withRootStore;
