'use client';
import { Typewriter } from 'react-simple-typewriter';

export default function AnimatedText() {
  return (
    <div className="text-3xl font-semibold">
      <span>Try & </span>
      <span className="text-blue-600">
        <Typewriter
          words={['Buy', 'Upload', 'Compare', 'Analyze', 'Explore']}
          loop={0} // Infinite loop
          cursor
          cursorStyle="|"
          typeSpeed={120}
          deleteSpeed={80}
          delaySpeed={1500} // Pause after a word is completed
        />
      </span>
      <span>with AI</span>
    </div>
  );
}
