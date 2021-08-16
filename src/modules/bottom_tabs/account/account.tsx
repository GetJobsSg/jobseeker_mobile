import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { View, Text, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IconTypes } from '../../../components/icon/icons';
import { Screen, ProfileHeader, ListTile } from '../../../components';
import LoginHeader from './login-header';
import { useMst } from '../../../store';
import { colors } from '../../../themes';
import { commonStyles } from '../../../common';
import { IVerificationStatus } from '../../../constants/types';
import { Routes } from '../../../navigator/routes';

const Account = () => {
  const {
    authStore: { isAuthenticated },
    userStore: { getUser, isLoading, verificationStatus },
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

  const getVerificationInfo = () => {
    let verification: { icon: IconTypes; description: string; title: React.ReactElement } = {
      icon: 'ic_shield_unverified',
      description:
        'Please complete your worker profile and our recruitment team will approach you to validate your identity.',
      title: <Text style={{ color: colors.danger }}>Incomplete Profile</Text>,
    };

    if (verificationStatus === IVerificationStatus.PENDING_REVIEW) {
      verification = {
        icon: 'ic_shield_unverified',
        description: 'Your profile is under review. We will send you a notification when it is approved.',
        title: <Text style={{ color: colors.warning }}>Pending Review</Text>,
      };
    }

    if (verificationStatus === IVerificationStatus.REQUIRED_UPDATE) {
      verification = {
        icon: 'ic_shield_unverified',
        description: 'Your profile information provided is ',
        title: <Text style={{ color: colors.danger }}>Update Required</Text>,
      };
    }

    if (verificationStatus === IVerificationStatus.APPROVED) {
      verification = {
        icon: 'ic_shield_verified',
        description: 'You are eligible to work.',
        title: <Text style={{ color: colors.success }}>Profile Verified</Text>,
      };
    }

    // fallback to NOT_INITIATED
    return verification;
  };

  const verification = getVerificationInfo();

  return (
    <Screen
      refreshControl={<RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />}
      preset={isAuthenticated ? 'scroll' : 'fixed'}
      addHorizontalPadding={false}
    >
      {isAuthenticated ? (
        <View>
          <ProfileHeader />
          <View style={commonStyles.SAFE_PADDING}>
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
            {/* <ListTile
              leadingIcon="ic_job_preferences"
              traillingIcons={['ic_arrow_right']}
              title="Job Preferences"
              onPress={() => {}}
            /> */}
            <ListTile
              leadingIcon="ic_settings"
              traillingIcons={['ic_arrow_right']}
              title="Settings"
              onPress={() => navigation.navigate(Routes.settings_stack)}
            />
          </View>
        </View>
      ) : (
        <View style={commonStyles.CONTAINER}>
          <LoginHeader />
        </View>
      )}
    </Screen>
  );
};

export default observer(Account);
