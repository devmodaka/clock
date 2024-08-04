import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [timerLabel, setTimerLabel] = useState("Session");
  const [isRunning, setIsRunning] = useState(false);

  const incrementBreak = () => setBreakLength((prev) => Math.min(prev + 1, 60));
  const decrementBreak = () => setBreakLength((prev) => Math.max(prev - 1, 1));
  const incrementSession = () => {
    const newSessionLength = Math.min(sessionLength + 1, 60);
    setSessionLength(newSessionLength);
    if (!isRunning) setTimeLeft(newSessionLength * 60);
  };
  const decrementSession = () => {
    const newSessionLength = Math.max(sessionLength - 1, 1);
    setSessionLength(newSessionLength);
    if (!isRunning) setTimeLeft(newSessionLength * 60);
  };

  const reset = () => {
    setIsRunning(false);
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25 * 60);
    setTimerLabel("Session");
    const beep = document.getElementById("beep");
    beep.pause();
    beep.currentTime = 0;
  };

  const startStop = () => {
    setIsRunning((prev) => !prev);
  };

  const playBeep = () => {
    const beep = document.getElementById("beep");
    beep.play();
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    let intervalId = null;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTimeLeft((prev) => {
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  useEffect(() => {
    if (timeLeft === -1) {
      setTimerLabel((prev) => (prev === "Session" ? "Break" : "Session"));
      playBeep();
    }
  }, [timeLeft]);

  useEffect(() => {
    if (timerLabel === "Session") {
      setTimeLeft(sessionLength * 60);
    } else {
      setTimeLeft(breakLength * 60);
    }
  }, [timerLabel, sessionLength, breakLength]);

  return (
    <div id="container">
      <div id="app">
        <div>
          <header>
            25{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="40px"
              viewBox="0 -960 960 960"
              width="40px"
              fill="#000000"
            >
              <path d="M446-282.67h66.67v-124.66h124v-67.34h-124v-124H446v124H322v67.34h124v124.66Zm33.33 201.34q-74.33 0-139.83-28.17-65.5-28.17-114-76.67t-77-114Q120-365.67 120-440.49t28.5-140.17q28.5-65.34 77-114.17 48.5-48.84 114-77Q405-800 479.33-800q74.34 0 139.84 28.17 65.5 28.16 114.33 77 48.83 48.83 77 114.17 28.17 65.35 28.17 140.17T810.5-300.17q-28.17 65.5-77 114T619.17-109.5q-65.5 28.17-139.84 28.17Zm0-358Zm-262-427.34L264-820 98-658l-46.67-46.67 166-162Zm524 0 166 162L860.67-658l-166-162 46.66-46.67ZM479.36-148q122.31 0 207.47-85.19Q772-318.39 772-440.7q0-122.3-85.19-207.47-85.2-85.16-207.51-85.16-122.3 0-207.47 85.19-85.16 85.2-85.16 207.5 0 122.31 85.19 207.47Q357.06-148 479.36-148Z" />
            </svg>{" "}
            5<br />
            Clock
          </header>
          <div className="length">
            <div className="length-control">
              <div id="break-label">Break Length</div>
              <div className="length">
                <button
                  className="btn"
                  id="break-decrement"
                  onClick={decrementBreak}
                >
                  -
                </button>
                <div id="break-length">{breakLength}</div>
                <button
                  className="btn"
                  id="break-increment"
                  onClick={incrementBreak}
                >
                  +
                </button>
              </div>
            </div>
            <div className="length-control">
              <div id="session-label">Session Length</div>
              <div className="length">
                <button
                  className="btn"
                  id="session-decrement"
                  onClick={decrementSession}
                >
                  -
                </button>
                <div id="session-length">{sessionLength}</div>
                <button
                  className="btn"
                  id="session-increment"
                  onClick={incrementSession}
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="timer">
            <div className="timer-wrapper">
              <div id="timer-label">{timerLabel}</div>
              <div id="time-left">{formatTime(timeLeft)}</div>
            </div>
          </div>
          <div className="timer-control">
            <button id="start_stop" onClick={startStop}>
              {isRunning ? "Pause" : "Start"}
            </button>
            <button id="reset" onClick={reset}>
              Reset
            </button>
            <audio id="beep" src="beep.mp3"></audio>
          </div>
        </div>
      </div>
    </div>
  );
}
