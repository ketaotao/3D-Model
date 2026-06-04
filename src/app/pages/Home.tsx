import { Link } from 'react-router';
import { useLanguage } from '../contexts/LanguageContext';

export default function Home() {
  const { t } = useLanguage();
  const products = [
    {
      id: 1,
      name: '야구 티켓',
      location: '방글 동복면',
      category: '게임/타이틀',
      price: 21000,
      image: '📦'
    },
    {
      id: 2,
      name: '15인치 고성능 노트북',
      location: '서울 강남구',
      category: '전자기기',
      price: 850000,
      image: '💻'
    },
    {
      id: 3,
      name: '최신 스마트폰 (블랙)',
      location: '경기도 판교',
      category: '전자기기',
      price: 620000,
      image: '📱'
    },
    {
      id: 4,
      name: '노이즈캔슬링 무선 헤드폰',
      location: '부산 해운대구',
      category: '음향기기',
      price: 280000,
      image: '🎧'
    },
    {
      id: 5,
      name: '콘솔 게임패드 한정판',
      location: '광주광역시',
      category: '게임/타이틀',
      price: 55000,
      image: '🎮'
    },
    {
      id: 6,
      name: '블루투스 키보드',
      location: '대전 유성구',
      category: '전자기기',
      price: 89000,
      image: '⌨️'
    },
    {
      id: 7,
      name: '4K 웹캠',
      location: '인천 남동구',
      category: '전자기기',
      price: 125000,
      image: '📷'
    },
    {
      id: 8,
      name: '무선 마우스',
      location: '울산 중구',
      category: '전자기기',
      price: 42000,
      image: '🖱️'
    },
  ];

  return (
    <div className="w-full bg-background min-h-full">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl mb-2 text-foreground" style={{ fontWeight: 700 }}>
          {t('home.title')}
        </h1>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="bg-card rounded-2xl overflow-hidden hover:shadow-[0_0_20px_rgba(91,91,255,0.3)] transition-all cursor-pointer border border-border"
            >
              {/* Product Image */}
              <div className="relative aspect-square bg-input-background flex items-center justify-center">
                <span className="text-6xl">{product.image}</span>
                <div className="absolute top-3 left-3">
                  <span
                    className="px-3 py-1 rounded-full text-xs text-white"
                    style={{ backgroundColor: '#5b5bff', fontWeight: 600 }}
                  >
                    {t('home.badge')}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="text-base mb-2 text-foreground" style={{ fontWeight: 600 }}>
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {product.location} • {product.category}
                </p>
                <p className="text-lg" style={{ color: '#5b5bff', fontWeight: 700 }}>
                  {product.price.toLocaleString()}원
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
