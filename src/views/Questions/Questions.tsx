import { useEffect, useCallback, useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import Layout from 'components/commons/Layout';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import StoreContext from 'Context/StoreContext';
import Title from 'components/commons/Title';
import Text from 'components/commons/Text';
import { FINISH } from 'routing/routes';
import Button from 'components/commons/Button';
import CardContainer from 'components/commons/CardContainer';
import QuestionCard from 'components/commons/QuestionCard';
import styles from './questions.module.scss';

const Questions = () => {
  const history = useHistory();
  const [cardAnimation, setCardAnimation] = useState(true);
  const rootStore = useContext(StoreContext);
  const { questionStore } = rootStore;

  const handleFalse = useCallback(() => {
    setCardAnimation(false);

    questionStore.setAnswer(
      questionStore.questions[questionStore.nextQuestion - 1],
      'false',
    );
    questionStore.setNextQuestion();
    if (questionStore.nextQuestion > questionStore.totalQuestions) {
      questionStore.resetPositionQuestion();
      history.push(FINISH);
    }
  }, []);

  const handleTrue = useCallback(() => {
    setCardAnimation(false);
    questionStore.setAnswer(
      questionStore.questions[questionStore.nextQuestion - 1],
      'true',
    );
    questionStore.setNextQuestion();
  }, []);

  const animateIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const animateOut = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const { totalQuestions, questions, loading, nextQuestion, question } = questionStore;

  useEffect(() => {
    if (!cardAnimation) {
      setCardAnimation(true);
    }
  }, [cardAnimation]);

  useEffect(() => {
    questionStore.resetAnswes();
    questionStore.resetTriviaResults();
  }, []);

  useEffect(() => {
    if (nextQuestion === 11) {
      questionStore.resetPositionQuestion();
      history.push(FINISH);
    }
    questionStore.formatedQuestion();
  }, [nextQuestion]);

  const pagination = () => {
    return `${nextQuestion}/${totalQuestions}`;
  };

  if (loading) {
    return <div>se ta calgando</div>;
  }

  return (
    <Layout>
      <CardContainer>
        <Title lineHeight={50} size={40} marginTop={-10} text="Trivia Challenge" />
        <div className={styles.wrapperCard}>
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ ease: 'easeOut' }}
            className={styles.questionCardContainer}
            variants={cardAnimation ? animateIn : animateOut}
          >
            <QuestionCard>
              <Title size={28} text={questions[nextQuestion - 1]?.category} />
              <Text marginTop={16} bold text={question} />
              <div className={styles.countQuestions}>
                <Text size={16} text={pagination()} marginTop={10} />
              </div>
            </QuestionCard>
          </motion.div>
        </div>
      </CardContainer>
      <div className={styles.containerButton}>
        <Button text="False" onClick={handleFalse} />
        <Button text="True" onClick={handleTrue} />
      </div>
    </Layout>
  );
};

export default observer(Questions);
