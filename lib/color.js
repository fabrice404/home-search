const getScoringColor = (score) => {
  let color = 'bg-red-400';
  if (score >= 400) {
    color = 'bg-green-400';
  } else if (score >= 300) {
    color = 'bg-yellow-400';
  }
  return `${color} text-white text-center px-2 py-1`;
};

export default {};
export { getScoringColor };
