import { useState } from 'react';
import { useParams } from 'react-router';
import { MessageCircle, X, Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Product() {
  const { id } = useParams();
  const { t } = useLanguage();
  const [showChatModal, setShowChatModal] = useState(false);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; text: string }>>([]);

  const productData: any = {
    '1': { name: '야구 티켓', category: '게임/타이틀', price: 21000, condition: 'S급 (새제품급)', restoration: '3D Gaussian Splatting', description: '선물 받고 실사용 3회 미만입니다. 쿠션 마모 전혀 없고 깨끗합니다. 3D로 위아래 다 올려보실 수 있습니다.', image: '📦' },
    '2': { name: '15인치 고성능 노트북', category: '전자기기', price: 850000, condition: 'A급 (사용감 적음)', restoration: '3D Gaussian Splatting', description: '업무용으로 1년 사용했습니다. 스크래치 거의 없고 깨끗한 상태입니다.', image: '💻' },
    '3': { name: '최신 스마트폰 (블랙)', category: '전자기기', price: 620000, condition: 'S급 (새제품급)', restoration: '3D Gaussian Splatting', description: '박스 미개봉 새제품입니다.', image: '📱' },
    '4': { name: '노이즈캔슬링 무선 헤드폰', category: '음향기기', price: 280000, condition: 'A급 (사용감 적음)', restoration: '3D Gaussian Splatting', description: '선물 받고 실사용 3회 미만입니다. 쿠션 마모 전혀 없고 깨끗합니다. 3D로 위아래 다 올려보실 수 있습니다.', image: '🎧' },
  };

  const product = productData[id || '1'] || productData['1'];

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatMessages([...chatMessages, { sender: 'buyer', text: message }]);
      setMessage('');

      setTimeout(() => {
        setChatMessages(prev => [...prev, { sender: 'seller', text: t('product.replyMessage') }]);
      }, 1000);
    }
  };

  return (
    <div className="w-full min-h-full bg-background">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 gap-12">
          {/* Left - 3D Viewer */}
          <div>
            <div className="relative aspect-square bg-input-background rounded-3xl flex items-center justify-center overflow-hidden border border-border">
              <div className="text-9xl">{product.image}</div>
              <div className="absolute bottom-8 left-8 text-foreground text-sm">
                <p className="mb-1">{t('product.viewerHint')}</p>
                <p className="text-xs text-muted-foreground">({t('product.rendering')})</p>
              </div>
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="flex flex-col">
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
              <h1 className="text-3xl mb-4 text-foreground" style={{ fontWeight: 700 }}>
                {product.name}
              </h1>
              <p className="text-3xl" style={{ color: '#5b5bff', fontWeight: 700 }}>
                {product.price.toLocaleString()}원
              </p>
            </div>

            <div className="border-t border-b border-border py-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">{t('product.condition')}</span>
                <span className="text-sm text-foreground" style={{ fontWeight: 600 }}>
                  {product.condition}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">{t('product.restoration')}</span>
                <span className="text-sm" style={{ color: '#5b5bff', fontWeight: 600 }}>
                  {product.restoration}
                </span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-card rounded-xl border border-border">
              <p className="text-sm text-foreground">
                {product.description}
              </p>
            </div>

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

      {/* Chat Modal */}
      {showChatModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-6">
          <div className="bg-card rounded-2xl border border-border w-full max-w-2xl h-[600px] flex flex-col">
            {/* Header */}
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
              <button
                onClick={() => setShowChatModal(false)}
                className="p-2 hover:bg-secondary rounded-lg transition-all"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="flex justify-start">
                <div className="max-w-[70%] px-4 py-3 rounded-2xl bg-secondary text-foreground">
                  <p className="text-sm">{t('product.welcomeMessage')}</p>
                </div>
              </div>
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'buyer' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                      msg.sender === 'buyer'
                        ? 'bg-[#5b5bff] text-white'
                        : 'bg-secondary text-foreground'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
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
                <button
                  onClick={handleSendMessage}
                  className="px-6 py-3 bg-[#5b5bff] text-white rounded-xl hover:opacity-90 transition-all flex items-center gap-2"
                  style={{ fontWeight: 600 }}
                >
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
