import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Routes } from '../../navigator/routes';

type CompanyParamsList = {
  [Routes.company_details]: { id: number };
};

export type CompanyNavigationProp = StackNavigationProp<CompanyParamsList, Routes.company_details>;
export type CompanyDetailsProps = RouteProp<CompanyParamsList, Routes.company_details>;
export type CompanyScreenProps = {
  navigation: CompanyNavigationProp;
  route: CompanyDetailsProps;
};
