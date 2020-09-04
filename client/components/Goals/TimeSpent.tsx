import React, { FunctionComponent, useEffect, useState } from 'react';
import { FaRegClock } from 'react-icons/fa';
import styled, { keyframes, StyledFunction } from 'styled-components';

interface IProps {
  totalTimeInSeconds: number;
  paddingSmall?: boolean;
}

interface StyleProp {
  paddingSmall: boolean;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

// const input: StyledFunction<YourProps & React.HTMLProps<HTMLInputElement>> = styled.input
// const WrappedText = styled<SomeInterface>(Text)
const Time = styled.div<StyleProp>`
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 0.8rem;
  text-transform: uppercase;
  animation: ${fadeIn} 300ms ease-out forwards;
  padding: ${({ paddingSmall }) =>
    paddingSmall ? '0.5em 0 0 0' : '0.5em 1.4em 1.4em'};
`;

const TimeSpent: FunctionComponent<IProps> = ({
  totalTimeInSeconds,
  paddingSmall = false,
}) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const secondsInDay = 60 * 60 * 24;
  const secondsInHour = 60 * 60;
  const secondsInMinute = 60;
  useEffect(() => {
    let timeLeft = totalTimeInSeconds;
    setDays(Math.floor(timeLeft / secondsInDay));
    timeLeft %= secondsInDay;
    setHours(Math.floor(timeLeft / secondsInHour));
    timeLeft %= secondsInHour;
    setMinutes(Math.floor(timeLeft / secondsInMinute));
  }, [totalTimeInSeconds, secondsInDay, secondsInHour, secondsInMinute]);
  return (
    <Time paddingSmall={paddingSmall}>
      <FaRegClock size={20} />
      &nbsp; {days ? <>{days}d </> : null}
      {days || hours ? <> {hours}h </> : null}
      {minutes}m
    </Time>
  );
};

export default TimeSpent;
