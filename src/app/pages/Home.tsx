import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { useLanguage } from '../contexts/LanguageContext';
import { Box } from 'lucide-react';

function ProductThumbnail({ url, videoUrl, name }: { url: string | null; videoUrl?: string | null; name: string }) {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    if (videoUrl && !url) {
      fetch(videoUrl, { headers: { 'ngrok-skip-browser-warning': 'true' } })
        .then(r => r.blob())
        .then(blob => setBlobUrl(URL.createObjectURL(blob)))
        .catch(() => setBlobUrl(null));
    }
  }, [videoUrl, url]);

  if (url) return <img src={url} alt={name} className="w-full h-full object-cover" />;
  if (blobUrl) return <video src={blobUrl} className="w-full h-full object-cover" muted playsInline autoPlay loop />;
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-input-background">
      <Box className="w-10 h-10 text-border" />
      <span className="text-xs text-muted-foreground">3D 이미지</span>
    </div>
  );
}

export default function Home() {
  const { t } = useLanguage();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('products') || '[]');
    setProducts(saved);
  }, []);

  return (
    <div className="w-full bg-background min-h-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl mb-2 text-foreground" style={{ fontWeight: 700 }}>
          {t('home.title')}
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <Box className="w-16 h-16 text-border mx-auto mb-4" />
            <p className="text-muted-foreground">등록된 상품이 없습니다. 판매하기에서 상품을 등록해주세요.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="bg-card rounded-2xl overflow-hidden hover:shadow-[0_0_20px_rgba(91,91,255,0.3)] transition-all cursor-pointer border border-border"
              >
                <div className="relative aspect-square overflow-hidden">
                  <ProductThumbnail url={product.thumbnailUrl} videoUrl={product.videoUrl} name={product.name} />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-xs text-white" style={{ backgroundColor: '#5b5bff', fontWeight: 600 }}>
                      {t('home.badge')}
                    </span>
                  </div>
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="text-sm sm:text-base mb-1 sm:mb-2 text-foreground truncate" style={{ fontWeight: 600 }}>
                    {product.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 truncate">
                    {product.location} • {product.category}
                  </p>
                  <p className="text-base sm:text-lg" style={{ color: '#5b5bff', fontWeight: 700 }}>
                    {product.price?.toLocaleString()}원
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}