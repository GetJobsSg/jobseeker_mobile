import React from 'react';
import { observer } from 'mobx-react-lite';
import { ScrollingScreen, Button, ListTile, Header, IconButton, Text } from '../../components';
import { colors } from '../../themes';
import { useMst } from '../../store';

const Settings = (props: any) => {
  const {
    authStore: { isAuthenticated, logout, isLoadingLogout },
  } = useMst();
  const { navigation } = props;

  const handleLogout = () => {
    logout().then(() => {
      navigation.goBack();
    });
  };

  return (
    <ScrollingScreen
      appBar={
        <Header title="Settings" leftIcon={<IconButton icon="circle_back_btn" onPress={() => navigation.goBack()} />} />
      }
    >
      <ListTile traillingIcons={['ic_arrow_right']} title="About" onPress={() => {}} />
      <ListTile traillingIcons={['ic_arrow_right']} title="Privacy Policy" onPress={() => {}} />
      <ListTile traillingIcons={['ic_arrow_right']} title="Terms and Conditions" onPress={() => {}} />

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

export default observer(Settings);
