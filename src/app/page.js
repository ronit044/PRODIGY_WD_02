"use client";
import { useState } from "react";
let minTimer, secTimer, milliTimer;

export default function Home() {
  const [mins, setMins] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [milli, setMilli] = useState(0);
  const [lapTimes, setLapTimes] = useState([]);

  const Start = () => {
    minTimer = setInterval(() => setMins((prev) => prev + 1), 60000);
    secTimer = setInterval(() => {
      setSeconds((prev) => (prev >= 59 ? 0 : prev + 1));
    }, 1000);
    milliTimer = setInterval(() => {
      setMilli((prev) => (prev > 99 ? 0 : prev + 1));
    }, 10);
  };

  const end = () => {
    clearInterval(minTimer);
    clearInterval(secTimer);
    clearInterval(milliTimer);
  };

  const reset = () => {
    end();
    setMins(0);
    setSeconds(0);
    setMilli(0);
    clearInterval(minTimer);
    clearInterval(secTimer);
    clearInterval(milliTimer);
    setLapTimes([]);
  };

  const recordLap = () => {
    const lap = `${mins.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}:${milli.toString().padStart(2, "0")}`;
    setLapTimes((prev) => [...prev, lap]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      <div className="flex space-x-2 text-6xl font-mono mb-4">
        <div>{mins.toString().padStart(2, "0")}</div>
        <div>:</div>
        <div>{seconds.toString().padStart(2, "0")}</div>
        <div>:</div>
        <div>{milli.toString().padStart(2, "0")}</div>
      </div>
      <div className="mb-5 space-x-4">
        <button
          className="px-4 py-2 bg-green-500 rounded hover:bg-green-600"
          onClick={Start}
        >
          Start
        </button>
        <button
          className="px-4 py-2 bg-red-500 rounded hover:bg-red-600"
          onClick={end}
        >
          Pause
        </button>
        <button
          className="px-4 py-2 bg-yellow-500 rounded hover:bg-yellow-600"
          onClick={reset}
        >
          Reset
        </button>
        <button
          className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
          onClick={recordLap}
        >
          Lap
        </button>
      </div>
      <div className="w-full max-w-md bg-gray-700 min-h-28 rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-3">Lap Times</h2>
        <ul className="list-decimal list-inside overflow-y-auto max-h-28">
          {lapTimes.map((lap, index) => (
            <li key={index} className="py-1">
              {lap}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
