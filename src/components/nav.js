import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container';
import { Github, Linkedin, FileEarmarkPdf } from 'react-bootstrap-icons';
import { GitHub, LinkedIn } from '../refLinks';
import Email from './email';

import '../styles/nav.scss';
import '../styles/icon-jiggle.scss';

export default function CustomNavbar() {
  return (
    <header>
      <Navbar bg="dark" expand="lg" variant="dark" sticky="top">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand href="/">
              <img
                alt=""
                src="/logo.png"
                width="30"
                height="30"
                className="d-inline-block align-top logo"
              />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/about">
                <Nav.Link>About</Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav className="nav-icon-container">
              <Nav.Link id="gitHubLink" className="icon-jiggle" title="GitHub" href={GitHub}>
                <Github />
              </Nav.Link>
              <Nav.Link id="linkedInLink" className="icon-jiggle" title="LinkedIn" href={LinkedIn}>
                <Linkedin />
              </Nav.Link>
              <Nav.Link id="resumeLink" className="icon-jiggle" title="Resume" href="/resume" disabled>
                <FileEarmarkPdf />
              </Nav.Link>
              <Email />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}