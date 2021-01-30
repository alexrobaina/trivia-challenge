import { useCallback, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';
import { BiCheck, IoMdClose } from 'react-icons/all';
import Title from 'components/commons/Title';
import Text from 'components/commons/Text';
import Layout from 'components/commons/Layout';
import StoreContext from 'Context/StoreContext';
import Button from 'components/commons/Button';
import { QUESTIONS } from 'routing/routes';
import CardContainer from 'components/commons/CardContainer';
import AnswerCard from 'components/commons/AnswerCard';
import styles from './finish.module.scss';

const Finish = () => {
  const history = useHistory();
  const rootStore = useContext(StoreContext);
  const { questionStore } = rootStore;

  const goToBegin = useCallback(() => {
    history.push(QUESTIONS);
  }, []);

  useEffect(() => {
    questionStore.triviaResults();
  }, []);

  return (
    <Layout>
      <CardContainer>
        <Title size={40} text={`Great! ${questionStore.name.value}`} />
        <div className={styles.scoredContainer}>
          <Text text="You scored is: " />
          <div className={styles.scoredNumber}>
            <span>{questionStore.getGoodAnswer}</span>
            <BiCheck size={23} />
          </div>
          <div className={styles.scoredNumber}>
            <span>{questionStore.getBadAnswer}</span>
            <IoMdClose size={23} />
          </div>
        </div>
        {questionStore.answers.map((answer) => {
          return <AnswerCard question={answer.question} isCorrect={answer.isCorrect} />;
        })}
        <Button onClick={goToBegin} small marginTop={50} text="PLAY AGAIN" />
      </CardContainer>
    </Layout>
  );
};

export default observer(Finish);
