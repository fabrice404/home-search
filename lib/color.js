const SCORE_GREEN = 450;
const SCORE_YELLOW = 350;
const SCORE_RED = 250;

const getScoringColor = (score) => {
  let color = 'bg-red-400 text-white';
  if (score >= SCORE_GREEN) {
    color = 'bg-green-400 text-white';
  } else if (score >= SCORE_YELLOW) {
    color = 'bg-yellow-400 text-white';
  }
  if (score === -1) {
    color = 'bg-gray-200 text-black';
  }
  return `${color} text-center px-2 py-1`;
};
const COLORS = {
  A1: 'bg-green-500',
  A2: 'bg-green-400',
  A3: 'bg-green-300',
  B1: 'bg-yellow-300',
  B2: 'bg-yellow-400',
  B3: 'bg-yellow-500',
  C1: 'bg-red-500',
  C2: 'bg-red-600',
  C3: 'bg-red-700',
};

const getBerColor = (score) => (COLORS[score] ? COLORS[score] : 'bg-black');

export default {};
export {
  SCORE_GREEN,
  SCORE_YELLOW,
  SCORE_RED,
  getScoringColor,
  getBerColor,
};
