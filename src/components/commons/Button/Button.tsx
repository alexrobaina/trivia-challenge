import { FC, ReactChild, useCallback } from 'react';
import c from 'classnames';
import styles from './button.module.scss';

interface Props {
  big?: boolean;
  text?: string;
  small?: boolean;
  circle?: boolean;
  icon?: ReactChild;
  onClick?: Function;
  marginTop?: number;
  secundary?: boolean;
  transparent?: boolean;
}

const Button: FC<Props> = ({
  onClick,
  text = '',
  icon = null,
  big = false,
  small = false,
  marginTop = 0,
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
            circle && styles.circle,
            secundary && styles.secundary,
            transparent && styles.transparent,
          )}
        >
          <div className={c(styles.icon, circle && styles.circle)}>{icon}</div>
        </div>
      ) : (
        <div
          onClick={click}
          className={c(
            styles.button,
            big && styles.big,
            small && styles.small,
            secundary && styles.secundary,
            transparent && styles.transparent,
          )}
          style={{ marginTop: `${marginTop}px` }}
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
