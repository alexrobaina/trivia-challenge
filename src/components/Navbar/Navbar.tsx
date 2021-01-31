import { useContext, useCallback } from 'react';
import { BiHomeHeart } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';
import { RiLogoutBoxRFill } from 'react-icons/ri';
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
        {questionStore.name.value && (
          <>
            <div className={styles.user}>
              <Text size={15} text={questionStore.name.value} />
              <Button transparent circle icon={<RiLogoutBoxRFill size={25} />} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
