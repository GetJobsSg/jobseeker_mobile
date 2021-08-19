import { Instance, SnapshotOut, types, flow, toGenerator } from 'mobx-state-tree';
import { withErrorHandler } from './extensions';
import { LocationStore } from './location';
import * as apis from '../apis';

export const CompanyStore = types
  .model('CompanyStore')
  .props({
    id: types.optional(types.number, 0),
    name: types.optional(types.string, ''),
    description: types.optional(types.string, ''),
    logo: types.optional(types.string, ''),
    address: types.optional(LocationStore, {}),
    isLoading: types.optional(types.boolean, false),
    error: types.optional(types.string, ''),
  })
  .extend(withErrorHandler)
  .actions((self) => ({
    getCompanyDetails: flow(function* getCompanyDetails(id: number) {
      try {
        self.isLoading = true;
        const { data } = yield* toGenerator(apis.getCompanyDetails(id));
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { company, company_address } = data;

        self.id = company.id;
        self.name = company.name;
        self.description = company.desc;
        self.logo = company.logo_img;

        self.address.id = company_address?.id;
        self.address.address = company_address?.address;
        self.address.postalCode = company_address?.postal_code;
        self.address.blockNo = company_address?.block_no;
        self.address.unitNo = company_address?.unit_no;
      } catch (e) {
        self.error = self.getErrMsg(e);
      } finally {
        self.isLoading = false;
      }
    }),
  }));

type CompanyInstance = Instance<typeof CompanyStore>;
export interface Company extends CompanyInstance {}

type CompanySnapshotType = SnapshotOut<typeof CompanyStore>;
export interface CompanySnapshot extends CompanySnapshotType {}
