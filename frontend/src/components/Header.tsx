import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Download, Sparkles, Code2 } from "lucide-react";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.header 
      className="text-center space-y-8 mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="space-y-6">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center gap-6"
        >
          <motion.div
            className="relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <img
              src="/headshot.jpg"
              alt="Spencer's headshot"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-light/30 shadow-2xl hover:border-blue-light/60 transition-all duration-300 hover:scale-105"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-light/10 to-cream/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
          
          <div>
            <h1 className="text-5xl sm:text-6xl font-light tracking-tight gradient-text mb-4">
              Hi, I'm Spencer
            </h1>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Badge variant="secondary" className="bg-blue-medium/20 text-blue-light hover:bg-blue-medium/30 transition-colors border-blue-light/30">
                <Sparkles className="h-3 w-3 mr-1" />
                Vibe Coder
              </Badge>
              <Badge variant="secondary" className="bg-blue-medium/20 text-cream hover:bg-blue-medium/30 transition-colors border-cream/30">
                <Code2 className="h-3 w-3 mr-1" />
                Product Manager
              </Badge>
            </div>
          </div>
        </motion.div>
        
        <motion.p 
          className="text-xl text-blue-light max-w-2xl mx-auto text-balance leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          I'm a dev relearning the art of software development through vibe coding, wielding AI with raw instinct to craft code. As a product manager, I'm forging a bold path, building products that matter and disrupting the game.
        </motion.p>
      </div>
      
      <motion.div 
        className="flex flex-col sm:flex-row gap-4 justify-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Button 
          className="bg-navy-medium hover:bg-navy-dark text-cream border-2 border-blue-light hover:border-cream shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          size="lg"
        >
          <Mail className="h-4 w-4 mr-2" />
          Let's Connect
        </Button>
        <Button 
          className="bg-navy-medium hover:bg-navy-dark text-cream border-2 border-blue-light hover:border-cream shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          size="lg"
        >
          <Download className="h-4 w-4 mr-2" />
          Download CV
        </Button>
      </motion.div>
    </motion.header>
  );
};

export default Header;