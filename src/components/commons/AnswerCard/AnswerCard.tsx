import { FC } from 'react';
import c from 'classnames';
import { motion } from 'framer-motion';
import Text from 'components/commons/Text';
import styles from './answerCard.module.scss';

interface Props {
  question: string;
  isCorrect: boolean;
}

const AnswerCard: FC<Props> = ({ question, isCorrect }) => {
  return (
    <motion.div
      key={question}
      whileHover={{ scale: 1.1 }}
      className={c(styles.answerdCardContainer, !isCorrect && styles.incorrectAnswer)}
    >
      <Text bold size={15} text={question} />
    </motion.div>
  );
};

export default AnswerCard;
