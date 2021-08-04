import { useRef, useEffect } from 'react';

export default function GameCanvas(props) {
  const { gameState, ...rest} = props;
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

    gameState.forEachEntity((entity) => {
      entity.render(context);
    });
  }, [gameState]);

  return <canvas id="gameCanvas" className="mx-auto" width="750" height="500" ref={canvasRef} {...rest} />
}