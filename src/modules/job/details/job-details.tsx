import React from 'react';
import { View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { colors } from '../../../themes';
import { Header, IconButton, Button } from '../../../components';
import { SectionTitle, SectionEmployer, SectionDateTime, SectionTextContent } from '../components';
import { commonStyles } from '../../../common';

const LOREM =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, nam expedita exercitationem debitis ipsum eos reiciendis aperiam tempora quod placeat autem dolores ut? Iure ut optio, dolorum, necessitatibus aperiam tempore dignissimos sed quaerat error explicabo vel officia? Recusandae alias odit doloremque, ab, sequi exercitationem debitis iusto, pariatur hic vero dolor?';

const JobDetails = () => {
  useSafeAreaInsets();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <Header
        style={{ paddingHorizontal: 15 }}
        title="Job Details"
        leftIcon={<IconButton icon="circle_back_btn" onPress={() => {}} />}
      />

      <ScrollView>
        <SectionTitle title="McDelivery Rider" rate="S$12.00 / hour" />
        <SectionEmployer companyName="McDonald Singapore" onPress={() => {}} />
        <SectionDateTime date="14 April 2021" time="09:00am - 18:00pm" />

        <SectionTextContent sectionTitle="Requirement" text={LOREM} />
        <SectionTextContent sectionTitle="Responsibilities" text={LOREM} />
        <SectionTextContent sectionTitle="Location" text="123 Suntec City 99123" />

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={commonStyles.STICKY_BOTTOM}>
        <Button block label="APPLY NOW" onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
};

export default JobDetails;
