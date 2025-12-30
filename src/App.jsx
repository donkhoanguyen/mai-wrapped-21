import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import LoginPage from './components/LoginPage';
import OpeningThoughtsPage from './components/OpeningThoughtsPage';
import ArchetypePage from './components/ArchetypePage';
import TruthDetectorPage from './components/TruthDetectorPage';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState({ name: '' });

  const handleLogin = (name) => {
    setUserData({ ...userData, name });
    setCurrentStep(2);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-50 text-slate-800 font-sans">
      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <LoginPage key="login" onLogin={handleLogin} />
        )}
        {currentStep === 2 && (
          <OpeningThoughtsPage key="thoughts" onNext={() => setCurrentStep(3)} />
        )}
        {currentStep === 3 && (
          <ArchetypePage key="archetype" onNext={() => setCurrentStep(4)} />
        )}
        {currentStep === 4 && (
          <TruthDetectorPage key="truth" onNext={() => setCurrentStep(5)} />
        )}
      </AnimatePresence>
      
      {/* Bottom Status - "System Syncing..." */}
      <div className="absolute bottom-4 right-4 text-xs text-slate-400 font-mono opacity-60 pointer-events-none">
        System Syncing...
      </div>
    </div>
  );
}

export default App;

