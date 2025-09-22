import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  Users, 
  Target, 
  Heart,
  Zap,
  Shield,
  Award,
  Globe
} from "lucide-react";
import Header from "@/components/Header";
import { Link } from "react-router-dom";

const About = () => {
  const teamMembers = [
    {
      name: "Alex Chen",
      role: "CEO & Founder",
      description: "AI visionary with 10+ years in machine learning"
    },
    {
      name: "Sarah Johnson", 
      role: "CTO",
      description: "Former Google engineer, expert in computer vision"
    },
    {
      name: "Mike Rodriguez",
      role: "Head of Design", 
      description: "Award-winning designer with passion for user experience"
    }
  ];

  const values = [
    {
      icon: Zap,
      title: "Innovation First",
      description: "We push the boundaries of what's possible with AI"
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "Your data and creations are always protected"
    },
    {
      icon: Heart,
      title: "User-Centric",
      description: "Every feature is designed with our users in mind"
    },
    {
      icon: Globe,
      title: "Accessibility",
      description: "Making AI tools accessible to creators worldwide"
    }
  ];

  const stats = [
    { value: "1M+", label: "Images Created" },
    { value: "50K+", label: "Active Users" },
    { value: "150+", label: "Countries" },
    { value: "99.9%", label: "Uptime" }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-12 space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <Badge className="bg-primary/10 text-primary border-primary/20">
            About Imagify
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gradient-ai">
            Democratizing AI<br />
            Creative Tools
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We believe everyone should have access to powerful AI tools for image creation, 
            enhancement, and manipulation. Our mission is to make professional-grade AI 
            accessible to creators of all skill levels.
          </p>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="card-ai text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-gradient-ai mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Our Story */}
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Target className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-bold">Our Story</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Founded in 2023, Imagify was born from a simple observation: AI image tools 
                were either too complex for beginners or too limited for professionals. 
                We set out to bridge this gap.
              </p>
              <p>
                Starting with just three core tools, we've grown into a comprehensive 
                platform that serves creators, marketers, developers, and artists worldwide. 
                Our focus remains unchanged: making powerful AI accessible to everyone.
              </p>
              <p>
                Today, we're proud to be the go-to platform for AI-powered image creation, 
                trusted by over 50,000 users across 150+ countries.
              </p>
            </div>
          </div>
          
          <Card className="card-ai-feature">
            <CardContent className="p-8">
              <div className="flex items-center justify-center w-24 h-24 bg-gradient-ai-primary rounded-2xl mx-auto mb-6">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-bold text-center mb-4">Our Vision</h3>
              <p className="text-muted-foreground text-center">
                A world where creativity knows no bounds, where anyone can bring their 
                ideas to life with the power of AI, regardless of technical expertise.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Values */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do and build
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="card-ai text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="space-y-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Users className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-bold">Meet Our Team</h2>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The passionate individuals behind Imagify
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="card-ai text-center">
                <CardHeader>
                  <div className="w-20 h-20 bg-gradient-ai-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center space-y-6">
          <Card className="card-ai-feature max-w-2xl mx-auto">
            <CardContent className="p-8">
              <Award className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Ready to Create?</h3>
              <p className="text-muted-foreground mb-6">
                Join thousands of creators who are already using Imagify to bring their ideas to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="btn-ai-primary">
                  <Link to="/signup">Start Creating Free</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/pricing">View Pricing</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default About;