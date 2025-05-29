import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Download, Sparkles, Code2, BarChart3, Zap, Settings } from "lucide-react";
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
            className="relative group"
            initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.1,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ 
              scale: 1.1,
              rotate: 2,
              transition: { duration: 0.3 }
            }}
          >
            {/* Animated background rings */}
            <motion.div
              className="absolute -inset-4 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 opacity-75"
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            />
            
            {/* Secondary ring */}
            <motion.div
              className="absolute -inset-2 rounded-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 opacity-60"
              animate={{ 
                rotate: -360,
                scale: [1.1, 1, 1.1]
              }}
              transition={{ 
                rotate: { duration: 6, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
            />
            
            {/* Main image container */}
            <div className="relative">
              <img
                src="/headshot.jpg"
                alt="Spencer's headshot"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-2xl relative z-10 group-hover:border-cyan-300 transition-all duration-500"
              />
              
              {/* Hover overlay with sparkle effect */}
              <motion.div 
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-400/20 via-cyan-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
                whileHover={{
                  background: [
                    "radial-gradient(circle at 20% 20%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)",
                    "radial-gradient(circle at 80% 80%, rgba(34, 211, 238, 0.3) 0%, transparent 50%)",
                    "radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Floating particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100"
                  style={{
                    top: `${20 + i * 15}%`,
                    left: `${10 + i * 12}%`,
                  }}
                  animate={{
                    y: [-10, -20, -10],
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </motion.div>
          
          <div>
            <h1 className="text-5xl sm:text-6xl font-light tracking-tight gradient-text mb-4">
              Hi, I'm Spencer
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-2 mb-4 max-w-2xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <Badge variant="secondary" className="bg-pink-500/20 text-pink-200 hover:bg-pink-500/30 transition-colors border-pink-300/30">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Vibe Coder
                </Badge>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <Badge variant="secondary" className="bg-orange-500/20 text-orange-200 hover:bg-orange-500/30 transition-colors border-orange-300/30">
                  <Code2 className="h-3 w-3 mr-1" />
                  Product Manager
                </Badge>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <Badge variant="secondary" className="bg-purple-500/20 text-purple-200 hover:bg-purple-500/30 transition-colors border-purple-300/30">
                  <BarChart3 className="h-3 w-3 mr-1" />
                  Analyst
                </Badge>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-200 hover:bg-cyan-500/30 transition-colors border-cyan-300/30">
                  <Zap className="h-3 w-3 mr-1" />
                  Future Tech Leader
                </Badge>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.7 }}
              >
                <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-200 hover:bg-emerald-500/30 transition-colors border-emerald-300/30">
                  <Settings className="h-3 w-3 mr-1" />
                  Solutions Enabler
                </Badge>
              </motion.div>
            </div>
          </div>
        </motion.div>
        
        <motion.p 
          className="text-xl text-blue-light max-w-2xl mx-auto text-balance leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          I'm an AI-enabled product manager/analyst, rediscovering coding through vibe-driven AI, crafting impactful solutions with bold instinct. I'm paving a daring path, building products that resonate and redefining what's possible in tech.
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
          asChild
        >
          <a 
            href="/Spencer Franicsco - Resume.pdf" 
            download
            className="flex items-center"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Resume
          </a>
        </Button>
      </motion.div>
    </motion.header>
  );
};

export default Header;