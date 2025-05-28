import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar } from "lucide-react";

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

const WorkExperienceSection = () => {
  const experiences: Experience[] = [
    {
      title: "Senior Frontend Developer",
      company: "Tech Company",
      period: "2022 - Present",
      description: "Led development of modern web applications using React and TypeScript. Collaborated with design teams to create intuitive user experiences.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Next.js"]
    },
    {
      title: "Full Stack Developer",
      company: "Digital Agency",
      period: "2020 - 2022",
      description: "Built responsive web applications and RESTful APIs. Worked closely with clients to deliver custom solutions.",
      technologies: ["JavaScript", "Node.js", "React", "PostgreSQL"]
    },
    {
      title: "Frontend Developer",
      company: "Startup",
      period: "2019 - 2020",
      description: "Developed user interfaces for web applications. Focused on performance optimization and accessibility.",
      technologies: ["HTML", "CSS", "JavaScript", "Vue.js"]
    }
  ];

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <Briefcase className="h-6 w-6" />
        <h2 className="text-2xl font-medium">Work Experience</h2>
      </div>
      
      <div className="space-y-4">
        {experiences.map((exp, index) => (
          <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-lg font-medium">{exp.title}</h3>
                  <p className="text-muted-foreground">{exp.company}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{exp.period}</span>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {exp.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech, techIndex) => (
                  <Badge 
                    key={techIndex} 
                    variant="secondary" 
                    className="text-xs font-normal"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default WorkExperienceSection;