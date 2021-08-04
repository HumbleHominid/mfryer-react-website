import { useRef, useEffect } from 'react';

export default function GameCanvas(props) {
  const { spaceGame, frame, ...rest} = props;
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
    spaceGame.forEachEntity((entity) => {
      entity.render(context);
    });
    spaceGame.player.render(context);

    // Draw the lives and score
    const gap = 5;
    const fontHeight = 12;
    context.font = `${fontHeight}px consolas`;
    context.fillStyle = '#eee';
    context.fillText(`Score: ${spaceGame.score}`, gap, fontHeight + gap);
    context.fillText(`Lives: ${spaceGame.player.lives}`, gap, 2*(fontHeight + gap))
  }, [spaceGame, frame]);

  return <canvas id="gameCanvas" className="mx-auto" width="750" height="500" ref={canvasRef} {...rest} />
}