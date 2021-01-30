import { useCallback, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import c from 'classnames';
import { useHistory } from 'react-router-dom';
import { BiCheck, IoMdClose } from 'react-icons/all';
import { motion } from 'framer-motion';
import Title from 'components/commons/Title';
import Text from 'components/commons/Text';
import Layout from 'components/commons/Layout';
import StoreContext from 'Context/StoreContext';
import Button from 'components/commons/Button';
import { QUESTIONS } from 'routing/routes';
import CardContainer from 'components/commons/CardContainer';
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
        <Title text={`Great! ${questionStore.name.value}`} />
        <Text bold size={15} text="You scored is: " />
        <div>{questionStore.badAnswer}</div>
        <div>{questionStore.goodAnswer}</div>
        {questionStore.answers.map((answer) => {
          return (
            <motion.div
              key={answer.question}
              className={c(
                styles.answerdCardContainer,
                !answer.isCorrect && styles.incorrectAnswer,
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className={styles.icon}>
                {answer.isCorrect ? <BiCheck size={30} /> : <IoMdClose size={30} />}
              </div>
              <Text bold size={15} text={answer.question} />
            </motion.div>
          );
        })}
        <Button onClick={goToBegin} small mTop={50} text="PLAY AGAIN" />
      </CardContainer>
    </Layout>
  );
};

export default observer(Finish);
