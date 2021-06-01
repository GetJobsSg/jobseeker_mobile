import { observer } from 'mobx-react-lite';
import React from 'react';
import { View, Text, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Screen, ProfileHeader, ListTile } from '../../../components';
import LoginHeader from './login-header';
import { useMst } from '../../../store';
import { colors } from '../../../themes';
import { Routes } from '../../../navigator/routes';

const Account = () => {
  const {
    authStore: { isAuthenticated },
  } = useMst();
  const navigation = useNavigation();

  return (
    <Screen
      refreshControl={<RefreshControl refreshing={false} onRefresh={() => {}} />}
      preset={isAuthenticated ? 'scroll' : 'fixed'}
    >
      {isAuthenticated ? (
        <View>
          <ProfileHeader />
          <ListTile
            leadingIcon="ic_shield_unverified"
            description="You are not eligible to work. Please complete your worker profile and our recruitment team will approach you to validate your identity."
            traillingIcons={['ic_arrow_right']}
            title={<Text style={{ color: colors.textDanger }}>Incomplete Profile</Text>}
            onPress={() => navigation.navigate(Routes.profile_stack, { screen: Routes.profile_completion })}
          />
          <ListTile
            leadingIcon="ic_wallet"
            traillingIcons={['ic_arrow_right']}
            title="Wallet"
            onPress={() => navigation.navigate(Routes.wallet_stack, { screen: Routes.wallet_overview })}
          />
          {/* <ListTile
            leadingIcon="ic_job_preferences"
            traillingIcons={['ic_arrow_right']}
            title="Job Preferences"
            onPress={() => navigation.navigate('profileStack')}
          /> */}
          <ListTile
            leadingIcon="ic_settings"
            traillingIcons={['ic_arrow_right']}
            title="Settings"
            onPress={() => navigation.navigate(Routes.settings_stack)}
          />
        </View>
      ) : (
        <LoginHeader />
      )}
    </Screen>
  );
};

export default observer(Account);
