import { FC } from 'react';
import c from 'classnames';
import styles from './title.module.scss';

interface Props {
  text: string;
  mTop?: number;
  size?: number;
  secundary?: boolean;
}

const Title: FC<Props> = ({ text, mTop = 0, size = '', secundary = false }) => {
  return (
    <div
      style={{ marginTop: `${mTop}px`, fontSize: `${size}px` }}
      className={c(styles.title, secundary && styles.secundary)}
    >
      {text}
    </div>
  );
};

export default Title;
