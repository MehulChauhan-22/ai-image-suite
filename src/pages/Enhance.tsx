import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Sparkles, Upload, Download, RotateCcw, Zap } from "lucide-react";
import Header from "@/components/Header";
import demoBefore from "@/assets/demo-before.jpg";
import demoEnhanced from "@/assets/demo-enhanced.jpg";

const Enhance = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [brightness, setBrightness] = useState([100]);
  const [contrast, setContrast] = useState([100]);
  const [sharpness, setSharpness] = useState([100]);
  const [upscale, setUpscale] = useState([2]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Demo: Use demo image instead of actual upload
      setUploadedImage(demoBefore);
      setEnhancedImage(null);
    }
  };

  const handleEnhance = async () => {
    if (!uploadedImage) return;
    
    setIsEnhancing(true);
    
    // Simulate enhancement process
    setTimeout(() => {
      setEnhancedImage(demoEnhanced);
      setIsEnhancing(false);
    }, 2500);
  };

  const handleReset = () => {
    setBrightness([100]);
    setContrast([100]);
    setSharpness([100]);
    setUpscale([2]);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gradient-ai">Image Enhancement</h1>
          </div>
          <p className="text-muted-foreground">Upscale and improve your images with AI</p>
          <Badge className="mt-2 bg-primary/10 text-primary">
            3/10 enhancements used today
          </Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Upload Panel */}
          <div className="space-y-6">
            <Card className="card-ai">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="w-5 h-5 mr-2 text-primary" />
                  Upload Image
                </CardTitle>
                <CardDescription>
                  Upload your image to get started
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {!uploadedImage ? (
                  <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-4">
                      Drag & drop your image here, or click to select
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <Button asChild variant="outline">
                      <label htmlFor="file-upload" className="cursor-pointer">
                        Choose Image
                      </label>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <img 
                      src={uploadedImage} 
                      alt="Original"
                      className="w-full rounded-lg"
                    />
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setUploadedImage(null);
                        setEnhancedImage(null);
                      }}
                      className="w-full"
                    >
                      Upload Different Image
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Controls */}
            {uploadedImage && (
              <Card className="card-ai">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Zap className="w-5 h-5 mr-2" />
                    Enhancement Controls
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div>
                    <Label>Upscale Factor: {upscale[0]}x</Label>
                    <Slider
                      value={upscale}
                      onValueChange={setUpscale}
                      min={1}
                      max={8}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>Brightness: {brightness[0]}%</Label>
                    <Slider
                      value={brightness}
                      onValueChange={setBrightness}
                      min={50}
                      max={150}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>Contrast: {contrast[0]}%</Label>
                    <Slider
                      value={contrast}
                      onValueChange={setContrast}
                      min={50}
                      max={150}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>Sharpness: {sharpness[0]}%</Label>
                    <Slider
                      value={sharpness}
                      onValueChange={setSharpness}
                      min={50}
                      max={200}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleReset} variant="outline" size="sm">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                    <Button 
                      onClick={handleEnhance}
                      disabled={isEnhancing}
                      className="flex-1 btn-ai-primary"
                    >
                      {isEnhancing ? (
                        <>
                          <div className="animate-spin w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full" />
                          Enhancing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Enhance
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Before/After Comparison */}
          <div className="lg:col-span-2">
            <Card className="card-ai h-fit">
              <CardHeader>
                <CardTitle>Enhancement Preview</CardTitle>
                <CardDescription>
                  Compare your original and enhanced images
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {!uploadedImage && !isEnhancing && (
                  <div className="aspect-[16/10] bg-muted/30 rounded-lg border-2 border-dashed border-muted flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Upload an image to see the enhancement preview</p>
                    </div>
                  </div>
                )}

                {isEnhancing && (
                  <div className="aspect-[16/10] bg-muted/30 rounded-lg border-2 border-dashed border-primary/50 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                      <p className="text-primary font-medium">Enhancing your image...</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Applying {upscale[0]}x upscaling and adjustments
                      </p>
                    </div>
                  </div>
                )}

                {uploadedImage && !isEnhancing && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Original */}
                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-sm font-medium">Original</span>
                          <Badge variant="secondary">512x512</Badge>
                        </div>
                        <img 
                          src={uploadedImage} 
                          alt="Original"
                          className="w-full rounded-lg shadow-sm"
                        />
                      </div>

                      {/* Enhanced */}
                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-sm font-medium">Enhanced</span>
                          {enhancedImage && (
                            <Badge className="bg-primary/10 text-primary">
                              {512 * upscale[0]}x{512 * upscale[0]}
                            </Badge>
                          )}
                        </div>
                        {enhancedImage ? (
                          <div className="relative group">
                            <img 
                              src={enhancedImage} 
                              alt="Enhanced"
                              className="w-full rounded-lg shadow-sm"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                              <Button variant="secondary">
                                <Download className="w-4 h-4 mr-2" />
                                Download HD
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="aspect-square bg-muted/50 rounded-lg flex items-center justify-center border-2 border-dashed border-muted">
                            <span className="text-muted-foreground text-sm">Enhanced version will appear here</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {enhancedImage && (
                      <div className="flex gap-4 justify-center">
                        <Button className="btn-ai-primary">
                          <Download className="w-4 h-4 mr-2" />
                          Download Enhanced ({512 * upscale[0]}x{512 * upscale[0]})
                        </Button>
                        <Button variant="outline">
                          <Sparkles className="w-4 h-4 mr-2" />
                          Enhance Again
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enhance;