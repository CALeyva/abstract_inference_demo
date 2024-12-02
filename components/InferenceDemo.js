import React, { useState } from 'react';
import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react';

export default function InferenceDemo() {
  const TOTAL_TRIALS = 8;

  const [trialCount, setTrialCount] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [responses, setResponses] = useState([]);
  const [lastResponse, setLastResponse] = useState(null);

  const items = [
    { symbol: '🐶', name: 'dog' },
    { symbol: '⭕', name: 'circle' },
    { symbol: '🐱', name: 'cat' },
    { symbol: '⬛', name: 'square' },
    { symbol: '🐰', name: 'rabbit' },
    { symbol: '△', name: 'triangle' },
    { symbol: '🐨', name: 'koala' },
    { symbol: '⬟', name: 'pentagon' }
  ];

  const isAnimal = (item) => ['dog', 'cat', 'rabbit', 'koala'].includes(item.name);

  const getCurrentItem = () => items[trialCount];

  const getCorrectAnswer = (item) => {
    const inFirstContext = trialCount < TOTAL_TRIALS / 2;
    return inFirstContext ?
      (isAnimal(item) ? 'left' : 'right') :
      (isAnimal(item) ? 'right' : 'left');
  };

  const resetGame = () => {
    setTrialCount(0);
    setScore(0);
    setFeedback('');
    setGameOver(false);
    setResponses([]);
    setLastResponse(null);
  };

  const handleResponse = (response) => {
    setLastResponse(response);
    const currentItem = getCurrentItem();
    const correct = getCorrectAnswer(currentItem) === response;
    const newResponses = [...responses, {
      item: currentItem,
      response,
      correct,
      contextNumber: trialCount < TOTAL_TRIALS / 2 ? 1 : 2
    }];

    setResponses(newResponses);
    setScore(score + (correct ? 25 : 0));
    console.log('Feedback set to:', feedback);
    setFeedback(correct ? '✅ Correct! +25 points' : '❌ Incorrect');

    if (trialCount + 1 >= TOTAL_TRIALS) {
      setTimeout(() => setGameOver(true), 1000);
    } else {
      setTimeout(() => {
        setTrialCount(trialCount + 1);
        setLastResponse(null);
        setFeedback('');
      }, 1000);
    }
  };

  function Bucket({ side, items = [], isFirst }) {
    return (
      <div className="relative w-32 h-40">
        {/* Bucket back rim */}
        <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 rounded-t-full border-2 border-blue-600
          ${isFirst ? 'bg-blue-300' : 'bg-green-300'} transition-colors duration-300`} />

        {/* Bucket body */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-28 h-32">
          {/* Front face with gradient */}
          <div className={`absolute inset-0 rounded-b-lg border-2 border-blue-600 shadow-lg transition-all duration-300
            ${isFirst ? 'bg-gradient-to-b from-blue-400 to-blue-500' : 'bg-gradient-to-b from-green-400 to-green-500'}`}>
            {/* Items in bucket */}
            <div className="flex flex-wrap justify-center items-center p-2 gap-1">
              {items.map((item, i) => (
                <span key={i} className="text-3xl">{item}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Bucket opening */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6">
          <div className={`w-full h-full rounded-full border-2 border-blue-600 transform perspective-1000 transition-colors duration-300
            ${isFirst ? 'bg-blue-200' : 'bg-green-200'}`} />
        </div>
      </div>
    );
  }

  function AnimatedItem({ symbol, isMoving, targetSide }) {
    if (!isMoving) return null;

    return (
      <div className={`
        fixed text-4xl z-50
        ${targetSide === 'left' ? 'animate-drop-to-left-bucket' : 'animate-drop-to-right-bucket'}
      `}>
        {symbol}
      </div>
    );
  }

  function PatternDisplay({ title, animals, shapes, isFirst }) {
    return (
      <div className="flex flex-col items-center gap-4 w-1/2">
        <h3 className="font-semibold text-lg">{title}</h3>
        <div className="flex gap-8 items-start justify-center w-full">
          <div className="flex flex-col items-center w-40">
            <Bucket side="left" items={animals} isFirst={isFirst} />
            <div className="mt-2 font-medium">Animals</div>
          </div>
          <div className="flex flex-col items-center w-40">
            <Bucket side="right" items={shapes} isFirst={isFirst} />
            <div className="mt-2 font-medium">Shapes</div>
          </div>
        </div>
      </div>
    );
  }

  function ResultsTimeline({ responses, onReset }) {
    const switchPoint = 4;
    const animals = ['🐶', '🐱', '🐰', '🐨'];
    const shapes = ['⭕', '⬛', '△', '⬟'];

    return (
      <div className="w-full max-w-4xl p-6 bg-white rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-center flex-grow">Learning Journey</h2>
          <button
            onClick={onReset}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>

        <div className="flex justify-between mb-16">
          <PatternDisplay
            title="First Pattern"
            animals={animals}
            shapes={shapes}
            isFirst={true}
          />
          <PatternDisplay
            title="Second Pattern"
            shapes={shapes}
            animals={animals}
            isFirst={false}
          />
        </div>

        <div className="relative mt-24 mb-16">
          <div className="flex h-32">
            <div className="w-1/2 bg-gradient-to-r from-blue-50 to-blue-100 rounded-l-lg" />
            <div className="w-1/2 bg-gradient-to-r from-green-50 to-green-100 rounded-r-lg" />
          </div>

          {/* Trial markers with perfect centering */}
          <div className="absolute top-1/2 left-0 w-full flex justify-between transform -translate-y-1/2 px-4">
            <div className="w-full flex justify-between">
              {responses.map((r, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className={`
                    w-16 h-16
                    flex items-center justify-center
                    text-3xl rounded-lg
                    ${r.correct ? 'bg-white shadow-lg' : 'bg-red-50'}
                    ${i < switchPoint ? 'border-blue-300' : 'border-green-300'}
                    border-2 transition-all duration-300
                  `}>
                    {r.item.symbol}
                  </div>
                  <span className={`
                    mt-2 text-sm font-semibold
                    ${r.correct ? 'text-green-600' : 'text-red-600'}
                  `}>
                    {r.response.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pattern switch marker */}
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <div className="px-4 py-2 bg-white rounded-full shadow-lg border-2 border-gray-300">
              Pattern Switch
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8 p-8 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      {gameOver ? (
        <ResultsTimeline responses={responses} onReset={resetGame} />
      ) : (
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
          <div className="text-2xl text-center font-bold mb-8">
            Trial {trialCount + 1} of {TOTAL_TRIALS}
          </div>

          <div className="flex justify-between mb-12">
            <div className="text-center">
              <Bucket side="left" isFirst={trialCount < TOTAL_TRIALS / 2} />
              <AnimatedItem
                symbol={getCurrentItem().symbol}
                isMoving={feedback && lastResponse === 'left'}
                targetSide="left"
              />
            </div>
            <div className="text-center">
              <Bucket side="right" isFirst={trialCount < TOTAL_TRIALS / 2} />
              <AnimatedItem
                symbol={getCurrentItem().symbol}
                isMoving={feedback && lastResponse === 'right'}
                targetSide="right"
              />
            </div>
          </div>

          <div className="text-6xl mb-8 text-center transform hover:scale-110 transition-transform">
            {getCurrentItem().symbol}
          </div>

          <div className="flex justify-center gap-8 mb-8">
            <button
              onClick={() => handleResponse('left')}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all shadow-lg disabled:opacity-50"
              disabled={!!feedback}
            >
              <ArrowLeftCircle className="w-6 h-6" />
              Left
            </button>

            <button
              onClick={() => handleResponse('right')}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all shadow-lg disabled:opacity-50"
              disabled={!!feedback}
            >
              Right
              <ArrowRightCircle className="w-6 h-6" />
            </button>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold mb-2">
              Score: {score}
            </div>
            <div className="text-lg">
              {feedback}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}