import { ReactNode, FC } from 'react';
import styles from './questionCard.module.scss';

interface Props {
  children: ReactNode;
}

const QuestionCard: FC<Props> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default QuestionCard;
