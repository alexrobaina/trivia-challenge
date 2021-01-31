import { FC, ReactNode, createElement } from 'react';
import { observer } from 'mobx-react-lite';
import { Redirect, Route } from 'react-router-dom';

interface Props {
  path: string;
  redirectPath: string;
  isAuthenticated: string;
  component: () => ReactNode;
}

const PrivateRoute: FC<Props> = ({
  path,
  component,
  redirectPath,
  isAuthenticated,
  ...rest
}: any) => {
  const routeComponent = (props: any) =>
    isAuthenticated ? (
      createElement(component, props)
    ) : (
      <Redirect to={{ pathname: redirectPath }} />
    );
  return <Route path={path} {...rest} render={routeComponent} />;
};

export default observer(PrivateRoute);
