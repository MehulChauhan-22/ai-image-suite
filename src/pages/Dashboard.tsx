import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Wand2, 
  Sparkles, 
  Scissors, 
  Plus, 
  History, 
  Settings,
  User,
  Crown,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import DemoGallery from "@/components/DemoGallery";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("tools");

  const tools = [
    {
      icon: Wand2,
      title: "AI Image Generation",
      description: "Create images from text descriptions",
      color: "from-purple-500 to-pink-500",
      usageCount: 8,
      usageLimit: 10,
      path: "/generate"
    },
    {
      icon: Sparkles,
      title: "Image Enhancement", 
      description: "Upscale and improve image quality",
      color: "from-blue-500 to-cyan-500",
      usageCount: 3,
      usageLimit: 10,
      path: "/enhance"
    },
    {
      icon: Scissors,
      title: "Background Removal",
      description: "Remove backgrounds with AI precision", 
      color: "from-green-500 to-emerald-500",
      usageCount: 5,
      usageLimit: 10,
      path: "/remove-bg"
    }
  ];

  const recentProjects = [
    { title: "Futuristic City", type: "Generation", date: "2 hours ago" },
    { title: "Enhanced Portrait", type: "Enhancement", date: "5 hours ago" }, 
    { title: "Product Photo", type: "Background Removal", date: "1 day ago" },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back! ✨</h1>
              <p className="text-muted-foreground">Create amazing images with AI-powered tools</p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Badge className="bg-accent text-accent-foreground">
                <Crown className="w-3 h-3 mr-1" />
                Free Plan
              </Badge>
              <Button variant="outline" className="border-primary/50 hover:border-primary">
                <Zap className="w-4 h-4 mr-2" />
                Upgrade to Pro
              </Button>
            </div>
          </div>
        </div>

        {/* Usage Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="card-ai">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Daily Usage</p>
                  <p className="text-2xl font-bold text-gradient-ai">16/30</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-ai">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Projects</p>
                  <p className="text-2xl font-bold text-gradient-ai">24</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <History className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-ai">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">This Week</p>
                  <p className="text-2xl font-bold text-gradient-ai">12</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tools Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">AI Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tools.map((tool, index) => (
                <Card key={index} className="card-ai-feature group cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${tool.color} flex items-center justify-center shadow-lg`}>
                        <tool.icon className="w-6 h-6 text-white" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {tool.usageCount}/{tool.usageLimit}
                      </Badge>
                    </div>
                    
                    <CardTitle className="text-xl">{tool.title}</CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    {/* Usage Bar */}
                    <div className="mb-4">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full bg-gradient-to-r ${tool.color}`}
                          style={{ width: `${(tool.usageCount / tool.usageLimit) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <Button asChild className="w-full btn-ai-primary">
                      <Link to={tool.path}>
                        <Plus className="w-4 h-4 mr-2" />
                        Start Creating
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Projects */}
            <Card className="card-ai">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <History className="w-5 h-5 mr-2 text-primary" />
                  Recent Projects
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentProjects.map((project, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
                    <div>
                      <p className="font-medium text-sm">{project.title}</p>
                      <p className="text-xs text-muted-foreground">{project.type}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{project.date}</p>
                  </div>
                ))}
                
                <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                  View All Projects
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="card-ai">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-primary" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="ghost" className="w-full justify-start">
                  <User className="w-4 h-4 mr-2" />
                  Account Settings
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade Plan
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <History className="w-4 h-4 mr-2" />
                  Download History
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Demo Gallery Section */}
        <div className="mt-16">
          <DemoGallery />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;