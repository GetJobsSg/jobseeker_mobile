import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigation } from '@react-navigation/native';
import { fontSize } from '../../../themes';
import { Screen, Header, IconButton, Text, RadioGroup } from '../../../components';
import { TrainingQuestion } from '../types';
import { useMst } from '../../../store';

const TrainingScreen = () => {
  const navigation = useNavigation();

  const questions: Array<TrainingQuestion> = [
    {
      question: 'Are you clear about the code of conduct that you are supposed to adhere to?',
      isCompleted: 0,
    },
    {
      question: 'Do you know how to get help if a problem arises?',
      isCompleted: 0,
    },
  ];

  const [questionsArr, setQuestionsArr] = useState(questions);

  const {
    userStore: { completeTraining },
  } = useMst();

  const handleComplete = () => {
    completeTraining();
  };

  const setQuestionComplete = (index: number, value: number) => {
    const currQuestions = questionsArr.slice();
    currQuestions[index].isCompleted = value;
    setQuestionsArr(currQuestions);
  };

  const checkQuestionsComplete = () => {
    for (let i = 0; i < questionsArr.length; i++) {
      if (!questionsArr[i].isCompleted) {
        return false;
      }
    }

    return true;
  };

  return (
    <Screen preset="fixed">
      <Header
        title="Training"
        leftIcon={<IconButton icon="circle_back_btn" onPress={() => navigation.goBack()} />}
        rightLabel={checkQuestionsComplete() ? <Text onPress={handleComplete}>Complete</Text> : null}
      />
      {questionsArr.map((data: TrainingQuestion, index: number) => (
        <RadioGroup
          key={index}
          label={data.question}
          labelStyle={{ fontSize: fontSize.xs }}
          value={data.isCompleted}
          onChange={(selected) => setQuestionComplete(index, selected.value as number)}
          options={[
            { label: 'Yes', value: 1 },
            { label: 'No', value: 0 },
          ]}
        />
      ))}
      <Text preset="hint" style={{ marginTop: 10 }}>
        Please note that you will have to answer &apos;Yes&apos; to all of the above in order to complete the training.
      </Text>
    </Screen>
  );
};

export default observer(TrainingScreen);
