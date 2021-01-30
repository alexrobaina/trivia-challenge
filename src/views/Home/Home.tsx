import { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import Layout from 'components/commons/Layout';
import Title from 'components/commons/Title';
import Text from 'components/commons/Text';
import Button from 'components/commons/Button';
import { useHistory } from 'react-router-dom';
import { QUESTIONS } from 'routing/routes';
import CardContainer from 'components/commons/CardContainer';

const Home = () => {
  const history = useHistory();

  const goToBegin = useCallback(() => {
    history.push(QUESTIONS);
  }, []);

  return (
    <Layout>
      <CardContainer>
        <Title text="Welcome to the Trivia Challenge!" />
        <Text mTop={40} text="You will be presented with 10" />
        <Text text="True or False questions." />
        <Text mTop={40} bold text="Can you score 100%?" />
        <Button onClick={goToBegin} small mTop={50} text="BEGIN" />
      </CardContainer>
    </Layout>
  );
};

export default observer(Home);
