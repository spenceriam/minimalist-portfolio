import Header from '@/components/Header';
import GithubSection from '@/components/GithubSection';
import WorkExperienceSection from '@/components/WorkExperienceSection';
import EducationSection from '@/components/EducationSection';
import ContactModal from '@/components/ContactModal';
import AnimatedBackground from '@/components/AnimatedBackground';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Index() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen w-full m-0 p-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <AnimatedBackground />
      
      <div className="relative z-10 min-h-screen">
        <Header onConnectClick={() => setIsContactModalOpen(true)} />
        
        <main className="container mx-auto px-4 py-8 space-y-12 max-w-screen-xl">
          <GithubSection />
          <WorkExperienceSection />
          <EducationSection />
        </main>

        {/* Enhanced Footer */}
        <footer className="relative z-10 py-8 mt-16 border-t border-slate-700/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 text-center max-w-screen-xl">
            <p className="text-slate-300 text-sm">
              Created by Spencer with{' '}
              <motion.a
                href="https://von.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent bg-size-200 hover:scale-105 transition-transform duration-200"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  backgroundSize: '200% 200%',
                }}
                whileHover={{
                  scale: 1.05,
                  textShadow: '0 0 8px rgba(59, 130, 246, 0.5)',
                }}
                whileTap={{ scale: 0.95 }}
              >
                Von.dev
              </motion.a>
              . Built with React, Tailwind CSS & good vibes ✨
            </p>
          </div>
        </footer>
      </div>
      
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </div>
  );
}