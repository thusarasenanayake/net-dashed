import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProfileProvider } from './contexts/ProfileContext';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import PrivateRoute from './PrivateRoute';
function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <ProfileProvider>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </ProfileProvider>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
