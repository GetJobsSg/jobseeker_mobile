import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { View, Text, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IconTypes } from '../../../components/icon/icons';
import { Screen, ProfileHeader, ListTile } from '../../../components';
import LoginHeader from './login-header';
import { useMst } from '../../../store';
import { colors } from '../../../themes';
import { Routes } from '../../../navigator/routes';

const Account = () => {
  const {
    authStore: { isAuthenticated },
    userStore: { getUser, isLoading, verified },
  } = useMst();
  const navigation = useNavigation();

  useEffect(() => {
    if (isAuthenticated) {
      getUser();
    }
  }, [getUser, isAuthenticated]);

  const handleRefresh = () => {
    if (isAuthenticated) {
      getUser();
    }
  };

  const verification: { icon: IconTypes; description: string; title: React.ReactElement } = verified
    ? {
        icon: 'ic_shield_verified',
        description: 'You are eligible to work.',
        title: <Text style={{ color: colors.primary }}>Profile Verified</Text>,
      }
    : {
        icon: 'ic_shield_unverified',
        description:
          'You are not eligible to work. Please complete your worker profile and our recruitment team will approach you to validate your identity.',
        title: <Text style={{ color: colors.textDanger }}>Incomplete Profile</Text>,
      };

  return (
    <Screen
      refreshControl={<RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />}
      preset={isAuthenticated ? 'scroll' : 'fixed'}
    >
      {isAuthenticated ? (
        <View>
          <ProfileHeader />
          <ListTile
            leadingIcon={verification.icon}
            description={verification.description}
            traillingIcons={['ic_arrow_right']}
            title={verification.title}
            onPress={() => navigation.navigate(Routes.profile_stack, { screen: Routes.profile_completion })}
          />
          <ListTile
            leadingIcon="ic_wallet"
            traillingIcons={['ic_arrow_right']}
            title="Wallet"
            onPress={() => navigation.navigate(Routes.wallet_stack, { screen: Routes.wallet_overview })}
          />
          <ListTile
            leadingIcon="ic_job_preferences"
            traillingIcons={['ic_arrow_right']}
            title="Job Preferences"
            onPress={() => {}}
          />
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
