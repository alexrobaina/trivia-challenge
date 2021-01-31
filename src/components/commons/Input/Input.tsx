import { useState, FC, ReactChild, useEffect, ChangeEvent } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { observer } from 'mobx-react-lite';
import c from 'classnames';
import InputStore from 'stores/InputStore';
import styles from './input.module.scss';

interface Props {
  value?: any;
  name: string;
  type?: string;
  title?: string;
  inputRef?: any;
  label?: string;
  icon?: ReactChild;
  required?: boolean;
  multiple?: boolean;
  disabled?: boolean;
  placeholder?: string;
  errorMessage?: string;
  inputStore?: InputStore;
  onBlur?: (value: string) => void;
  onKeyPress?: (value: string) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<Props> = ({
  name = '',
  title = '',
  value = '',
  label = '',
  icon = null,
  type = 'text',
  onBlur = null,
  onChange = null,
  inputRef = null,
  required = false,
  multiple = false,
  disabled = false,
  placeholder = '',
  inputStore = null,
  onKeyPress = null,
}) => {
  const [viewPassword, setViewPassword] = useState<string>('password');

  const handleViewPassword = () => {
    if (viewPassword === 'password') {
      setViewPassword('text');
    }
    if (viewPassword === 'text') {
      setViewPassword('password');
    }
  };

  useEffect(() => {
    if (inputRef) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <>
      <div className={styles.containerInput}>
        <label className={styles.label}>{label}</label>
        <input
          name={name}
          title={title}
          ref={inputRef}
          multiple={multiple}
          required={required}
          disabled={disabled}
          onChange={onChange}
          defaultValue={value}
          onBlur={() => onBlur}
          placeholder={placeholder}
          onKeyPress={() => onKeyPress}
          type={type === 'password' ? viewPassword : type}
          className={c(
            styles.input,
            icon && styles.icon,
            inputStore && inputStore.error && styles.isError,
          )}
        />
        {type === 'password' && (
          <div onClick={handleViewPassword} className={styles.viewPassword}>
            {viewPassword === 'text' ? (
              <FaRegEyeSlash size={20} />
            ) : (
              <FaRegEye size={20} />
            )}
          </div>
        )}
        {inputStore?.messageError && (
          <div className={styles.errorMessage}>{inputStore.messageError}</div>
        )}
        {icon && <div className={c(styles.containerIcon)}>{icon}</div>}
      </div>
    </>
  );
};

export default observer(Input);
