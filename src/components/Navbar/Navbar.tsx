import { useContext, useCallback } from 'react';
import { BiHomeHeart } from 'react-icons/bi';
import { RiLogoutBoxRFill } from 'react-icons/ri';
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';
import Text from 'components/commons/Text';
import StoreContext from 'Context/StoreContext';
import Button from 'components/commons/Button';
import { HOME } from 'routing/routes';
import styles from './navbar.module.scss';

const Navbar = () => {
  const history = useHistory();
  const rootStore = useContext(StoreContext);
  const { questionStore } = rootStore;

  const goToBegin = useCallback(() => {
    history.push(HOME);
  }, []);

  const logout = useCallback(() => {
    questionStore.resetUsername();
    history.push(HOME);
  }, []);

  return (
    <div className={styles.navbar}>
      <div className={styles.col}>
        <div className={styles.containerButton}>
          <Button
            circle
            transparent
            onClick={goToBegin}
            icon={<BiHomeHeart size={25} />}
          />
        </div>
        {questionStore.username.value && (
          <>
            <div className={styles.user}>
              <div className={styles.nameContainer}>
                <Text bold size={15} text={questionStore.username.value} />
              </div>
              <Button
                circle
                transparent
                onClick={logout}
                icon={<RiLogoutBoxRFill size={25} />}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default observer(Navbar);
