import { FC } from 'react';
import c from 'classnames';
import styles from './text.module.scss';

interface Props {
  text: string;
  mTop?: number;
  bold?: boolean;
  size?: number;
}

const Text: FC<Props> = ({ text, bold = false, mTop = 0, size = '' }) => {
  return (
    <div
      style={{ marginTop: `${mTop}px`, fontSize: size && `${size}px` }}
      className={c(styles.text, bold && styles.bold)}
    >
      {text}
    </div>
  );
};

export default Text;
