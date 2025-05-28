import { Button } from "@/components/ui/button";
import { Mail, Download } from "lucide-react";

const Header = () => {
  return (
    <header className="text-center space-y-6 mb-12">
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl font-light tracking-tight">
          Spencer
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
          Full Stack Developer crafting modern web experiences with clean code and thoughtful design.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button 
          variant="outline" 
          className="hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          <Mail className="h-4 w-4 mr-2" />
          Get in Touch
        </Button>
        <Button 
          variant="ghost" 
          className="hover:bg-secondary transition-colors"
        >
          <Download className="h-4 w-4 mr-2" />
          Download CV
        </Button>
      </div>
    </header>
  );
};

export default Header;