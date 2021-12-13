import React from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { Routes } from '../../navigator/routes';
import { ScrollingScreen, Button, ListTile, Header, IconButton, Text } from '../../components';
import { colors } from '../../themes';
import { useMst } from '../../store';

const SettingListScreen = () => {
  const {
    authStore: { isAuthenticated, logout, isLoadingLogout },
  } = useMst();

  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure to logout GetJobs App?', [
      { text: 'Cancel' },
      {
        text: 'Yes',
        onPress: () => {
          logout().then(() => navigation.goBack());
        },
      },
    ]);
  };

  return (
    <ScrollingScreen
      appBar={
        <Header title="Settings" leftIcon={<IconButton icon="circle_back_btn" onPress={() => navigation.goBack()} />} />
      }
    >
      {/* <ListTile traillingIcons={['ic_arrow_right']} title="About" onPress={() => {}} /> */}
      <ListTile
        traillingIcons={['ic_arrow_right']}
        title="Privacy Policy"
        onPress={() => navigation.navigate(Routes.privacyPolicy)}
      />
      <ListTile
        traillingIcons={['ic_arrow_right']}
        title="Terms and Conditions"
        onPress={() => navigation.navigate(Routes.termOfUse)}
      />

      {isAuthenticated && (
        <Button
          preset="outlined"
          style={{ borderColor: colors.lightGrey1, marginTop: 10 }}
          block
          disabled={isLoadingLogout}
          onPress={handleLogout}
          label="Logout"
        >
          <Text style={{ color: colors.darkGrey0 }}>Logout</Text>
        </Button>
      )}
    </ScrollingScreen>
  );
};

export default observer(SettingListScreen);
