import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Check, 
  Zap, 
  Crown, 
  Sparkles,
  X,
  Star
} from "lucide-react";
import Header from "@/components/Header";
import { Link } from "react-router-dom";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Free",
      price: { monthly: 0, annual: 0 },
      description: "Perfect for trying out AI tools",
      badge: null,
      features: [
        "10 AI generations per day",
        "5 image enhancements per day", 
        "3 background removals per day",
        "Basic image quality",
        "Standard processing speed",
        "Community support"
      ],
      limitations: [
        "Watermarked outputs",
        "Limited resolution (512x512)",
        "No batch processing",
        "No API access"
      ],
      cta: "Get Started Free",
      popular: false
    },
    {
      name: "Pro",
      price: { monthly: 19, annual: 190 },
      description: "For serious creators and professionals",
      badge: "Most Popular",
      features: [
        "200 AI generations per day",
        "100 image enhancements per day",
        "50 background removals per day", 
        "High-quality outputs (HD)",
        "Priority processing",
        "Advanced editing tools",
        "Email support",
        "No watermarks",
        "Up to 2K resolution",
        "Batch processing"
      ],
      limitations: [],
      cta: "Start Pro Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: { monthly: 99, annual: 990 },
      description: "For teams and businesses",
      badge: "Best Value",
      features: [
        "Unlimited AI generations",
        "Unlimited enhancements", 
        "Unlimited background removal",
        "Ultra HD quality (4K+)",
        "Instant processing",
        "Advanced API access",
        "Custom integrations",
        "Priority support",
        "Team management",
        "Usage analytics",
        "White-label options",
        "Custom training"
      ],
      limitations: [],
      cta: "Contact Sales",
      popular: false
    }
  ];

  const faqs = [
    {
      question: "Can I change plans anytime?",
      answer: "Yes! You can upgrade, downgrade, or cancel your plan at any time. Changes take effect immediately."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers for Enterprise plans."
    },
    {
      question: "Is there a free trial for paid plans?",
      answer: "Yes! Pro plans come with a 7-day free trial. No credit card required to start."
    },
    {
      question: "What happens if I exceed my limits?",
      answer: "You'll be notified when approaching limits. Excess usage can be purchased or you can upgrade your plan."
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-12 space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <Badge className="bg-primary/10 text-primary border-primary/20">
            Pricing Plans
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gradient-ai">
            Choose Your<br />
            Creative Power
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From free exploration to unlimited creation. Find the perfect plan 
            for your AI image needs.
          </p>
        </section>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center space-x-4">
          <span className={`text-sm ${!isAnnual ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
            Monthly
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative w-12 h-6 bg-muted rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <div className={`absolute w-5 h-5 bg-primary rounded-full transition-transform ${
              isAnnual ? 'translate-x-6' : 'translate-x-0.5'
            } top-0.5`} />
          </button>
          <span className={`text-sm ${isAnnual ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
            Annual
          </span>
          {isAnnual && (
            <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
              Save 20%
            </Badge>
          )}
        </div>

        {/* Pricing Cards */}
        <section className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative ${
                plan.popular 
                  ? 'card-ai-feature border-primary shadow-lg scale-105' 
                  : 'card-ai'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">
                    {plan.popular && <Star className="w-3 h-3 mr-1" />}
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-6">
                <div className="flex items-center justify-center mb-4">
                  {plan.name === 'Free' && <Zap className="w-8 h-8 text-primary" />}
                  {plan.name === 'Pro' && <Sparkles className="w-8 h-8 text-primary" />}
                  {plan.name === 'Enterprise' && <Crown className="w-8 h-8 text-primary" />}
                </div>
                
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-base">{plan.description}</CardDescription>
                
                <div className="space-y-2">
                  <div className="flex items-baseline justify-center space-x-1">
                    <span className="text-4xl font-bold">
                      ${isAnnual ? plan.price.annual : plan.price.monthly}
                    </span>
                    <span className="text-muted-foreground">
                      /{isAnnual ? 'year' : 'month'}
                    </span>
                  </div>
                  {isAnnual && plan.price.annual < plan.price.monthly * 12 && (
                    <div className="text-sm text-green-600">
                      Save ${(plan.price.monthly * 12) - plan.price.annual}/year
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Features */}
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.limitations.map((limitation, limitIndex) => (
                    <div key={limitIndex} className="flex items-center space-x-3 opacity-60">
                      <div className="w-5 h-5 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                        <X className="w-3 h-3 text-muted-foreground" />
                      </div>
                      <span className="text-sm text-muted-foreground">{limitation}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  asChild
                  className={`w-full ${
                    plan.popular ? 'btn-ai-primary' : plan.name === 'Enterprise' ? 'btn-ai-secondary' : ''
                  }`}
                  variant={plan.popular ? 'default' : plan.name === 'Enterprise' ? 'outline' : 'outline'}
                >
                  <Link to={plan.name === 'Enterprise' ? '/contact' : '/signup'}>
                    {plan.cta}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Features Comparison */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Compare All Features</h2>
            <p className="text-muted-foreground">
              See exactly what's included in each plan
            </p>
          </div>

          <Card className="card-ai overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/30">
                    <tr>
                      <th className="text-left p-4 font-medium">Features</th>
                      <th className="text-center p-4 font-medium">Free</th>
                      <th className="text-center p-4 font-medium">Pro</th>
                      <th className="text-center p-4 font-medium">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="p-4 font-medium">Daily AI Generations</td>
                      <td className="p-4 text-center">10</td>
                      <td className="p-4 text-center">200</td>
                      <td className="p-4 text-center">Unlimited</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">Max Resolution</td>
                      <td className="p-4 text-center">512x512</td>
                      <td className="p-4 text-center">2048x2048</td>
                      <td className="p-4 text-center">4096x4096</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">Processing Speed</td>
                      <td className="p-4 text-center">Standard</td>
                      <td className="p-4 text-center">Priority</td>
                      <td className="p-4 text-center">Instant</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">API Access</td>
                      <td className="p-4 text-center"><X className="w-4 h-4 mx-auto text-muted-foreground" /></td>
                      <td className="p-4 text-center"><Check className="w-4 h-4 mx-auto text-primary" /></td>
                      <td className="p-4 text-center"><Check className="w-4 h-4 mx-auto text-primary" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* FAQ */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Everything you need to know about our pricing
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <Card key={index} className="card-ai">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <Card className="card-ai-feature max-w-2xl mx-auto">
            <CardContent className="p-8">
              <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Ready to Start Creating?</h3>
              <p className="text-muted-foreground mb-6">
                Join thousands of creators and start your AI journey today. No credit card required for free plan.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="btn-ai-primary">
                  <Link to="/signup">Start Free</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/contact">Contact Sales</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Pricing;