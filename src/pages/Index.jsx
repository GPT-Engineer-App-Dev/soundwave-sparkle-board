import { useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SoundVisualizer from '@/components/SoundVisualizer';

const sounds = [
  { name: 'Drum', file: '/sounds/drum.mp3', color: 'bg-red-500' },
  { name: 'Guitar', file: '/sounds/guitar.mp3', color: 'bg-blue-500' },
  { name: 'Piano', file: '/sounds/piano.mp3', color: 'bg-green-500' },
  { name: 'Synth', file: '/sounds/synth.mp3', color: 'bg-yellow-500' },
];

const Index = () => {
  const [activeSound, setActiveSound] = useState(null);
  const [audio, setAudio] = useState(null);

  const playSound = (sound) => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    const newAudio = new Audio(sound.file);
    newAudio.play();
    setAudio(newAudio);
    setActiveSound(sound.name);
  };

  const stopSound = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setActiveSound(null);
    setAudio(null);
  };

  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, [audio]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Cool Soundboard</h1>
      <div className="mb-8">
        <SoundVisualizer isPlaying={!!activeSound} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {sounds.map((sound) => (
          <Button
            key={sound.name}
            className={`h-32 ${sound.color} hover:opacity-80 transition-all duration-300 ${
              activeSound === sound.name ? 'ring-4 ring-white' : ''
            }`}
            onClick={() => playSound(sound)}
          >
            <div className="flex flex-col items-center">
              {activeSound === sound.name ? <Pause size={32} /> : <Play size={32} />}
              <span className="mt-2">{sound.name}</span>
            </div>
          </Button>
        ))}
      </div>
      {activeSound && (
        <div className="mt-8 text-center">
          <Button onClick={stopSound} variant="destructive">
            Stop Sound
          </Button>
        </div>
      )}
      <div className="mt-8 text-center">
        <p>Click on a button to play the sound!</p>
      </div>
    </div>
  );
};

export default Index;
