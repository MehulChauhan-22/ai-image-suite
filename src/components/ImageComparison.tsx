import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageComparisonProps {
  beforeImage?: string | File | null;
  afterImage?: string | File | null;
  isProcessing?: boolean;
  onDownload?: () => void;
  onReset?: () => void;
  className?: string;
}

const ImageComparison = ({
  beforeImage,
  afterImage,
  isProcessing = false,
  onDownload,
  onReset,
  className
}: ImageComparisonProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const getImageUrl = (image: string | File | null) => {
    if (!image) return null;
    if (typeof image === 'string') return image;
    return URL.createObjectURL(image);
  };

  const beforeUrl = getImageUrl(beforeImage);
  const afterUrl = getImageUrl(afterImage);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    };

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.5));

  if (!beforeUrl && !afterUrl) {
    return (
      <Card className={cn("aspect-video flex items-center justify-center", className)}>
        <CardContent className="text-center space-y-2">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <ZoomIn className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">Upload an image to see the comparison</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Badge variant="outline">Before</Badge>
          <div className="h-4 w-px bg-border" />
          <Badge variant="outline">After</Badge>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleZoomOut}>
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-sm text-muted-foreground min-w-12 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <Button variant="outline" size="sm" onClick={handleZoomIn}>
            <ZoomIn className="w-4 h-4" />
          </Button>
          
          {onReset && (
            <Button variant="outline" size="sm" onClick={onReset}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          )}
          
          {afterUrl && onDownload && (
            <Button size="sm" onClick={onDownload} className="btn-ai-primary">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          )}
        </div>
      </div>

      {/* Comparison Container */}
      <Card className="relative overflow-hidden cursor-crosshair">
        <div
          ref={containerRef}
          className="relative aspect-video bg-muted"
          style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}
        >
          {/* Before Image */}
          {beforeUrl && (
            <img
              src={beforeUrl}
              alt="Before"
              className="absolute inset-0 w-full h-full object-contain"
              draggable={false}
            />
          )}
          
          {/* After Image */}
          {afterUrl && (
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `polygon(${sliderPosition}% 0%, 100% 0%, 100% 100%, ${sliderPosition}% 100%)` }}
            >
              <img
                src={afterUrl}
                alt="After"
                className="w-full h-full object-contain"
                draggable={false}
              />
            </div>
          )}
          
          {/* Slider */}
          {beforeUrl && afterUrl && (
            <>
              {/* Slider Line */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10 cursor-ew-resize"
                style={{ left: `${sliderPosition}%` }}
                onMouseDown={() => setIsDragging(true)}
              />
              
              {/* Slider Handle */}
              <div
                ref={sliderRef}
                className="absolute w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center cursor-ew-resize z-20 transform -translate-x-1/2 -translate-y-1/2"
                style={{ 
                  left: `${sliderPosition}%`, 
                  top: '50%'
                }}
                onMouseDown={() => setIsDragging(true)}
              >
                <div className="w-1 h-4 bg-gray-400 rounded-full" />
              </div>
            </>
          )}
          
          {/* Processing Overlay */}
          {isProcessing && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center backdrop-blur-sm z-30">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Processing your image</p>
                  <p className="text-xs text-muted-foreground">This may take a few seconds...</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
      
      {/* Info */}
      <div className="flex items-center justify-center text-xs text-muted-foreground">
        <p>Drag the slider to compare • Scroll to zoom</p>
      </div>
    </div>
  );
};

export default ImageComparison;