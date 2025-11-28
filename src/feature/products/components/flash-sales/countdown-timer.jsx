import { useState, useEffect } from 'react';

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 23,
    minutes: 19,
    seconds: 56
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        let { days, hours, minutes, seconds } = prevTime;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown-timer">
      <div className="timer-unit">
        <span className="timer-label">Days</span>
        <span className="timer-value">{String(timeLeft.days).padStart(2, '0')}</span>
      </div>
      <span className="timer-separator">:</span>
      <div className="timer-unit">
        <span className="timer-label">Hours</span>
        <span className="timer-value">{String(timeLeft.hours).padStart(2, '0')}</span>
      </div>
      <span className="timer-separator">:</span>
      <div className="timer-unit">
        <span className="timer-label">Minutes</span>
        <span className="timer-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
      </div>
      <span className="timer-separator">:</span>
      <div className="timer-unit">
        <span className="timer-label">Seconds</span>
        <span className="timer-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
      </div>
    </div>
  );
}