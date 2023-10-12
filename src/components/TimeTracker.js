import React, { useState, useRef } from 'react';

function Timer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const startStop = () => {
    if (!isRunning) {
      const startTime = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 51);
    } else {
      clearInterval(intervalRef.current);
    }
    setIsRunning(!isRunning);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setIsRunning(false);
  };

  const formatTime = (milliseconds) => {
    const mm = Math.floor(milliseconds / 60000);
    const ss = Math.floor((milliseconds % 60000) / 1000);
    const ms = (milliseconds % 1000 / 10).toFixed(0);
    return `${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}:${ms.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <div id="timer">{formatTime(time)}</div>
      <button id="toggle" onClick={startStop}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
      {isRunning && (
        <button id="clear" onClick={reset}>
          Clear
        </button>
      )}
    </div>
  );
}

export default Timer;