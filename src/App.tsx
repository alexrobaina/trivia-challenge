import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import StoreContext from 'Context/StoreContext';
import RootStore from 'stores/RootStore';
import Home from 'views/Home';
import Questions from 'views/Questions';
import { QUESTIONS, HOME, FINISH } from 'routing/routes';
import Finish from 'views/Finish';
import './App.module.scss';

const rootStore = new RootStore();

const navegation = [
  { path: HOME, component: Home },
  { path: QUESTIONS, component: Questions },
  { path: FINISH, component: Finish },
];

const App = () => {
  return (
    <StoreContext.Provider value={rootStore}>
      <Router>
        <Switch>
          {navegation.map((nav) => {
            return (
              <Route key={nav.path} exact path={nav.path} component={nav.component} />
            );
          })}
        </Switch>
      </Router>
    </StoreContext.Provider>
  );
};

export default App;
