import { FC, ChangeEvent } from 'react';
import Input from 'components/commons/Input';
import Button from 'components/commons/Button';
import InputStore from 'stores/InputStore';
import styles from './userForm.module.scss';

interface Props {
  username: InputStore;
  startGame: () => void;
  handleUsername: (e: ChangeEvent<HTMLInputElement>) => void;
}

const UserForm: FC<Props> = ({ handleUsername, startGame, username }) => {
  return (
    <>
      <div className={styles.inputUsername}>
        <Input
          name="Username"
          label="Username"
          inputStore={username}
          onChange={handleUsername}
          placeholder="Write your username..."
        />
      </div>
      <div className={styles.buttonUsername}>
        <Button onClick={startGame} secundary text="Start" />
      </div>
    </>
  );
};

export default UserForm;
