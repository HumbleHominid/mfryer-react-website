import { useRef, useEffect, useMemo } from 'react';
import Stars from './stars';
import { SpaceGameState } from './spaceGame';

let buttons = [];
const width = 750;
const height = 500;

export default function GameCanvas(props) {
  const { spaceGame, dt, ...rest } = props;
  const canvasRef = useRef(null);
  const stars = useMemo(() => new Stars({ width: width, height: height }), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const width = context.canvas.width;
    const height = context.canvas.height;
    context.clearRect(0, 0, width, height);

    // Stars are on every screen
    stars.render(context);

    // Render the entities
    if (spaceGame.state === SpaceGameState.PLAYING) {
      spaceGame.renderEntities(context);
    }

    // TODO Make this component based here so we just do `renderUI()` instead or something. This slow
    if (spaceGame.state === SpaceGameState.TITLE) drawTitle(context, spaceGame);
    else if (spaceGame.state === SpaceGameState.PLAYING) drawInGameUI(context, spaceGame);
    else if (spaceGame.state === SpaceGameState.CONTROLS) drawControls(context, spaceGame);
  }, [spaceGame, dt, stars]);

  return <canvas id="gameCanvas" className="mx-auto" width={width} height={height} ref={canvasRef} {...rest} />;
}

// Draws the lives and score
function drawInGameUI(context, spaceGame) {
  const gap = 5;
  const fontHeight = 12;

  context.font = `${fontHeight}px consolas`;
  context.fillStyle = '#eee';
  context.textAlign = 'start';
  context.textBaseline = 'hanging';
  context.fillText(`Score: ${spaceGame.score}`, gap, gap);
  context.fillText(`Lives: ${spaceGame.player.lives}`, gap, fontHeight + 2*gap);

  // TODO: Do this on state change instead of in each of these functions
  // Buttons
  buttons = [];
  context.canvas.removeEventListener("click", handleCanvasClick);
}

function drawButton(context, centerX, centerY, text, callback = () => {}, scale = 1) {
  context.save();

  let clampedScale = Math.max(Math.min(scale, 1), 0);
  const width = 150 * clampedScale;
  const height = 50 * clampedScale;
  const left = centerX - Math.floor(width / 2);
  const top = centerY - Math.floor(height / 2);

  // Make a black background so no stars show through
  context.fillStyle = '#1c1c1c';
  context.fillRect(left, top, width, height);

  // Make the button outline
  context.strokeStyle = '#eee';
  context.strokeRect(left, top, width, height);

  // Fill in the text for the button
  const fontSize = Math.floor(20 * clampedScale);
  context.fillStyle = '#eee';
  context.font = `${fontSize}px consolas`;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(text, centerX, centerY);

  buttons.push({
      top: top,
      right: left + width,
      bottom: top + height,
      left: left,
      callback: callback,
  });

  context.restore();
}

function drawTitle(context, spaceGame) {
  const centerX = Math.floor(context.canvas.width / 2);
  context.fillStyle = '#eee';

  // Heading
  const headingSize = 72;
  const subHeadingSize = 20;
  const gap = 15;
  context.font = `${headingSize}px consolas`;
  context.textAlign = 'center';
  context.textBaseline = 'hanging';
  context.fillText('Space Game', centerX, gap);

  context.font = `${subHeadingSize}px consolas`;
  context.fillText('Definitely an original game.', centerX, (2*gap) + headingSize, 300);
  context.fillText('By: Michael Fryer', centerX, (3*gap) + headingSize + subHeadingSize);

  // TODO: Do this on state change instead of in each of these functions
  // Buttons
  buttons = [];
  context.canvas.removeEventListener("click", handleCanvasClick);

  drawButton(context, centerX, 275, 'PLAY', () => spaceGame.setState(SpaceGameState.PLAYING));
  drawButton(context, centerX, 350, 'CONTROLS', () => spaceGame.setState(SpaceGameState.CONTROLS), 0.8);

  context.canvas.addEventListener("click", handleCanvasClick);
}

function drawControlElement(context, y, leftText, rightText) {
  const spacer = 10;
  const centerX = context.canvas.width / 2;
  context.font = '20px consolas';
  context.fillStyle = '#eee';

  context.textAlign = "right";
  context.fillText(leftText, centerX - spacer, y);

  context.textAlign = "left";
  context.fillText(rightText, centerX + spacer, y);
}

function drawControls(context, spaceGame) {
  const centerX = Math.floor(context.canvas.width / 2);
  context.fillStyle = '#eee';

  // Heading
  const headingSize = 60;
  context.font = `${headingSize}px consolas`;
  context.textAlign = 'center';
  context.textBaseline = 'hanging';
  context.fillText('Controls', centerX, 15);

  // Back button
  drawButton(context, centerX, 450, 'BACK', () => spaceGame.setState(SpaceGameState.TITLE), 0.8);
  context.canvas.addEventListener("click", handleCanvasClick);

  // Controls
  const gap = 20;
  const controlListTop = context.canvas.height * 0.4;

  const controls = [
    [ 'Pause', 'Esc' ],
    [ 'Forward', 'Up' ],
    [ 'Rotate Right', 'Right' ],
    [ 'Rotate Left', 'Left' ],
    [ 'Shoot', 'Space' ]
  ];

  for (let i = 0; i < controls.length; ++i) {
    drawControlElement(context, controlListTop + (i * gap),controls[i][0], controls[i][1]);
  }
}

function handleCanvasClick(e) {
  const canvas = document.getElementById('gameCanvas');
  const scaleFactor = (canvas.offsetWidth) / canvas.width;
  const canvasBB = canvas.getBoundingClientRect();
  const clickX = (e.clientX - canvasBB.left) / scaleFactor;
  const clickY = (e.clientY - canvasBB.top) / scaleFactor;

  for (let i = 0; i < buttons.length; ++i) {
    let button = buttons[i];

    if (clickX >= button.left &&
        clickX <= button.right &&
        clickY >= button.top &&
        clickY <= button.bottom) {
      button.callback();
    }
  }
}
