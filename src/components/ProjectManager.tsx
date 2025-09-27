import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { 
  Save, 
  FolderOpen, 
  Trash2, 
  MoreVertical, 
  Clock, 
  Image,
  Plus,
  Search,
  Filter
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Project {
  id: string;
  name: string;
  description?: string;
  tool: string;
  originalImage?: string;
  processedImage?: string;
  settings?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

interface ProjectManagerProps {
  currentProject?: Project | null;
  onSaveProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onLoadProject: (project: Project) => void;
  onDeleteProject: (projectId: string) => void;
  className?: string;
}

const ProjectManager = ({
  currentProject,
  onSaveProject,
  onLoadProject,
  onDeleteProject,
  className
}: ProjectManagerProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTool, setFilterTool] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [saveForm, setSaveForm] = useState({
    name: "",
    description: ""
  });

  // Load projects from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("imagify-projects");
    if (saved) {
      try {
        const parsed = JSON.parse(saved).map((p: any) => ({
          ...p,
          createdAt: new Date(p.createdAt),
          updatedAt: new Date(p.updatedAt)
        }));
        setProjects(parsed);
      } catch (error) {
        console.error("Failed to load projects:", error);
      }
    }
  }, []);

  // Save projects to localStorage whenever projects change
  useEffect(() => {
    localStorage.setItem("imagify-projects", JSON.stringify(projects));
  }, [projects]);

  const handleSaveProject = () => {
    if (!saveForm.name.trim()) return;

    const projectData = {
      name: saveForm.name,
      description: saveForm.description,
      tool: "generate", // This would come from current context
      originalImage: undefined, // These would come from current state
      processedImage: undefined,
      settings: {}
    };

    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setProjects(prev => [newProject, ...prev]);
    onSaveProject(projectData);
    setSaveForm({ name: "", description: "" });
    setIsDialogOpen(false);
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
    onDeleteProject(projectId);
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterTool === "all" || project.tool === filterTool;
    return matchesSearch && matchesFilter;
  });

  const getToolBadge = (tool: string) => {
    const toolConfig = {
      generate: { label: "Generate", color: "bg-purple-500" },
      enhance: { label: "Enhance", color: "bg-blue-500" },
      remove: { label: "Remove BG", color: "bg-green-500" },
      cleanup: { label: "Cleanup", color: "bg-orange-500" },
    };
    
    return toolConfig[tool as keyof typeof toolConfig] || { label: tool, color: "bg-gray-500" };
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Projects</h2>
          <p className="text-muted-foreground">Save and manage your AI creations</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="btn-ai-primary">
              <Save className="w-4 h-4 mr-2" />
              Save Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Save Project</DialogTitle>
              <DialogDescription>
                Give your project a name and description to save it for later.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="project-name">Project Name</Label>
                <Input
                  id="project-name"
                  value={saveForm.name}
                  onChange={(e) => setSaveForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="My awesome creation"
                />
              </div>
              <div>
                <Label htmlFor="project-description">Description (optional)</Label>
                <Input
                  id="project-description"
                  value={saveForm.description}
                  onChange={(e) => setSaveForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what you created..."
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveProject} disabled={!saveForm.name.trim()}>
                  Save Project
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              {filterTool === "all" ? "All Tools" : getToolBadge(filterTool).label}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setFilterTool("all")}>
              All Tools
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterTool("generate")}>
              Generate
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterTool("enhance")}>
              Enhance
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterTool("remove")}>
              Remove BG
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <Card className="py-12">
          <CardContent className="text-center space-y-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
              <FolderOpen className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <p className="text-lg font-medium">
                {projects.length === 0 ? "No saved projects" : "No projects found"}
              </p>
              <p className="text-muted-foreground">
                {projects.length === 0 
                  ? "Save your first project to see it here" 
                  : "Try adjusting your search or filter"
                }
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="card-ai group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    {project.description && (
                      <CardDescription className="line-clamp-2">
                        {project.description}
                      </CardDescription>
                    )}
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => onLoadProject(project)}>
                        <FolderOpen className="w-4 h-4 mr-2" />
                        Load Project
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-destructive"
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Preview */}
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <Image className="w-8 h-8 text-muted-foreground" />
                </div>
                
                {/* Metadata */}
                <div className="flex items-center justify-between">
                  <Badge 
                    variant="secondary" 
                    className={cn("text-white", getToolBadge(project.tool).color)}
                  >
                    {getToolBadge(project.tool).label}
                  </Badge>
                  
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="w-3 h-3 mr-1" />
                    {project.updatedAt.toLocaleDateString()}
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => onLoadProject(project)}
                >
                  <FolderOpen className="w-4 h-4 mr-2" />
                  Load Project
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectManager;