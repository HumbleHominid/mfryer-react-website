import { render } from '@testing-library/react';
import { useRef, useEffect } from 'react';
import { SpaceGameState } from './spaceGame';

export default function GameCanvas(props) {
  const { spaceGame, dt, ...rest} = props;
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Draw a dark screen
    context.clearRect(0, 0, width, height);
    context.fillStyle = '#1c1c1c';
    context.fillRect(0, 0, width, height);

    // Render the entities
    if (spaceGame.stat === SpaceGameState.PLAYING) {
      spaceGame.forEachEntity((entity) => {
        entity.render(context);
      });
      spaceGame.player.render(context);
    }

    // TODO Make this component based here so we just do `renderUI()` instead or something. This slow
    if (spaceGame.state === SpaceGameState.TITLE) renderTitle(context, spaceGame);
    if (spaceGame.state === SpaceGameState.PLAYING) renderInGameUI(context, spaceGame);
  }, [spaceGame, dt]);

  return <canvas id="gameCanvas" className="mx-auto" width="750" height="500" ref={canvasRef} {...rest} />
}

// Draws the lives and score
function renderInGameUI(context, spaceGame) {
  const gap = 5;
  const fontHeight = 12;

  context.font = `${fontHeight}px consolas`;
  context.fillStyle = '#eee';
  context.textAlign = 'start';
  context.textBaseline = 'hanging';
  context.fillText(`Score: ${spaceGame.score}`, gap, gap);
  context.fillText(`Lives: ${spaceGame.player.lives}`, gap, fontHeight + 2*gap);
}

function drawButton(context, centerX, centerY, text) {
  const width = 150;
  const height = 50;
  const left = centerX - Math.floor(width / 2);
  const right = centerY - Math.floor(height / 2);

  context.strokeStyle = '#eee';
  context.strokeRect(left, right, width, height);
  
  context.fillStyle = '#eee';
  context.font = '20px consolas';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(text, centerX, centerY);
}

function renderTitle(context, spaceGame) {
  const centerX = Math.floor(context.canvas.width / 2);
  context.fillStyle = '#eee';

  // Heading
  const headingSize = 72;
  const subHeadingSize = 22;
  const gap = 15;
  context.font = `${headingSize}px consolas`;
  context.textAlign = 'center';
  context.textBaseline = 'hanging';
  context.fillText('Space Game', centerX, gap);

  context.font = `${subHeadingSize -2}px consolas`;
  context.fillText('Definitely an original game.', centerX, (2*gap) + headingSize, 300);
  context.fillText('By: Michael Fryer', centerX, (3*gap) + headingSize + subHeadingSize)

  // Buttons
  drawButton(context, centerX, 275, 'PLAY');
  drawButton(context, centerX, 350, 'CONTROLS');

  // TODO: Hook up the click events?!?!
}