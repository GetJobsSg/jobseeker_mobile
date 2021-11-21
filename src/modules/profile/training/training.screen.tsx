import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigation } from '@react-navigation/native';
import { fontSize } from '../../../themes';
import { ScrollingScreen, Header, IconButton, Text, RadioGroup } from '../../../components';
import { useMst } from '../../../store';
import { useSuccess } from '../../../custom_hooks';
import Statements, { QuestionId } from './statement';

const TrainingScreen = () => {
  const navigation = useNavigation();

  const {
    userStore: { hasTatoo, hasDisability, trainingCompleted, completeTraining, isUpdating, error },
  } = useMst();

  const initAnswer = () => {
    const initialAns: { [key: string]: number } = {};

    // training not completed, do not need to initialize
    if (!trainingCompleted) return {};

    // training is completed before, initialize previous answer submitted
    Statements.forEach((statement) => {
      if (statement.id === QuestionId.DISABILITY) initialAns[QuestionId.DISABILITY] = Number(hasDisability);
      else if (statement.id === QuestionId.TATOO) initialAns[QuestionId.TATOO] = Number(hasTatoo);
      else initialAns[statement.id] = 1; // cheked the rest of answer
    });
    return initialAns;
  };

  const [answer, setAnswer] = useState<{ [key: string]: number }>(initAnswer());

  const isAllQuestionAnswered = () => Object.keys(answer).length === Object.keys(Statements).length;

  const handleSubmitAnswer = () => {
    completeTraining({
      has_disability: !!answer[QuestionId.DISABILITY], // cast '0' | '1' to boolean
      has_tattoo: !!answer[QuestionId.TATOO],
      training_completed: true,
    });
  };

  const successUpdateAns = useSuccess({ loadingState: isUpdating, errorState: error });

  useEffect(() => {
    if (successUpdateAns) navigation.goBack();
  }, [navigation, successUpdateAns]);

  return (
    <ScrollingScreen
      appBar={
        <Header
          title="Training"
          leftIcon={<IconButton icon="circle_back_btn" onPress={() => navigation.goBack()} />}
          rightLabel={isAllQuestionAnswered() ? <Text onPress={handleSubmitAnswer}>Complete</Text> : null}
        />
      }
    >
      {Statements.map((statement) => (
        <RadioGroup
          key={statement.id}
          label={statement.statement}
          labelStyle={{ fontSize: fontSize.xs }}
          value={answer[statement.id]}
          onChange={(selected) => setAnswer((prevAns) => ({ ...prevAns, [statement.id]: selected.value }))}
          options={statement.options}
        />
      ))}
    </ScrollingScreen>
  );
};

export default observer(TrainingScreen);
