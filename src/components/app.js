import CustomNavbar from './nav';
import Footer from './footer';
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './home';
import About from './about';

function App() {
  return (
    <Router>
      <div id="application">
        <CustomNavbar />
        <Container id="application-content-container">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
          </Switch>
        </Container>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
