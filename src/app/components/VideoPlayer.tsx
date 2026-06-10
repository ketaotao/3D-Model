import { useState, useEffect } from 'react';
import { Box } from 'lucide-react';

export function VideoPlayer({ url, thumbnailUrl, name, className }: { 
  url?: string | null; 
  thumbnailUrl?: string | null;
  name: string;
  className?: string;
}) {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    if (url && !thumbnailUrl) {
      fetch(url, { headers: { 'ngrok-skip-browser-warning': 'true' } })
        .then(r => r.blob())
        .then(blob => setBlobUrl(URL.createObjectURL(blob)))
        .catch(() => setBlobUrl(null));
    }
  }, [url, thumbnailUrl]);

  if (thumbnailUrl) return <img src={thumbnailUrl} alt={name} className={className || 'w-full h-full object-cover'} />;
  if (blobUrl) return <video src={blobUrl} className={className || 'w-full h-full object-cover'} muted playsInline autoPlay loop />;
  if (url) return <video src={url} className={className || 'w-full h-full object-cover'} muted playsInline autoPlay loop controls />;
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-input-background">
      <Box className="w-10 h-10 text-border" />
      <span className="text-xs text-muted-foreground">3D 이미지</span>
    </div>
  );
}