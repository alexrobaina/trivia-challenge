import { useCallback, useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Layout from 'components/commons/Layout';
import Title from 'components/commons/Title';
import Text from 'components/commons/Text';
import UserForm from 'components/UserForm';
import ReactModal from 'components/commons/ReactModal';
import StoreContext from 'Context/StoreContext';
import Button from 'components/commons/Button';
import { QUESTIONS } from 'routing/routes';
import CardContainer from 'components/commons/CardContainer';

const Home = () => {
  const history = useHistory();
  const [userNameModal, setUserNameModal] = useState(false);
  const rootStore = useContext(StoreContext);
  const { questionStore } = rootStore;

  const closeModalUser = useCallback(() => {
    setUserNameModal(false);
  }, []);

  const openModalUse = useCallback(() => {
    setUserNameModal(true);
  }, []);

  const handleUsername = useCallback((e) => {
    questionStore.setUsername(e.target.value);
  }, []);

  const goToBegin = useCallback(() => {
    openModalUse();
  }, []);

  const startGame = useCallback(() => {
    questionStore.resetErrors();
    if (questionStore.validations()) {
      history.push(QUESTIONS);
    }
  }, []);

  useEffect(() => {
    questionStore.resetUsername();
    questionStore.resetAnswes();
    questionStore.resetTriviaResults();
  }, []);

  return (
    <Layout>
      <CardContainer>
        <Title text="Welcome to the Trivia Challenge!" />
        <Text marginTop={40} text="You will be presented with 10" />
        <Text text="True or False questions." />
        <Text marginTop={40} bold text="Can you score 100%?" />
        <Button onClick={goToBegin} small marginTop={50} text="BEGIN" />
      </CardContainer>
      <ReactModal
        title="Great! Good luck"
        closeModal={closeModalUser}
        modalIsOpen={userNameModal}
      >
        <UserForm
          startGame={startGame}
          handleUsername={handleUsername}
          username={questionStore.username}
        />
      </ReactModal>
    </Layout>
  );
};

export default observer(Home);
