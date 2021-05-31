import { observer } from 'mobx-react-lite';
import React from 'react';
import { View, Text, RefreshControl } from 'react-native';
import { Button, Screen, ProfileHeader, ListTile } from '../../../components';
import LoginHeader from './login-header';
import { useMst } from '../../../store';
import { colors } from '../../../themes';
import { AccountProps } from './main.props';

const MainAccount = (props: AccountProps) => {
  const {
    authStore: { isAuthenticated, logout },
  } = useMst();
  const { navigation } = props;

  return (
    <Screen
      refreshControl={<RefreshControl refreshing={false} onRefresh={() => {}} />}
      preset={isAuthenticated ? 'scroll' : 'fixed'}
    >
      {isAuthenticated ? <ProfileHeader /> : <LoginHeader />}

      <View>
        <ListTile
          leadingIcon="ic_shield_unverified"
          description="You are not eligible to work. Please complete your worker profile and our recruitment team will approach you to validate your identity."
          traillingIcons={['ic_arrow_right']}
          title={<Text style={{ color: colors.textDanger }}>Identity Unverified</Text>}
          onPress={() => navigation.navigate('account.profile')}
        />
        <ListTile
          leadingIcon="ic_wallet"
          traillingIcons={['ic_arrow_right']}
          title="Wallet"
          onPress={() => navigation.navigate('account.wallet')}
        />
        <ListTile
          leadingIcon="ic_job_preferences"
          traillingIcons={['ic_arrow_right']}
          title="Job Preferences"
          onPress={() => navigation.navigate('account.preferences')}
        />
        <ListTile
          leadingIcon="ic_settings"
          traillingIcons={['ic_arrow_right']}
          title="Settings"
          onPress={() => navigation.navigate('account.settings')}
        />
      </View>

      <Button preset="outlined" block label="Logout" onPress={() => logout()} />
    </Screen>
  );
};

export default observer(MainAccount);
