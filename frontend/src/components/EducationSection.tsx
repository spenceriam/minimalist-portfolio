import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Calendar, MapPin, Award } from "lucide-react";
import { motion } from "framer-motion";

const EducationSection = () => {
  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "University of California, Berkeley",
      location: "Berkeley, CA",
      period: "2019 - 2023",
      description: "Focused on software engineering, data structures, and algorithms. Graduated with honors and completed a senior capstone project on machine learning applications.",
      achievements: ["Dean's List", "CS Honor Society", "Capstone Project Award"],
      coursework: ["Data Structures", "Algorithms", "Machine Learning", "Software Engineering"]
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
          <GraduationCap className="h-6 w-6 text-blue-400" />
        </motion.div>
        <h2 className="text-2xl font-medium text-white">Education</h2>
      </div>
      
      <div className="space-y-4">
        {education.map((edu, index) => (
          <motion.div
            key={`${edu.school}-${edu.degree}`}
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
                    <h3 className="text-xl font-medium mb-1 text-gradient">{edu.degree}</h3>
                    <p className="text-lg text-white mb-2">{edu.school}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{edu.period}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{edu.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-slate-300 mb-4 leading-relaxed">
                  {edu.description}
                </p>
                
                {edu.achievements && (
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="h-4 w-4 text-blue-400" />
                      <span className="text-sm font-medium text-white">Achievements</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {edu.achievements.map((achievement, achievementIndex) => (
                        <motion.div
                          key={achievement}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: achievementIndex * 0.05 }}
                          viewport={{ once: true }}
                        >
                          <Badge 
                            variant="secondary" 
                            className="bg-blue-900/30 text-blue-300 border-blue-700/50 hover:bg-blue-800/40 hover:text-blue-200 transition-all duration-200"
                          >
                            {achievement}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2">
                  {edu.coursework.map((course, courseIndex) => (
                    <motion.div
                      key={course}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: courseIndex * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <Badge 
                        variant="secondary" 
                        className="bg-slate-700/50 text-slate-300 border-slate-600/50 hover:bg-slate-600/50 hover:text-white transition-all duration-200"
                      >
                        {course}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400/5 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  layoutId={`education-bg-${edu.school}`}
                />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default EducationSection;