import { useEffect, useRef } from 'react';

const SoundVisualizer = ({ isPlaying }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isPlaying) {
        const bars = 20;
        const barWidth = canvas.width / bars;

        for (let i = 0; i < bars; i++) {
          const height = Math.random() * canvas.height;
          const hue = (i / bars) * 360;
          ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
          ctx.fillRect(i * barWidth, canvas.height - height, barWidth - 2, height);
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying]);

  return <canvas ref={canvasRef} width="300" height="100" className="w-full h-32 rounded-lg" />;
};

export default SoundVisualizer;
