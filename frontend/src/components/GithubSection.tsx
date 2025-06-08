import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Zap, Eye, Code } from "lucide-react";
import { motion } from "framer-motion";

const GithubSection = () => {
  const featuredProjects = [
    { 
      name: "This Portfolio", 
      description: "Minimalist portfolio showcasing modern web development",
      url: "https://github.com/spenceriam/minimalist-portfolio" 
    },
    { 
      name: "InkFrame", 
      description: "Raspberry Pi Zero 2 W powered e-ink Photo frame",
      url: "https://github.com/spenceriam/InkFrame" 
    },
    { 
      name: "Meowgenda", 
      description: "Smart calendar/share board - Meowgenda",
      url: "https://github.com/spenceriam/meowgenda" 
    },
    { 
      name: "Media Visualizer", 
      description: "Label media visualizer for SFDC",
      url: "https://github.com/spenceriam/mediaVisualizer" 
    },
    { 
      name: "Lion Mystic", 
      description: "Lion Mystic landing page",
      url: "https://github.com/spenceriam/LionMysticDesignsLanding" 
    },
    { 
      name: "Num Nom Dash", 
      description: "Number Munchers inspired mobile web app/game",
      url: "https://github.com/spenceriam/num-nom-dash" 
    }
  ];

  return (
    <motion.section 
      className="space-y-6"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-3">
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <Github className="h-6 w-6 text-blue-400" />
        </motion.div>
        <h2 className="text-2xl font-medium text-white">GitHub</h2>
      </div>
      
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
      >
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
          <CardContent className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-medium mb-2 text-gradient">@spenceriam</h3>
                <p className="text-slate-300 mb-4 leading-relaxed">
                  Building modern web applications with clean, maintainable code. 
                  Learning in public and shipping with passion.
                </p>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Zap className="h-4 w-4" />
                  <span>Currently exploring React & TypeScript</span>
                </div>
              </div>
              <Button 
                className="glass-button text-white hover:text-white"
                size="sm"
                asChild
              >
                <a 
                  href="https://github.com/spenceriam" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  View Profile
                </a>
              </Button>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-white">Featured Projects</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {featuredProjects.map((project, index) => (
                  <motion.div
                    key={project.name}
                    className="group relative p-4 rounded-lg bg-slate-800/30 border border-slate-700/50 hover:border-blue-400/60 transition-all duration-300 hover:bg-slate-700/50"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400/5 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      layoutId={`project-bg-${project.name}`}
                    />
                    
                    <div className="flex flex-col gap-3 relative z-10">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <span className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors block mb-1">
                            {project.name}
                          </span>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            {project.description}
                          </p>
                        </div>
                        <Code className="h-4 w-4 text-slate-400 group-hover:text-blue-400 transition-colors flex-shrink-0 ml-2" />
                      </div>
                      
                      <a 
                        href={project.url}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block w-full"
                      >
                        <Button
                          size="sm"
                          className="project-button text-white hover:text-white w-full text-xs"
                        >
                          <Github className="h-3 w-3 mr-1" />
                          View Project
                        </Button>
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.section>
  );
};

export default GithubSection;