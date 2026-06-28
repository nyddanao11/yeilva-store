import React, { useState } from 'react';
import './LeadMagnetQuiz.css';

const EMAIL_REGEX_CHECK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Reusable lead-magnet quiz. Drop into any landing page or blog post.
 *
 * By default, submits directly to POST /api/lead-magnet/quiz on your backend.
 * Pass `source` so leads are tagged with where they signed up
 * (e.g. "landing-21-models", "blog-zero-to-hero").
 *
 * Usage:
 *   <LeadMagnetQuiz source="landing-21-models" />
 *
 * To handle submission yourself instead (e.g. custom analytics), pass onSubmit:
 *   <LeadMagnetQuiz onSubmit={async (email, resultTitle) => { ... }} />
 */

const QUESTIONS = [
  {
    id: 'time',
    question: 'How much time can you realistically give this per week?',
    options: [
      { label: 'Under 3 hours', value: 'low' },
      { label: '3–8 hours', value: 'mid' },
      { label: '8+ hours', value: 'high' },
    ],
  },
  {
    id: 'comfort',
    question: 'How do you feel about being on camera or sharing your face online?',
    options: [
      { label: 'Hard no — I want to stay anonymous', value: 'anon' },
      { label: 'I could, but I\'d rather not', value: 'neutral' },
      { label: 'I\'m fine with it', value: 'open' },
    ],
  },
  {
    id: 'skill',
    question: 'Which feels closest to a skill you already have?',
    options: [
      { label: 'Writing or organizing information', value: 'writer' },
      { label: 'Design, visuals, or editing', value: 'creative' },
      { label: 'Talking to people / selling', value: 'people' },
    ],
  },
];

// Maps answer combos to a result archetype. Simple heuristic, not exhaustive.
function getResult(answers) {
  if (answers.comfort === 'anon' && answers.skill === 'writer') {
    return {
      title: 'The Ghost Publisher',
      desc: 'You\'re built for fully anonymous, writing-led income — think digital guides, faceless blogs, and PDF products. No camera, no persona, just words that sell.',
    };
  }
  if (answers.comfort === 'anon' && answers.skill === 'creative') {
    return {
      title: 'The Faceless Curator',
      desc: 'You\'re suited to visual, anonymous formats — templates, design assets, and faceless content channels where your eye for visuals does the talking.',
    };
  }
  if (answers.time === 'low') {
    return {
      title: 'The Lean Starter',
      desc: 'With limited hours, you need a low-maintenance model that compounds — automated digital products that sell while you\'re doing something else entirely.',
    };
  }
  if (answers.skill === 'people') {
    return {
      title: 'The Quiet Connector',
      desc: 'You don\'t need to be loud to sell — you need the right offer in front of the right audience. A model built around outreach and relationships fits you best.',
    };
  }
  return {
    title: 'The Systems Builder',
    desc: 'You\'re ready to build something repeatable — a model with real structure, ready to scale once the first version is working.',
  };
}

export default function LeadMagnetQuiz({ onSubmit, variant = 'light', source = 'unknown' }) {
  const [step, setStep] = useState(0); // 0..N-1 = questions, N = email capture, N+1 = result
  const [answers, setAnswers] = useState({});
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setErrorMsg] = useState('');

  const totalSteps = QUESTIONS.length + 1; // + email step
  const progressPct = Math.min((step / totalSteps) * 100, 100);

  const handleAnswer = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setStep((s) => s + 1);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    const valid = EMAIL_REGEX_CHECK.test(email);
    if (!valid) {
      setErrorMsg('That email doesn\'t look right — mind double-checking it?');
      return;
    }
    setErrorMsg('');
    setSubmitting(true);

    const { title, desc } = getResult(answers);

    try {
      if (onSubmit) {
        // Caller wants to handle the API call itself
        await onSubmit(email, title);
      } else {
        // Default: call the backend endpoint directly
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/lead-magnet/quiz`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            resultKey: title,
            resultDesc: desc,
            answers,
            source,
          }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || 'Something went wrong submitting your result.');
        }
      }
      setSubmitted(true);
      setStep((s) => s + 1);
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const restart = () => {
    setAnswers({});
    setEmail('');
    setSubmitted(false);
    setErrorMsg('');
    setStep(0);
  };

  const result = getResult(answers);
  const isQuestionStep = step < QUESTIONS.length;
  const isEmailStep = step === QUESTIONS.length;
  const isResultStep = step === QUESTIONS.length + 1;

  return (
    <div className={`lmq-card lmq-card--${variant}`}>
      <div className="lmq-progress-track" aria-hidden="true">
        <div className="lmq-progress-fill" style={{ width: `${progressPct}%` }} />
      </div>

      <div className="lmq-eyebrow">FREE 60-SECOND QUIZ</div>

      {isQuestionStep && (
        <div className="lmq-step" role="group" aria-label={`Question ${step + 1} of ${QUESTIONS.length}`}>
          <h3 className="lmq-question">{QUESTIONS[step].question}</h3>
          <div className="lmq-options">
            {QUESTIONS[step].options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className="lmq-option-btn"
                onClick={() => handleAnswer(QUESTIONS[step].id, opt.value)}
              >
                {opt.label}
                <span className="lmq-option-arrow" aria-hidden="true">→</span>
              </button>
            ))}
          </div>
          <p className="lmq-step-count">{step + 1} of {QUESTIONS.length}</p>
        </div>
      )}

      {isEmailStep && (
        <div className="lmq-step">
          <h3 className="lmq-question">Almost there — where should we send your result?</h3>
          <p className="lmq-email-sub">You'll also get one short email a week with model-specific tips. Unsubscribe anytime.</p>
          <form onSubmit={handleEmailSubmit} className="lmq-email-form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="lmq-email-input"
              aria-label="Email address"
              aria-invalid={!!error}
              required
            />
            <button type="submit" className="lmq-submit-btn" disabled={submitting}>
              {submitting ? 'Sending…' : 'Show my result →'}
            </button>
          </form>
          {error && <p className="lmq-error" role="alert">{error}</p>}
        </div>
      )}

      {isResultStep && (
        <div className="lmq-step lmq-result">
          <span className="lmq-result-tag">YOUR MATCH</span>
          <h3 className="lmq-result-title">{result.title}</h3>
          <p className="lmq-result-desc">{result.desc}</p>
          <p className="lmq-result-footnote">
            Check your inbox — your full result and a starter resource are on the way.
          </p>
          <button type="button" className="lmq-restart-btn" onClick={restart}>
            Retake quiz
          </button>
        </div>
      )}
    </div>
  );
}
