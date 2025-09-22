import { Button } from "@/components/ui/button";
import { Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="glass border-b sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-ai-primary rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gradient-ai">Imagify</h1>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/generate" className="text-muted-foreground hover:text-primary transition-colors">
            Generate
          </Link>
          <Link to="/enhance" className="text-muted-foreground hover:text-primary transition-colors">
            Enhance
          </Link>
          <Link to="/remove-bg" className="text-muted-foreground hover:text-primary transition-colors">
            Remove BG
          </Link>
          <Link to="/pricing" className="text-muted-foreground hover:text-primary transition-colors">
            Pricing
          </Link>
          <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
            About
          </Link>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button asChild variant="ghost" className="text-muted-foreground hover:text-primary">
            <Link to="/login">Sign In</Link>
          </Button>
          <Button asChild className="btn-ai-primary">
            <Link to="/signup">
              <Zap className="w-4 h-4 mr-2" />
              Get Started
            </Link>
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;