import { useEffect, useState } from 'react';
import Image from 'next/image';

const calculateTimeLeft = (date: string) => {
    const target = new Date(date).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (difference <= 0) return {  minutes: 0, seconds: 0 };


    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { minutes, seconds };
}

const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeStr = `${timeLeft.minutes}:${timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}`

  return (
    <time className=" text-primary">
      {timeLeft.seconds === 0 
        ? <p className='p-1 bg-red-300 text-red-500 w-fit rounded-lg mx-auto'>EXPIRADO</p> 
        : <p className='flex gap-1'>
            <Image
              src="/timer.svg"
              alt="Clock"
              width={20}
              height={20}
              className=" text-primary"
            />
            {timeStr}
          </p>
      }
    </time>
  );
};

export default CountdownTimer;
