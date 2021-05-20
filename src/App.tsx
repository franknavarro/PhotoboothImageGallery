import { AuthProvider } from './hooks/useAuth';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import Error404 from './components/Error404';
import Event from './components/Event';
import { EventNameProvider } from './hooks/useEventName';
import { FC } from 'react';
import Home from './components/Home';
import NavigationBar from './components/NavigationBar';

const App: FC = () => {
  return (
    <AuthProvider>
      <EventNameProvider>
        <CssBaseline />
        <Router>
          <NavigationBar />
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
      </EventNameProvider>
    </AuthProvider>
  );
};

export default App;
