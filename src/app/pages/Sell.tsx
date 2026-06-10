import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Loader2, Box, ChevronDown, X, Upload } from 'lucide-react';
import Alert from '../components/Alert';

function ModelThumb({ url, videoUrl, name }: { url: string | null; videoUrl?: string | null; name: string }) {
  if (url) return <img src={url} alt={name} className="w-full h-full object-cover" />;
  if (videoUrl) return <video src={videoUrl} className="w-full h-full object-cover" muted playsInline />;
  return (
    <div className="w-full h-full flex items-center justify-center bg-input-background">
      <Box className="w-6 h-6 text-border" />
    </div>
  );
}

export default function Sell() {
  const navigate = useNavigate();
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [selectedModel, setSelectedModel] = useState<any>(null);
  const [showModelPicker, setShowModelPicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ message: '', type: 'info' as 'success' | 'error' | 'info' });
  const [galleryModels, setGalleryModels] = useState<any[]>([]);
  const [localPreview, setLocalPreview] = useState<string | null>(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('gallery') || '[]');
    setGalleryModels(saved);
  }, []);

  const handleLocalUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (file.type.startsWith('video/')) {
        const video = document.createElement('video');
        video.src = url;
        video.addEventListener('loadeddata', () => {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          canvas.getContext('2d')?.drawImage(video, 0, 0);
          const thumbnailUrl = canvas.toDataURL('image/jpeg');
          setLocalPreview(thumbnailUrl);
          setSelectedModel({
            id: Date.now(),
            name: file.name,
            date: new Date().toISOString().split('T')[0],
            thumbnailUrl: thumbnailUrl,
            videoUrl: url,
            resolution: '1024',
          });
        });
        video.load();
      } else {
        setLocalPreview(url);
        setSelectedModel({
          id: Date.now(),
          name: file.name,
          date: new Date().toISOString().split('T')[0],
          thumbnailUrl: url,
          videoUrl: null,
          resolution: '1024',
        });
      }
    }
  };

  const handleSubmit = async () => {
    if (!productName || !price || !selectedModel) {
      setAlertConfig({ message: '상품명, 가격, 3D 모델을 모두 입력해주세요.', type: 'error' });
      setShowAlert(true);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const existingProducts = JSON.parse(localStorage.getItem('products') || '[]');
      const newProduct = {
        id: Date.now(),
        name: productName,
        category: category,
        price: parseInt(price),
        description: description,
        thumbnailUrl: selectedModel?.thumbnailUrl || null,
        videoUrl: selectedModel?.videoUrl || null,
        date: new Date().toISOString().split('T')[0],
        location: '광주광역시',
      };
      existingProducts.push(newProduct);
      localStorage.setItem('products', JSON.stringify(existingProducts));

      setIsSubmitting(false);
      setAlertConfig({ message: '상품이 성공적으로 등록되었습니다!', type: 'success' });
      setShowAlert(true);
      setTimeout(() => navigate('/'), 1500);
    }, 2000);
  };

  return (
    <div className="w-full min-h-full bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-3xl mb-8 text-foreground" style={{ fontWeight: 700 }}>
          상품 등록하기
        </h1>

        <div className="space-y-6">
          <div>
            <label className="block text-sm mb-2 text-foreground" style={{ fontWeight: 600 }}>상품명</label>
            <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="상품명을 입력해주세요" className="w-full px-4 py-3 bg-input-background border border-border text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b5bff] focus:border-transparent placeholder:text-muted-foreground" />
          </div>

          <div>
            <label className="block text-sm mb-2 text-foreground" style={{ fontWeight: 600 }}>카테고리</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-3 bg-input-background border border-border text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b5bff] focus:border-transparent">
              <option value="">선택</option>
              <option value="전자기기">전자기기</option>
              <option value="음향기기">음향기기</option>
              <option value="게임/타이틀">게임/타이틀</option>
              <option value="가전제품">가전제품</option>
              <option value="패션">패션</option>
              <option value="기타">기타</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-2 text-foreground" style={{ fontWeight: 600 }}>가격 (원)</label>
            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="가격을 입력해주세요" className="w-full px-4 py-3 bg-input-background border border-border text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b5bff] focus:border-transparent placeholder:text-muted-foreground" />
          </div>

          <div>
            <label className="block text-sm mb-2 text-foreground" style={{ fontWeight: 600 }}>설명</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="게시글 내용을 작성해주세요" rows={4} className="w-full px-4 py-3 bg-input-background border border-border text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b5bff] focus:border-transparent resize-none placeholder:text-muted-foreground" />
          </div>

          <div>
            <label className="block text-sm mb-2 text-foreground" style={{ fontWeight: 600 }}>3D 모델 / 상품 이미지</label>

            <button
              type="button"
              onClick={() => setShowModelPicker(true)}
              className={`w-full border-2 rounded-xl p-4 text-left transition-all flex items-center gap-4 mb-3 ${
                selectedModel ? 'border-[#5b5bff] bg-[#5b5bff]/5' : 'border-dashed border-border bg-card hover:border-[#5b5bff]/50'
              }`}
            >
              {selectedModel ? (
                <>
                  <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 border border-border">
                    <ModelThumb url={selectedModel.thumbnailUrl} videoUrl={selectedModel.videoUrl} name={selectedModel.name} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#5b5bff] truncate" style={{ fontWeight: 600 }}>{selectedModel.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{selectedModel.date}</p>
                  </div>
                  <button type="button" onClick={(e) => { e.stopPropagation(); setSelectedModel(null); setLocalPreview(null); }} className="p-1 hover:bg-secondary rounded-lg transition-all flex-shrink-0">
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </>
              ) : (
                <>
                  <div className="w-14 h-14 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Box className="w-7 h-7 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground" style={{ fontWeight: 600 }}>갤러리에서 3D 모델 선택</p>
                    <p className="text-xs text-muted-foreground mt-0.5">생성된 3D 모델을 선택하세요</p>
                  </div>
                  <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                </>
              )}
            </button>

            <div className="relative">
              <input type="file" id="local-upload" className="hidden" accept="image/*,video/*" onChange={handleLocalUpload} />
              <label htmlFor="local-upload" className="flex items-center justify-center gap-2 w-full py-3 border border-dashed border-border rounded-xl cursor-pointer hover:border-[#5b5bff]/50 transition-all text-sm text-muted-foreground hover:text-foreground">
                <Upload className="w-4 h-4" />
                로컬 파일에서 이미지/영상 업로드
              </label>
            </div>
          </div>

          <button onClick={handleSubmit} disabled={isSubmitting} className="w-full py-4 text-white rounded-xl transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2" style={{ backgroundColor: '#5b5bff', fontWeight: 600 }}>
            {isSubmitting ? (
              <><Loader2 className="w-5 h-5 animate-spin" /><span>등록 중...</span></>
            ) : (
              <span>등록하기</span>
            )}
          </button>
        </div>
      </div>

      {showModelPicker && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 sm:p-6">
          <div className="bg-card rounded-2xl border border-border w-full max-w-lg max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-border flex-shrink-0">
              <h3 className="text-lg text-foreground" style={{ fontWeight: 700 }}>3D 모델 선택</h3>
              <button onClick={() => setShowModelPicker(false)} className="p-2 hover:bg-secondary rounded-lg transition-all">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <div className="overflow-y-auto p-4">
              {galleryModels.length === 0 ? (
                <div className="text-center py-10">
                  <Box className="w-12 h-12 text-border mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">생성된 3D 모델이 없습니다.</p>
                  <p className="text-xs text-muted-foreground mt-1">생성 페이지에서 먼저 3D 모델을 만들어주세요.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {galleryModels.map((model) => (
                    <button key={model.id} onClick={() => { setSelectedModel(model); setShowModelPicker(false); }} className={`rounded-xl overflow-hidden border transition-all text-left hover:border-[#5b5bff]/60 ${selectedModel?.id === model.id ? 'border-[#5b5bff]' : 'border-border'}`}>
                      <div className="aspect-square overflow-hidden">
                        <ModelThumb url={model.thumbnailUrl} videoUrl={model.videoUrl} name={model.name} />
                      </div>
                      <div className="p-3">
                        <p className="text-sm text-foreground truncate" style={{ fontWeight: 600 }}>{model.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{model.date}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Alert show={showAlert} message={alertConfig.message} type={alertConfig.type} onClose={() => setShowAlert(false)} />
    </div>
  );
}