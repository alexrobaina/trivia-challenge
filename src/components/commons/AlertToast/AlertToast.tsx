import { useEffect, FC } from 'react';
import { observer } from 'mobx-react-lite';
import { IoMdClose } from 'react-icons/io';
import c from 'classnames';
import styles from './alertToast.module.scss';

interface Props {
  text: string;
  warning?: boolean;
  toggleToast?: boolean;
  handleToggleToast: (boolean) => void;
}

const AlertToast: FC<Props> = ({
  text,
  warning = false,
  handleToggleToast,
  toggleToast = false,
}) => {
  useEffect(() => {
    if (toggleToast) {
      setTimeout(() => {
        handleToggleToast(false);
      }, 4000);
    }
  }, [toggleToast]);

  return (
    <div
      onClick={() => handleToggleToast(false)}
      className={c(
        styles.container,
        toggleToast && styles.toast,
        warning && styles.warning,
      )}
    >
      <div className={styles.containerIconClose}>
        <IoMdClose size={20} />
      </div>
      <div className={styles.text}>{text}</div>
    </div>
  );
};

export default observer(AlertToast);
