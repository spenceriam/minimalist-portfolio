import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar, MapPin, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const WorkExperienceSection = () => {
  const experiences = [
    {
      title: "Senior Business Analyst",
      company: "Zebra Technologies",
      location: "Lincolnshire, IL",
      period: "Sep 2018 - Present",
      description: "Leading pre-sales quoting solutions in Salesforce as both Business Analyst and Product Owner. Specializing in requirements gathering, solution wireframing, and cross-functional collaboration with IT development teams. Translating complex business needs into actionable development solutions.",
      skills: ["Product Strategy", "Salesforce", "Requirements Gathering", "Cross-functional Leadership"],
      vibe: "🎯 Product ownership mindset"
    },
    {
      title: "Enterprise Systems Analyst II",
      company: "Zebra Technologies",
      location: "Lincolnshire, IL",
      period: "Feb 2013 - Sep 2018",
      description: "Business Systems Analyst specializing in Oracle ERP WMS and Inventory systems. Led shipping execution using Creative Logistics Solutions and Bluejay's Kewill/Parcel. Designed and implemented solutions while conducting comprehensive system testing and cross-functional collaboration.",
      skills: ["Oracle ERP", "WMS", "System Integration", "Testing"],
      vibe: "⚙️ Systems integration expert"
    },
    {
      title: "Client System Administrator II",
      company: "Zebra Technologies",
      location: "Vernon Hills, IL",
      period: "Dec 2011 - Feb 2013",
      description: "Help Desk administrator managing tickets across multiple systems including Active Directory, Exchange, Oracle Applications, and Java applications. Focused on delivering high-quality customer service and maintaining security compliance.",
      skills: ["Active Directory", "Exchange", "Oracle Applications", "Customer Service"],
      vibe: "🛠️ Problem-solving focused"
    },
    {
      title: "Regional IT Support",
      company: "Passages Hospice",
      location: "Swansea, IL",
      period: "Feb 2010 - Sep 2011",
      description: "Provided comprehensive IT support across multiple office locations, managing everything from mobile devices to networking equipment. Handled inventory management, staff training, and created marketing materials while maintaining 24/7 support availability.",
      skills: ["IT Support", "Network Management", "Training", "Inventory Management"],
      vibe: "🌐 Multi-location support"
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
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <TrendingUp className="h-5 w-5 text-green-400" />
        </motion.div>
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
                    {experience.vibe && (
                      <p className="text-sm text-blue-400 mb-3">{experience.vibe}</p>
                    )}
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