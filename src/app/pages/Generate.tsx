import { useState, useRef, useEffect } from 'react';
import { Upload, Wand2, Download, Eye, Maximize2, Video } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

const fetchVideoAsBlob = async (url: string): Promise<string> => {
  try {
    const res = await fetch(url, {
      headers: { 'ngrok-skip-browser-warning': 'true' }
    });
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  } catch {
    return url;
  }
};

const saveToGallery = (name: string, videoUrl: string) => {
  const gallery = JSON.parse(localStorage.getItem('gallery') || '[]');
  gallery.push({
    id: Date.now(),
    name: name || '3D 모델',
    date: new Date().toISOString().split('T')[0],
    thumbnailUrl: null,
    resolution: '1024',
    videoUrl: videoUrl,
  });
  localStorage.setItem('gallery', JSON.stringify(gallery));
};

export default function Generate() {
  const { t } = useLanguage();
  const [productName, setProductName] = useState('');
  const [isGenerating, setIsGenerating] = useState<boolean>(() => localStorage.getItem('isGenerating') === 'true');
  const [progress, setProgress] = useState(0);
  const [progressMsg, setProgressMsg] = useState('');
  const [jobId, setJobId] = useState<string>(() => localStorage.getItem('currentJobId') || '');
  const [hasGenerated, setHasGenerated] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [resultVideoUrl, setResultVideoUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const pollRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const savedJobId = localStorage.getItem('currentJobId');
    const savedGenerating = localStorage.getItem('isGenerating') === 'true';
    
    if (savedJobId && savedGenerating) {
      pollRef.current = setInterval(async () => {
        const statusRes = await fetch(`${API_BASE}/status/${savedJobId}`, {
          headers: { 'ngrok-skip-browser-warning': 'true' }
        });
        const { progress: p, message, done, error } = await statusRes.json();
        setProgress(p);
        setProgressMsg(message || '');
        if (error || done) {
          clearInterval(pollRef.current!);
          setIsGenerating(false);
          localStorage.removeItem('currentJobId');
          localStorage.removeItem('isGenerating');
          if (done) {
            setHasGenerated(true);
            setProgress(100);
            const apiUrl = `${API_BASE}/result/${savedJobId}`;
            const blobUrl = await fetchVideoAsBlob(apiUrl);
            setResultVideoUrl(blobUrl);
            const name = localStorage.getItem('currentProductName') || '3D 모델';
            saveToGallery(name, apiUrl);
            localStorage.removeItem('currentProductName');
          }
        }
      }, 3000);
    }

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
      setHasGenerated(false);
      setResultVideoUrl(null);
      setErrorMsg(null);
    }
  };

  const handleGenerate = async () => {
    if (!videoFile) {
      setErrorMsg('동영상을 먼저 업로드하세요.');
      return;
    }
    setIsGenerating(true);
    setProgress(0);
    setProgressMsg('업로드 중...');
    setHasGenerated(false);
    setErrorMsg(null);

    try {
      const formData = new FormData();
      formData.append('video', videoFile);
      const uploadRes = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        headers: { 'ngrok-skip-browser-warning': 'true' },
        body: formData,
      });
      if (!uploadRes.ok) throw new Error('업로드 실패');
      const { job_id } = await uploadRes.json();
      localStorage.setItem('currentJobId', job_id);
      localStorage.setItem('isGenerating', 'true');
      localStorage.setItem('currentProductName', productName);

      pollRef.current = setInterval(async () => {
        const statusRes = await fetch(`${API_BASE}/status/${job_id}`, {
          headers: { 'ngrok-skip-browser-warning': 'true' }
        });
        const { progress: p, message, done, error } = await statusRes.json();
        setProgress(p);
        setProgressMsg(message || '');
        if (error) {
          clearInterval(pollRef.current!);
          setIsGenerating(false);
          setErrorMsg(error);
          localStorage.removeItem('currentJobId');
          localStorage.removeItem('isGenerating');
          localStorage.removeItem('currentProductName');
        } else if (done) {
          clearInterval(pollRef.current!);
          setIsGenerating(false);
          setHasGenerated(true);
          setProgress(100);
          const apiUrl = `${API_BASE}/result/${job_id}`;
          const blobUrl = await fetchVideoAsBlob(apiUrl);
          setResultVideoUrl(blobUrl);
          saveToGallery(productName, apiUrl);
          localStorage.removeItem('currentJobId');
          localStorage.removeItem('isGenerating');
          localStorage.removeItem('currentProductName');
        }
      }, 3000);
    } catch (e) {
      setIsGenerating(false);
      setErrorMsg('서버 연결에 실패했습니다.');
    }
  };

  return (
    <div className="size-full relative overflow-hidden bg-background">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(91, 91, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(91, 91, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }}></div>
      </div>

      <div className="relative h-full grid grid-cols-1 md:grid-cols-[420px_1fr] gap-6 p-6">

        {/* LEFT PANEL */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-card rounded-2xl border border-border p-6 flex flex-col gap-6 overflow-y-auto"
        >
          <div>
            <h2 className="mb-1 tracking-tight text-foreground">{t('generate.title')}</h2>
            <p className="text-sm text-muted-foreground">{t('generate.subtitle')}</p>
          </div>

          <div className="space-y-3">
            <label className="block text-sm text-foreground">상품 촬영 동영상</label>
            <div className="relative">
              <input type="file" id="video-upload" className="hidden" accept="video/*,.mp4" onChange={handleVideoUpload} />
              <label
                htmlFor="video-upload"
                className={`flex flex-col items-center justify-center gap-4 h-64 border-2 border-dashed rounded-xl cursor-pointer transition-all group ${
                  videoFile ? 'border-[#5b5bff] bg-[#5b5bff]/5' : 'border-[#5b5bff]/30 hover:border-[#5b5bff]/70 bg-gradient-to-br from-[#5b5bff]/5 to-[#6366f1]/5'
                }`}
              >
                {videoPreview ? (
                  <div className="relative w-full h-full rounded-xl overflow-hidden">
                    <video src={videoPreview} className="w-full h-full object-contain" muted />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <p className="text-sm text-white">클릭하여 변경</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-20 h-20 rounded-full bg-[#5b5bff]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Video className="w-10 h-10 text-primary" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm mb-1 group-hover:text-primary transition-colors text-foreground">클릭하여 동영상 업로드</p>
                      <p className="text-xs text-muted-foreground">MP4, MOV (최대 500MB)</p>
                    </div>
                  </>
                )}
              </label>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm text-foreground">상품 이름</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="상품 이름을 입력해주세요"
              className="w-full bg-input-background border border-border text-foreground rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5b5bff]/50 transition-all placeholder:text-muted-foreground"
            />
          </div>

          {errorMsg && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3">{errorMsg}</p>
          )}

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !videoFile}
            className="mt-auto w-full py-5 bg-gradient-to-r from-[#5b5bff] to-[#6366f1] text-white rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
            style={{ fontWeight: 600 }}
          >
            <Wand2 className="w-6 h-6" />
            <span>{isGenerating ? t('generate.generating') : t('generate.generate')}</span>
          </button>
        </motion.div>

        {/* RIGHT PANEL */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-card rounded-2xl border border-border p-6 flex flex-col gap-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="mb-1 tracking-tight text-foreground">{t('generate.preview')}</h2>
              <p className="text-sm text-muted-foreground">{t('generate.viewport')}</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 rounded-lg bg-input-background border border-border hover:border-[#5b5bff]/50 transition-all">
                <Eye className="w-4 h-4 text-muted-foreground" />
              </button>
              <button className="p-2 rounded-lg bg-input-background border border-border hover:border-[#5b5bff]/50 transition-all">
                <Maximize2 className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>

          <div className="flex-1 relative rounded-xl overflow-hidden bg-gradient-to-br from-input-background to-card border border-border">
            <div className="absolute inset-0 flex items-center justify-center">
              {!isGenerating && !hasGenerated && (
                <div className="text-center space-y-4 z-10">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#5b5bff]/20 to-[#6366f1]/20 flex items-center justify-center border border-[#5b5bff]/30">
                    <Wand2 className="w-10 h-10 text-primary" />
                  </div>
                  <p className="text-muted-foreground">동영상을 업로드하고 생성 버튼을 클릭하세요</p>
                </div>
              )}

              {isGenerating && (
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center space-y-6 z-10">
                  <div className="w-32 h-32 mx-auto relative">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#5b5bff] border-r-[#5b5bff]" />
                    <motion.div animate={{ rotate: -360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} className="absolute inset-2 rounded-full border-4 border-transparent border-b-[#6366f1] border-l-[#6366f1]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Wand2 className="w-10 h-10 text-primary" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-primary">{progressMsg || t('generate.generating')}</p>
                    <p className="text-sm text-muted-foreground">{progress}%</p>
                  </div>
                </motion.div>
              )}

              {hasGenerated && resultVideoUrl && (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full h-full">
                  <video src={resultVideoUrl} autoPlay loop controls className="w-full h-full object-contain" />
                </motion.div>
              )}
            </div>
          </div>

          {(isGenerating || hasGenerated) && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t('generate.progress')}</span>
                <span className="text-primary">{progress}%</span>
              </div>
              <div className="h-2 bg-input-background rounded-full overflow-hidden border border-border">
                <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} className="h-full bg-gradient-to-r from-[#5b5bff] to-[#6366f1] rounded-full" />
              </div>
            </div>
          )}

          {hasGenerated && resultVideoUrl && (
            <div className="space-y-3">
              <label className="block text-sm text-foreground">결과 다운로드</label>
              <a href={resultVideoUrl} download="3d_render.mp4" className="flex items-center justify-center gap-2 w-full py-3 bg-[#5b5bff] text-white rounded-xl hover:opacity-90 transition-all" style={{ fontWeight: 600 }}>
                <Download className="w-5 h-5" />
                {'렌더링 영상 다운로드'}
              </a>
            </div>
          )}
        </motion.div>
      </div>

      <style>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </div>
  );
}