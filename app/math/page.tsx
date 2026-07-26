'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  generateArithmeticQuestion,
  generateAlgebraQuestion,
  generateUnitQuestion,
  generateSigFigQuestion,
  generateMolarMassQuestion,
  generateGasLawQuestion,
  generateDensityQuestion,
  Question
} from '@/lib/generators';
import MathDisplay from '@/components/MathDisplay';
import MathInput from '@/components/MathInput';
import ReviewList, { ReviewItem } from '@/components/ReviewList';
import { checkAnswer } from '@/lib/checkAnswer';
import { pickWeightedType, recordAttempt } from '@/lib/practiceStats';
import { saveCourseProgress } from '@/lib/progressTracker';

export default function Home() {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [feedback, setFeedback] = useState<{ [key: string]: boolean }>({});
  const [showSolution, setShowSolution] = useState(false);

  const [config, setConfig] = useState({
    arithmetic: true,
    algebra: true,
    units: true,
    sigfigs: false,
    molarMass: false,
    gasLaws: false,
    density: false,
    count: 10
  });

  const startQuiz = () => {
    const newQuestions: Question[] = [];
    // Map stable type keys -> generators. Keys match Question.type so that
    // recorded per-type accuracy drives which type is generated next.
    const generatorMap: Record<string, () => Question> = {};
    if (config.arithmetic) generatorMap['arithmetic'] = generateArithmeticQuestion;
    if (config.algebra) generatorMap['algebra'] = generateAlgebraQuestion;
    if (config.units) generatorMap['Dimensional Analysis'] = generateUnitQuestion;
    if (config.sigfigs) generatorMap['sigfigs'] = generateSigFigQuestion;
    if (config.molarMass) generatorMap['stoichiometry'] = generateMolarMassQuestion;
    if (config.gasLaws) generatorMap['gasLaws'] = generateGasLawQuestion;
    if (config.density) generatorMap['density'] = generateDensityQuestion;

    const keys = Object.keys(generatorMap);
    if (keys.length === 0) {
      alert('Please select at least one topic.');
      return;
    }

    for (let i = 0; i < config.count; i++) {
      // Weakness targeting: weaker/unseen types are generated more often.
      const key = pickWeightedType('math', keys);
      newQuestions.push(generatorMap[key]());
    }

    setQuestions(newQuestions);
    setStarted(true);
    setFinished(false);
    setCurrentIndex(0);
    setAnswers({});
    setFeedback({});
    setShowSolution(false);
  };

  const verifyAnswer = () => {
    const q = questions[currentIndex];
    const answer = answers[q.id] || '';

    // Use the new checkAnswer utility
    const isCorrect = checkAnswer(q.type, q.correctAnswer, answer);

    setFeedback({ ...feedback, [q.id]: isCorrect });
    setShowSolution(!isCorrect);

    // Track per-type accuracy for weakness targeting.
    recordAttempt('math', { topicKey: q.type, correct: isCorrect });
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowSolution(false);
    } else {
      const correct = Object.values(feedback).filter(Boolean).length;
      saveCourseProgress('math', { type: 'math', correct, total: questions.length });
      setFinished(true);
    }
  };

  const resetQuiz = () => {
    setStarted(false);
    setFinished(false);
    setQuestions([]);
    setCurrentIndex(0);
    setAnswers({});
    setFeedback({});
  };

  if (!started) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-slate-800">Chem & Math Practice</h1>
            <Link href="/" className="text-sm text-slate-500 hover:text-slate-800">← Home</Link>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between">
              <label className="font-medium text-slate-700">Scientific Arithmetic</label>
              <input
                type="checkbox"
                checked={config.arithmetic}
                onChange={(e) => setConfig({ ...config, arithmetic: e.target.checked })}
                className="w-5 h-5 accent-blue-600"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="font-medium text-slate-700">Algebra Rearrangement</label>
              <input
                type="checkbox"
                checked={config.algebra}
                onChange={(e) => setConfig({ ...config, algebra: e.target.checked })}
                className="w-5 h-5 accent-blue-600"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="font-medium text-slate-700">Dimensional Analysis</label>
              <input
                type="checkbox"
                checked={config.units}
                onChange={(e) => setConfig({ ...config, units: e.target.checked })}
                className="w-5 h-5 accent-blue-600"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="font-medium text-slate-700">Significant Figures</label>
              <input
                type="checkbox"
                checked={config.sigfigs}
                onChange={(e) => setConfig({ ...config, sigfigs: e.target.checked })}
                className="w-5 h-5 accent-blue-600"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="font-medium text-slate-700">Stoichiometry (Molar Mass)</label>
              <input
                type="checkbox"
                checked={config.molarMass}
                onChange={(e) => setConfig({ ...config, molarMass: e.target.checked })}
                className="w-5 h-5 accent-blue-600"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="font-medium text-slate-700">Gas Laws</label>
              <input
                type="checkbox"
                checked={config.gasLaws}
                onChange={(e) => setConfig({ ...config, gasLaws: e.target.checked })}
                className="w-5 h-5 accent-blue-600"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="font-medium text-slate-700">Density & Matter</label>
              <input
                type="checkbox"
                checked={config.density}
                onChange={(e) => setConfig({ ...config, density: e.target.checked })}
                className="w-5 h-5 accent-blue-600"
              />
            </div>

            <div className="pt-4 border-t border-slate-100">
              <label className="block font-medium text-slate-700 mb-2">Number of Questions</label>
              <input
                type="number"
                min={1}
                max={50}
                value={config.count}
                onChange={(e) => setConfig({ ...config, count: parseInt(e.target.value) || 10 })}
                className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            onClick={startQuiz}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (finished) {
    const correctCount = Object.values(feedback).filter(Boolean).length;
    const reviewItems: ReviewItem[] = questions.map((q) => ({
      id: q.id,
      topicLabel: q.type,
      prompt: q.prompt,
      promptIsLatex: true,
      yourAnswer: answers[q.id] || '',
      correctAnswer: q.correctAnswer,
      answerIsLatex: true,
      explanation: q.solution,
      explanationIsLatex: true,
      correct: !!feedback[q.id],
    }));
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 text-slate-800">Quiz Complete!</h2>
            <div className="text-xl mb-6">
              Score: <span className="font-bold text-blue-600">{correctCount}</span> / {questions.length}
            </div>
          </div>
          <div className="mb-6">
            <ReviewList items={reviewItems} accent="text-blue-600" />
          </div>
          <div className="text-center">
            <button
              onClick={resetQuiz}
              className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Start New Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const hasAnswered = feedback[currentQ.id] !== undefined;

  return (
    <div className="min-h-screen bg-slate-50 p-4 font-sans">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6 flex justify-between items-center">
          <h1 className="font-bold text-slate-700">Question {currentIndex + 1} of {questions.length}</h1>
          <button onClick={resetQuiz} className="text-sm text-red-500 hover:underline">Exit Quiz</button>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg mb-6">
          <div className="mb-6">
            <p className="text-slate-500 text-sm mb-2 uppercase tracking-wide font-semibold">{currentQ.type}</p>
            <p className="text-lg mb-4 text-slate-800">{currentQ.instructions}</p>
            <div className="text-2xl text-center py-8 font-serif bg-slate-50 rounded-lg border border-slate-100 overflow-x-auto">
              {['algebra', 'Dimensional Analysis', 'arithmetic', 'stoichiometry', 'gasLaws', 'density', 'sigfigs'].includes(currentQ.type) ? (
                <MathDisplay latex={currentQ.prompt} block />
              ) : (
                currentQ.prompt
              )}
            </div>
          </div>

          <div className="mb-6">
            <MathInput
              key={currentQ.id}
              value={answers[currentQ.id] || ''}
              onChange={(val) => setAnswers({ ...answers, [currentQ.id]: val })}
              disabled={hasAnswered}
            />
            {hasAnswered && (
              <div className={`mt-2 font-medium ${feedback[currentQ.id] ? 'text-green-600' : 'text-red-600'}`}>
                {feedback[currentQ.id] ? 'Correct!' : 'Incorrect'}
              </div>
            )}
          </div>

          {showSolution && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-slate-700">
              <h3 className="font-bold mb-2">Solution:</h3>
              <p className="mb-2">Correct Answer: <span className="font-mono font-bold">{currentQ.correctAnswer}</span></p>
              {currentQ.solution && (
                <div className="mt-4 pt-4 border-t border-yellow-200">
                  <MathDisplay latex={currentQ.solution} />
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end gap-3">
            {!hasAnswered ? (
              <button
                onClick={verifyAnswer}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-transform active:scale-95"
                disabled={!answers[currentQ.id]}
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-transform active:scale-95"
              >
                {currentIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
