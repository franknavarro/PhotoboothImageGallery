import { CssBaseline } from '@material-ui/core';
import { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Event from './components/Event';
import { AuthProvider } from './hooks/useAuth';

const App: FC = () => {
  return (
    <AuthProvider>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/:eventId">
            <Event />
          </Route>
          <Route exact path="/">
            Home
          </Route>
          <Route>404</Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
