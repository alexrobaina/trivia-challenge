import { FC, ReactChild, useCallback } from 'react';
import c from 'classnames';
import styles from './button.module.scss';

interface Props {
  big?: boolean;
  mTop?: number;
  text?: string;
  small?: boolean;
  circle?: boolean;
  icon?: ReactChild;
  secundary?: boolean;
  onClick?: Function;
  transparent?: boolean;
}

const Button: FC<Props> = ({
  onClick,
  mTop = 0,
  text = '',
  icon = null,
  big = false,
  small = false,
  circle = false,
  secundary = false,
  transparent = false,
}) => {
  const click = useCallback(() => {
    onClick();
  }, []);

  return (
    <>
      {circle ? (
        <div
          onClick={click}
          className={c(
            styles.button,
            big && styles.big,
            circle && styles.circle,
            secundary && styles.secundary,
            transparent && styles.transparent,
          )}
          style={{ marginTop: `${mTop}px` }}
        >
          {icon}
        </div>
      ) : (
        <div
          onClick={click}
          className={c(
            styles.button,
            small && styles.small,
            secundary && styles.secundary,
            transparent && styles.transparent,
          )}
          style={{ marginTop: `${mTop}px` }}
        >
          <div className={styles.content}>
            {icon && <div className={styles.icon}>{icon}</div>}
            {text && <div className={styles.text}>{text}</div>}
          </div>
        </div>
      )}
    </>
  );
};

Button.defaultProps = {
  icon: null,
  text: null,
  circle: false,
  secundary: false,
  transparent: null,
  onClick: () => {},
};

export default Button;
