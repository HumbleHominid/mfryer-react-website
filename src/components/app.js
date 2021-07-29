import CustomNavbar from './nav';
import Footer from './footer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './home';
import About from './about';

function App() {
  return (
    <div id="application">
      <Router>
        <CustomNavbar />
        <article id="application-content-container">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
          </Switch>
        </article>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
