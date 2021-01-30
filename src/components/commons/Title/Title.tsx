import { FC } from 'react';
import c from 'classnames';
import styles from './title.module.scss';

interface Props {
  text: string;
  size?: number;
  marginTop?: number;
  lineHeight?: number;
  secundary?: boolean;
}

const Title: FC<Props> = ({
  text,
  size = '',
  marginTop = 0,
  lineHeight = '',
  secundary = false,
}) => {
  return (
    <div
      style={{
        fontSize: `${size}px`,
        marginTop: `${marginTop}px`,
        lineHeight: `${lineHeight}px`,
      }}
      className={c(styles.title, secundary && styles.secundary)}
    >
      {text}
    </div>
  );
};

export default Title;
