import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container';
import { Github as GitHubIcon, Youtube as YouTubeIcon, FileEarmarkPdf as FileEarmarkPdfIcon } from 'react-bootstrap-icons';
import { GitHub, YouTube, Resume } from '../refLinks';
import Email from './email';

import '../styles/nav.scss';
import '../styles/icon-jiggle.scss';

export default function CustomNavbar() {
  return (
    <header className="sticky-top">
      <Navbar bg="dark" expand="lg" variant="dark">
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
              <LinkContainer to="/game">
                <Nav.Link>Game</Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav className="nav-icon-container">
              <Nav.Link id="gitHubLink" className="icon-jiggle" title="GitHub" target="_blank" rel="noreferrer" href={GitHub}>
                <GitHubIcon />
              </Nav.Link>
              <Nav.Link id="youTubeLink" className="icon-jiggle" title="YouTube" target="_blank" rel="noreferrer" href={YouTube}>
                <YouTubeIcon />
              </Nav.Link>
              <Nav.Link id="resumeLink" className="icon-jiggle" title="Resume" target="_blank" rel="noreferrer" href={Resume}>
                <FileEarmarkPdfIcon />
              </Nav.Link>
              <Email />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}