import { useCallback, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';
import Title from 'components/commons/Title';
import Layout from 'components/commons/Layout';
import StoreContext from 'Context/StoreContext';
import Button from 'components/commons/Button';
import { QUESTIONS } from 'routing/routes';
import CardContainer from 'components/commons/CardContainer';
import AnswerCard from 'components/commons/AnswerCard';
import styles from './finish.module.scss';
import Scored from './Scored';

const Finish = () => {
  const history = useHistory();
  const rootStore = useContext(StoreContext);
  const { questionStore } = rootStore;

  const goToQuestions = useCallback(() => {
    history.push(QUESTIONS);
  }, []);

  useEffect(() => {
    questionStore.triviaResults();
    questionStore.calculateScored();
  }, []);
  console.log(questionStore.scored);
  return (
    <Layout>
      <CardContainer>
        <div className={styles.titleContainar}>
          <Title
            size={40}
            lineHeight={48}
            text={`Great! ${questionStore.username.value}`}
          />
        </div>
        <Scored
          scored={questionStore.scored}
          getGoodAnswer={questionStore.getGoodAnswer}
          getBadAnswer={questionStore.getGoodAnswer}
        />
        {questionStore.answers.map((answer) => {
          return (
            <AnswerCard
              key={answer.question}
              question={answer.question}
              isCorrect={answer.isCorrect}
            />
          );
        })}
        <Button onClick={goToQuestions} small marginTop={50} text="PLAY AGAIN" />
      </CardContainer>
    </Layout>
  );
};

export default observer(Finish);
