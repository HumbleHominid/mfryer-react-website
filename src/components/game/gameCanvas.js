import { useRef, useEffect } from 'react';

export default function GameCanvas(props) {
  const { gameState, ...rest} = props;
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    gameState.forEachEntity((entity) => {
      console.log(entity)
      entity.render(context);
    });
  }, [gameState]);

  return <canvas id="gameCanvas" width="250" height="250" ref={canvasRef} {...rest} />
}