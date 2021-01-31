import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import StoreContext from 'Context/StoreContext';
import { observer } from 'mobx-react-lite';
import RootStore from 'stores/RootStore';
import PrivateRoute from 'routing/PrivateRoute';
import Home from 'views/Home';
import Questions from 'views/Questions';
import { QUESTIONS, HOME, FINISH } from 'routing/routes';
import Finish from 'views/Finish';
import Navbar from 'components/Navbar';
import './App.module.scss';

const rootStore = new RootStore();

const navegation = [{ path: HOME, component: Home }];

const privateNavegation = [
  { path: QUESTIONS, component: Questions, redirect: HOME },
  { path: FINISH, component: Finish, redirect: HOME },
];

const App = () => {
  return (
    <StoreContext.Provider value={rootStore}>
      <Router>
        <Navbar />
        <Switch>
          {navegation.map((nav) => {
            return (
              <Route key={nav.path} exact path={nav.path} component={nav.component} />
            );
          })}
          {privateNavegation.map((privateRoute) => {
            return (
              <PrivateRoute
                path={privateRoute.path}
                key={privateRoute.path}
                component={privateRoute.component}
                redirectPath={privateRoute.redirect}
                isAuthenticated={rootStore.questionStore.username.value}
              />
            );
          })}
        </Switch>
      </Router>
    </StoreContext.Provider>
  );
};

export default observer(App);
