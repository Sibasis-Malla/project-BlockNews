// eslint-disable-next-line import/no-anonymous-default-export
export default (time) => {
  const difference =+new Date(time) - +new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      Hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      Minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      Seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  }else{
    timeLeft = {
        Hours: '00',
        Minutes: '00',
        Seconds: '00',
      };
  }

  return timeLeft;
};
