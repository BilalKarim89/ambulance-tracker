import React, { useState, useRef } from 'react';
import MapComponent from './components/MapComponent';
import StepperComponent from './components/StepperComponent';
import { FiRefreshCw } from 'react-icons/fi';
import './App.css';

const App = () => {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [resetKey, setResetKey] = useState(0);
  const audioRef = useRef(null);

  const handleReplay = () => {
    // Allow sound to play after user interaction
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setStep(0);
    setProgress(0);
    setResetKey(prev => prev + 1);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 16px)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px' }}>
        <div style={{ flexGrow: 1, marginRight: '20px' }}>
          <StepperComponent currentStep={step} />
        </div>
        <button onClick={handleReplay} className='replay-button'>
          <FiRefreshCw size={18} />
          Replay Trip
        </button>
      </div>
      <div style={{ height: 10, background: '#eee' }}>
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            background: '#007bff',
            transition: 'width 0.3s',
          }}
        />
      </div>
      <MapComponent
        key={resetKey}
        setStep={setStep}
        setProgress={setProgress}
        audioRef={audioRef}
      />
      <audio ref={audioRef} src="/sounds/emergency.mp3" preload="auto" />
    </div>
  );
};

export default App;
