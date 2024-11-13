import { LinkContainer } from 'react-router-bootstrap';
import { GitHub } from '../refLinks';

export default function Home() {
  return (
    <div>
      <h1 className="display-2">Home</h1>
      <p className="lead">Welcome to my website. This website is built in React and hosted on an AWS Fargate instance.</p>

      <p>Please checkout <LinkContainer to="/about"><button type="button" className="btn btn-link btn-link-de-chonk">About</button></LinkContainer> for more information about myself. I have also built a game in JavaScript and it is playable over at <LinkContainer to="/game"><button type="button" className="btn btn-link btn-link-de-chonk">Game</button></LinkContainer>. This game is sure to be a hit as it's never been seen before (I joke). And finally, the source for this application is available on <a target="_blank" rel="noreferrer" href={GitHub}>GitHub's</a>.</p>
    </div>
  );
}