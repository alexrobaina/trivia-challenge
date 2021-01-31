import { FC } from 'react';
import { BiCheck } from 'react-icons/bi';
import Text from 'components/commons/Text';
import { IoMdClose } from 'react-icons/io';
import styles from './scored.module.scss';

interface Props {
  scored: number;
  getGoodAnswer: Function;
  getBadAnswer: Function;
}

const Scored: FC<Props> = ({ scored, getBadAnswer, getGoodAnswer }) => {
  return (
    <div className={styles.scoredContainer}>
      <Text text={`You scored is: ${scored}%`} />
      <div className={styles.countAnswers}>
        <Text marginTop={10} text="Result of the questions: " />
        <div className={styles.goodAnswer}>
          {getGoodAnswer}
          <BiCheck size={23} />
        </div>
        <div className={styles.countAnswers}>
          <div className={styles.badAnswer}>
            {getBadAnswer}
            <IoMdClose size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scored;
