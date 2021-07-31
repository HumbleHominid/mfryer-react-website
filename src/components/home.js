import { LinkContainer } from 'react-router-bootstrap';
import { GitHub } from '../refLinks';

export default function Home() {
  return (
    <div>
      <h1 className="display-2">Home</h1>
      <p className="lead">This is a website I have created to help showcase some of my skills as a front-end developer. The front-end is build with React while there is a small express server set up in the backend. Everything is just stood up in an ec2-instance.</p>

      <p>Please checkout <LinkContainer to="/about"><a>About</a></LinkContainer> for more information about me, and <LinkContainer to="/game"><a disabled>Game</a></LinkContainer> for a space game that I made. And finally, the source for this application is available on my <a target="_blank" rel="noreferrer" href={GitHub}>GitHub's</a> main page.</p>
    </div>
  );
}