import CustomNavbar from './nav';
import Footer from './footer';
import Container from 'react-bootstrap/Container';

function App() {
  return (
    <div id="application">
      <CustomNavbar />
      <Container id="application-content-container">
        <h1>My First App!</h1>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
