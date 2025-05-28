import Header from "@/components/Header";
import GithubSection from "@/components/GithubSection";
import EducationSection from "@/components/EducationSection";
import WorkExperienceSection from "@/components/WorkExperienceSection";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen bg-background m-0 p-0">
      <div className="gradient-bg min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <Header />
          
          <motion.div 
            className="space-y-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <GithubSection />
            <EducationSection />
            <WorkExperienceSection />
          </motion.div>
          
          <motion.footer 
            className="mt-20 pt-8 border-t border-purple-200 text-center text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p>© 2024 Spencer. Built with React, Tailwind CSS & good vibes ✨</p>
          </motion.footer>
        </div>
      </div>
    </div>
  );
};

export default Index;