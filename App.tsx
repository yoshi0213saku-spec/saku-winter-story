
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { STORY_DATA } from './constants';
import PlaceholderImage from './components/PlaceholderImage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const totalPages = STORY_DATA.length;

  const handleNext = useCallback(() => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    }
  }, [currentPage, totalPages]);

  const handlePrev = useCallback(() => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  }, [currentPage]);

  // Handle key navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Swiping logic
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();
  };

  const currentData = STORY_DATA[currentPage];

  return (
    <div 
      className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 md:p-8"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Main Story Card */}
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col min-h-[500px] transition-all duration-500 transform">
        
        {/* Progress Bar */}
        <div className="w-full h-1 bg-gray-100 flex">
          {STORY_DATA.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-full flex-1 transition-all duration-500 ${idx <= currentPage ? 'bg-blue-400' : 'bg-transparent'}`}
            />
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-grow p-6 md:p-10 flex flex-col">
          <header className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 border-l-4 border-blue-400 pl-4">
              {currentData.title}
            </h1>
            <span className="text-sm font-semibold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
              {currentPage + 1} / {totalPages}
            </span>
          </header>

          <div className="mb-8">
            <PlaceholderImage description={currentData.imageDescription} />
          </div>

          <div className="story-content text-lg text-slate-700 whitespace-pre-wrap">
            {currentData.content}
          </div>
        </div>

        {/* Navigation Controls */}
        <footer className="p-6 bg-slate-50 flex items-center justify-between border-t border-slate-100">
          <button 
            onClick={handlePrev}
            disabled={currentPage === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
              currentPage === 0 
                ? 'text-slate-300 cursor-not-allowed' 
                : 'text-blue-600 hover:bg-blue-100 active:scale-95'
            }`}
          >
            <i className="fas fa-chevron-left"></i>
            <span>前へ</span>
          </button>

          <div className="hidden md:flex gap-2">
            {STORY_DATA.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx)}
                className={`w-3 h-3 rounded-full transition-all ${idx === currentPage ? 'bg-blue-500 scale-125' : 'bg-slate-300'}`}
              />
            ))}
          </div>

          <button 
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
              currentPage === totalPages - 1 
                ? 'text-slate-300 cursor-not-allowed' 
                : 'text-blue-600 hover:bg-blue-100 active:scale-95'
            }`}
          >
            <span>{currentPage === totalPages - 1 ? 'おわり' : '次へ'}</span>
            <i className="fas fa-chevron-right"></i>
          </button>
        </footer>
      </div>

      {/* Tip for mobile users */}
      <p className="mt-6 text-slate-400 text-sm flex items-center gap-2 animate-pulse">
        <i className="fas fa-hand-pointer"></i>
        <span>左右にスワイプしてページをめくれます</span>
      </p>

      {/* Decorative background elements (optional) */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] opacity-20 overflow-hidden">
        <i className="fas fa-snowflake absolute top-10 left-[10%] text-blue-200 text-4xl animate-bounce" style={{animationDuration: '3s'}}></i>
        <i className="fas fa-snowflake absolute top-40 right-[15%] text-blue-200 text-2xl animate-bounce" style={{animationDuration: '4s'}}></i>
        <i className="fas fa-snowflake absolute bottom-20 left-[20%] text-blue-200 text-3xl animate-bounce" style={{animationDuration: '5s'}}></i>
      </div>
    </div>
  );
};

export default App;
