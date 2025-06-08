import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const WorkExperienceSection = () => {
  const experiences = [
    {
      title: "Product Manager",
      company: "Von.dev",
      location: "Remote",
      period: "2024 - Present",
      description: "Leading product strategy and development for AI-powered development tools. Collaborating with engineering teams to deliver innovative solutions that enhance developer productivity.",
      skills: ["Product Strategy", "AI/ML", "Team Leadership", "User Research"]
    },
    {
      title: "Associate Product Manager",
      company: "Vibe",
      location: "San Francisco, CA",
      period: "2023 - 2024",
      description: "Managed product roadmap for collaboration features, resulting in 40% increase in user engagement. Led cross-functional teams to deliver key product milestones.",
      skills: ["Product Management", "Data Analysis", "Cross-functional Leadership", "User Experience"]
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
          <Briefcase className="h-6 w-6 text-blue-400" />
        </motion.div>
        <h2 className="text-2xl font-medium text-white">Work Experience</h2>
      </div>
      
      <div className="space-y-4">
        {experiences.map((experience, index) => (
          <motion.div
            key={`${experience.company}-${experience.title}`}
            className="group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            viewport={{ once: true }}
          >
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-blue-400/60 hover:bg-slate-700/50">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-medium mb-1 text-gradient">{experience.title}</h3>
                    <p className="text-lg text-white mb-2">{experience.company}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{experience.period}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{experience.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-slate-300 mb-4 leading-relaxed">
                  {experience.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {experience.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <Badge 
                        variant="secondary" 
                        className="bg-slate-700/50 text-slate-300 border-slate-600/50 hover:bg-slate-600/50 hover:text-white transition-all duration-200"
                      >
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400/5 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  layoutId={`experience-bg-${experience.company}`}
                />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default WorkExperienceSection;