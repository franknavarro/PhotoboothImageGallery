import { CssBaseline } from '@material-ui/core';
import { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Event from './components/Event';
import Error404 from './components/Error404';
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
            <Home />
          </Route>
          <Route>
            <Error404 />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
