import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Upload, CheckCircle, Loader2 } from 'lucide-react';
import Alert from '../components/Alert';

export default function Sell() {
  const navigate = useNavigate();
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ message: '', type: 'info' as 'success' | 'error' | 'info' });

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!productName || !price || !videoFile) {
      setAlertConfig({ message: '상품명, 가격, 영상을 모두 입력해주세요.', type: 'error' });
      setShowAlert(true);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setAlertConfig({ message: '상품이 성공적으로 등록되었습니다! 3D 모델이 생성 중입니다.', type: 'success' });
      setShowAlert(true);
      setTimeout(() => navigate('/'), 1500);
    }, 2000);
  };

  return (
    <div className="w-full min-h-full bg-background">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl mb-8 text-foreground" style={{ fontWeight: 700 }}>
          상품 등록하기 (3D 생성)
        </h1>

        <div className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm mb-2 text-foreground" style={{ fontWeight: 600 }}>
              상품명
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="예어팟"
              className="w-full px-4 py-3 bg-input-background border border-border text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b5bff] focus:border-transparent placeholder:text-muted-foreground"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm mb-2 text-foreground" style={{ fontWeight: 600 }}>
              카테고리
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-input-background border border-border text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b5bff] focus:border-transparent"
            >
              <option value="">음향기기</option>
              <option value="전자기기">전자기기</option>
              <option value="게임/타이틀">게임/타이틀</option>
              <option value="가전제품">가전제품</option>
              <option value="패션">패션</option>
              <option value="기타">기타</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm mb-2 text-foreground" style={{ fontWeight: 600 }}>
              가격 (원)
            </label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="77777"
              className="w-full px-4 py-3 bg-input-background border border-border text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b5bff] focus:border-transparent placeholder:text-muted-foreground"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm mb-2 text-foreground" style={{ fontWeight: 600 }}>
              설명
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="맛깨봇 세 상품"
              rows={4}
              className="w-full px-4 py-3 bg-input-background border border-border text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b5bff] focus:border-transparent resize-none placeholder:text-muted-foreground"
            />
          </div>

          {/* Video Upload */}
          <div>
            <label className="block text-sm mb-2 text-foreground" style={{ fontWeight: 600 }}>
              상품 촬영 영상
            </label>
            <input
              type="file"
              id="video-upload"
              accept="video/*"
              onChange={handleVideoUpload}
              className="hidden"
            />
            <label
              htmlFor="video-upload"
              className={`block border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
                videoFile
                  ? 'border-[#5b5bff] bg-[#5b5bff]/5'
                  : 'border-border bg-card hover:border-[#5b5bff]/50'
              }`}
            >
              <div className="flex flex-col items-center gap-4">
                {videoFile ? (
                  <>
                    <div className="w-16 h-16 bg-[#5b5bff]/20 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-[#5b5bff]" />
                    </div>
                    <div>
                      <p className="text-sm mb-1 text-[#5b5bff]" style={{ fontWeight: 600 }}>
                        {videoFile.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
                      <Upload className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm mb-1 text-foreground" style={{ fontWeight: 600 }}>
                        클릭하여 영상 업로드 및 3D 생성
                      </p>
                      <p className="text-xs text-muted-foreground">
                        물건을 중심으로 한 바퀴 빌 듯이 영상을 촬영합니다.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </label>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full py-4 text-white rounded-xl transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            style={{ backgroundColor: '#5b5bff', fontWeight: 600 }}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>3D 생성 중...</span>
              </>
            ) : (
              <span>등록하기</span>
            )}
          </button>
        </div>
      </div>

      <Alert
        show={showAlert}
        message={alertConfig.message}
        type={alertConfig.type}
        onClose={() => setShowAlert(false)}
      />
    </div>
  );
}
