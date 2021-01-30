import { ReactNode, FC } from 'react';
import styles from './cardContainer.module.scss';

interface Props {
  children: ReactNode;
}

const CardContainer: FC<Props> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default CardContainer;
