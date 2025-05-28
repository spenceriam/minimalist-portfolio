import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Star, GitFork } from "lucide-react";

const GithubSection = () => {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <Github className="h-6 w-6" />
        <h2 className="text-2xl font-medium">GitHub</h2>
      </div>
      
      <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-medium mb-2">@spenceriam</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Building modern web applications with clean, maintainable code.
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="hover:bg-primary hover:text-primary-foreground transition-colors"
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
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Star className="h-4 w-4" />
              <span>Featured repositories</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <GitFork className="h-4 w-4" />
              <span>Open source contributions</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default GithubSection;