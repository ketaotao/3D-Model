import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { MessageCircle, X, Send, Box } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

function VideoDisplay({ videoUrl, thumbnailUrl, name }: { videoUrl?: string | null; thumbnailUrl?: string | null; name: string }) {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    if (videoUrl && !thumbnailUrl) {
      fetch(videoUrl, { headers: { 'ngrok-skip-browser-warning': 'true' } })
        .then(r => r.blob())
        .then(blob => setBlobUrl(URL.createObjectURL(blob)))
        .catch(() => setBlobUrl(null));
    }
  }, [videoUrl, thumbnailUrl]);

  if (thumbnailUrl) return <img src={thumbnailUrl} alt={name} className="w-full h-full object-cover" />;
  if (blobUrl) return <video src={blobUrl} autoPlay loop controls className="w-full h-full object-cover" />;
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3">
      <Box className="w-16 h-16 text-border" />
      <p className="text-sm text-muted-foreground">3D 이미지</p>
    </div>
  );
}

export default function Product() {
  const { id } = useParams();
  const { t } = useLanguage();
  const [showChatModal, setShowChatModal] = useState(false);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; text: string }>>([]);

  const products = JSON.parse(localStorage.getItem('products') || '[]');
  const product = products.find((p: any) => p.id === Number(id)) || products[0];

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatMessages([...chatMessages, { sender: 'buyer', text: message }]);
      setMessage('');
      setTimeout(() => {
        setChatMessages(prev => [...prev, { sender: 'seller', text: t('product.replyMessage') }]);
      }, 1000);
    }
  };

  if (!product) {
    return (
      <div className="w-full min-h-full bg-background flex items-center justify-center">
        <div className="text-center">
          <Box className="w-16 h-16 text-border mx-auto mb-4" />
          <p className="text-muted-foreground">상품을 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-full bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div>
            <div className="relative aspect-square bg-input-background rounded-3xl overflow-hidden border border-border">
              <VideoDisplay videoUrl={product.videoUrl} thumbnailUrl={product.thumbnailUrl} name={product.name} />
              <div className="absolute bottom-8 left-8 text-foreground text-sm">
                <p className="mb-1">{t('product.viewerHint')}</p>
                <p className="text-xs text-muted-foreground">({t('product.rendering')})</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
              <h1 className="text-2xl sm:text-3xl mb-4 text-foreground" style={{ fontWeight: 700 }}>
                {product.name}
              </h1>
              <p className="text-2xl sm:text-3xl" style={{ color: '#5b5bff', fontWeight: 700 }}>
                {product.price?.toLocaleString()}원
              </p>
            </div>

            <div className="border-t border-b border-border py-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">{t('product.condition')}</span>
                <span className="text-sm text-foreground" style={{ fontWeight: 600 }}>S급 (새제품급)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">{t('product.restoration')}</span>
                <span className="text-sm" style={{ color: '#5b5bff', fontWeight: 600 }}>3D Gaussian Splatting</span>
              </div>
            </div>

            {product.description && (
              <div className="mt-6 p-4 bg-card rounded-xl border border-border">
                <p className="text-sm text-foreground">{product.description}</p>
              </div>
            )}

            <button
              onClick={() => setShowChatModal(true)}
              className="mt-8 w-full py-4 text-white rounded-xl flex items-center justify-center gap-2 transition-all hover:opacity-90"
              style={{ backgroundColor: '#5b5bff', fontWeight: 600 }}
            >
              <MessageCircle className="w-5 h-5" />
              <span>{t('product.chat')}</span>
            </button>
          </div>
        </div>
      </div>

      {showChatModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 sm:p-6">
          <div className="bg-card rounded-2xl border border-border w-full max-w-2xl h-[600px] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#5b5bff] to-[#6366f1] rounded-full flex items-center justify-center text-white" style={{ fontWeight: 700 }}>
                  {t('product.sellerInitial')}
                </div>
                <div>
                  <p className="text-sm text-foreground" style={{ fontWeight: 600 }}>{t('product.seller')}</p>
                  <p className="text-xs text-muted-foreground">{product.name}</p>
                </div>
              </div>
              <button onClick={() => setShowChatModal(false)} className="p-2 hover:bg-secondary rounded-lg transition-all">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="flex justify-start">
                <div className="max-w-[70%] px-4 py-3 rounded-2xl bg-secondary text-foreground">
                  <p className="text-sm">{t('product.welcomeMessage')}</p>
                </div>
              </div>
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'buyer' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] px-4 py-3 rounded-2xl ${msg.sender === 'buyer' ? 'bg-[#5b5bff] text-white' : 'bg-secondary text-foreground'}`}>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-border">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={t('product.inputPlaceholder')}
                  className="flex-1 px-4 py-3 bg-input-background border border-border text-foreground rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5b5bff]/50 placeholder:text-muted-foreground"
                />
                <button onClick={handleSendMessage} className="px-6 py-3 bg-[#5b5bff] text-white rounded-xl hover:opacity-90 transition-all flex items-center gap-2" style={{ fontWeight: 600 }}>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}