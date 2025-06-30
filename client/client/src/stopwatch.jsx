import React, { useEffect, useRef, useState } from 'react';
function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const intervalRef = useRef(null);
  const startRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startRef.current);
      }, 10);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
    startRef.current = Date.now() - elapsedTime;
    setExpanded(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    setExpanded(false);
  };

  const handleRestart = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setExpanded(false);
  };

  const formatTime = () => {
    let hours = Math.floor(elapsedTime / (60 * 60 * 1000));
    let minutes = Math.floor((elapsedTime / (60 * 1000)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
  <>
    {expanded && <div className="overlay" onClick={() => setExpanded(false)}></div>}
    <div className="watch-wrapper">
      <div className="watch-top" onClick={() => setExpanded(!expanded)}>
        <span className="time-text">{formatTime()}</span>
        <button className="play-button">▶</button>
      </div>

      {expanded && (
        <div className="watch-controls">
          <button onClick={handleStart} className="ctrl-btn start">Start</button>
          <button onClick={handleStop} className="ctrl-btn stop">Stop</button>
          <button onClick={handleRestart} className="ctrl-btn restart">Restart</button>
        </div>
      )}
    </div>
  </>
);

}

export default Stopwatch;

