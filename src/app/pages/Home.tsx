import { useState } from 'react';
import { Upload, Wand2, Download, Play, Pause, Eye, Maximize2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState('realistic');
  const [selectedResolution, setSelectedResolution] = useState('1024');
  const [modelType, setModelType] = useState('standard');
  const [hasGenerated, setHasGenerated] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setProgress(0);
    setHasGenerated(false);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          setHasGenerated(true);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  return (
    <div className="size-full relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }}></div>
      </div>

      {/* Main grid layout */}
      <div className="relative h-full grid grid-cols-[420px_1fr] gap-6 p-6">

        {/* LEFT PANEL - Input */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-[var(--panel-bg)] rounded-2xl border border-[var(--panel-border)] p-6 flex flex-col gap-6 overflow-y-auto backdrop-blur-xl shadow-[0_0_40px_rgba(0,212,255,0.1)]"
          style={{
            boxShadow: '0 0 40px rgba(0, 212, 255, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
          }}
        >
          <div>
            <h2 className="mb-1 tracking-tight">이미지를 3D 모델로 변환</h2>
            <p className="text-sm text-muted-foreground">이미지를 업로드하고 AI가 3D 모델을 생성합니다</p>
          </div>

          {/* Image Upload - Primary */}
          <div className="space-y-3">
            <label className="block text-sm">이미지 업로드</label>
            <div className="relative">
              <input type="file" id="image-upload" className="hidden" accept="image/*" />
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center gap-4 h-64 border-2 border-dashed border-primary/30 rounded-xl cursor-pointer hover:border-primary/70 transition-all group bg-gradient-to-br from-primary/5 to-[#6366f1]/5"
              >
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Upload className="w-10 h-10 text-primary" />
                </div>
                <div className="text-center">
                  <p className="text-sm mb-1 group-hover:text-primary transition-colors">
                    클릭하거나 드래그하여 이미지 업로드
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG, WEBP (최대 10MB)
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Text Prompt - Secondary */}
          <div className="space-y-3">
            <label className="block text-sm">추가 설명 (선택사항)</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="추가 디테일을 설명하세요... (예: '더 날카로운 모서리', '부드러운 표면')"
              className="w-full h-24 bg-input-background border border-input rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/50"
            />
          </div>

          {/* Style Selection */}
          <div className="space-y-3">
            <label className="block text-sm">스타일</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'realistic', label: '사실적' },
                { id: 'stylized', label: '양식화' },
                { id: 'low-poly', label: '로우폴리' },
                { id: 'abstract', label: '추상적' }
              ].map(style => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`px-4 py-2.5 rounded-lg border transition-all ${
                    selectedStyle === style.id
                      ? 'bg-primary/10 border-primary text-primary shadow-[0_0_20px_rgba(0,212,255,0.3)]'
                      : 'bg-input-background border-border hover:border-primary/30'
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          {/* Resolution */}
          <div className="space-y-3">
            <label className="block text-sm">해상도</label>
            <select
              value={selectedResolution}
              onChange={(e) => setSelectedResolution(e.target.value)}
              className="w-full px-4 py-2.5 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            >
              <option value="512">512 × 512</option>
              <option value="1024">1024 × 1024</option>
              <option value="2048">2048 × 2048</option>
              <option value="4096">4096 × 4096</option>
            </select>
          </div>

          {/* Model Type */}
          <div className="space-y-3">
            <label className="block text-sm">모델 타입</label>
            <div className="grid grid-cols-1 gap-2">
              {[
                { id: 'standard', label: '표준', time: '~2-3분' },
                { id: 'detailed', label: '정밀', time: '~5-7분' },
                { id: 'fast', label: '빠름', time: '~30-60초' }
              ].map(type => (
                <button
                  key={type.id}
                  onClick={() => setModelType(type.id)}
                  className={`px-4 py-2.5 rounded-lg border transition-all text-left ${
                    modelType === type.id
                      ? 'bg-primary/10 border-primary text-primary'
                      : 'bg-input-background border-border hover:border-primary/30'
                  }`}
                >
                  <div>{type.label}</div>
                  <div className="text-xs opacity-60 mt-0.5">{type.time}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="mt-auto w-full py-5 bg-gradient-to-r from-primary to-[#6366f1] text-primary-foreground rounded-xl hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group relative overflow-hidden text-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            <Wand2 className="w-6 h-6" />
            <span>{isGenerating ? '3D 모델 생성 중...' : '3D 모델 생성'}</span>
          </button>
        </motion.div>

        {/* RIGHT PANEL - Processing & Preview */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-[var(--panel-bg)] rounded-2xl border border-[var(--panel-border)] p-6 flex flex-col gap-4 backdrop-blur-xl"
          style={{
            boxShadow: '0 0 60px rgba(0, 212, 255, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="mb-1 tracking-tight">3D 미리보기</h2>
              <p className="text-sm text-muted-foreground">인터랙티브 모델 뷰포트</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 rounded-lg bg-input-background border border-border hover:border-primary/50 transition-all">
                <Eye className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-lg bg-input-background border border-border hover:border-primary/50 transition-all">
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 3D Viewer Area */}
          <div className="flex-1 relative rounded-xl overflow-hidden bg-gradient-to-br from-[#0a0a0f] to-[#1a1a28] border border-border">
            {/* Grid overlay for 3D space */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(0, 212, 255, 0.03) 40px, rgba(0, 212, 255, 0.03) 41px),
                    repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0, 212, 255, 0.03) 40px, rgba(0, 212, 255, 0.03) 41px)
                  `,
                  perspective: '1000px',
                  transform: 'rotateX(60deg)'
                }}
              ></div>
            </div>

            {/* Center placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              {!isGenerating && !hasGenerated && (
                <div className="text-center space-y-4 z-10">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-[#6366f1]/20 flex items-center justify-center border border-primary/30">
                    <Wand2 className="w-10 h-10 text-primary" />
                  </div>
                  <p className="text-muted-foreground">프롬프트를 입력하고 생성 버튼을 클릭하세요</p>
                </div>
              )}

              {isGenerating && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center space-y-6 z-10"
                >
                  <div className="relative">
                    <div className="w-32 h-32 mx-auto">
                      {/* Animated rotating rings */}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-primary"
                      ></motion.div>
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-2 rounded-full border-4 border-transparent border-b-[#6366f1] border-l-[#6366f1]"
                      ></motion.div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Wand2 className="w-10 h-10 text-primary" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-primary">3D 모델 생성 중...</p>
                    <p className="text-sm text-muted-foreground">{progress}% 완료</p>
                  </div>
                </motion.div>
              )}

              {hasGenerated && (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  {/* Mock 3D Model Preview */}
                  <div className="relative">
                    <motion.div
                      animate={{
                        rotateY: 360,
                        rotateX: [0, 10, 0]
                      }}
                      transition={{
                        rotateY: { duration: 8, repeat: Infinity, ease: 'linear' },
                        rotateX: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
                      }}
                      className="w-64 h-64"
                      style={{
                        transformStyle: 'preserve-3d',
                        perspective: '1000px'
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-[#6366f1]/30 rounded-3xl border border-primary/50 shadow-[0_0_60px_rgba(0,212,255,0.4)]"
                        style={{
                          transform: 'translateZ(0px)',
                          backdropFilter: 'blur(20px)'
                        }}
                      ></div>
                      <div className="absolute inset-4 bg-gradient-to-br from-[#6366f1]/20 to-primary/20 rounded-2xl border border-[#6366f1]/30"
                        style={{
                          transform: 'translateZ(40px)'
                        }}
                      ></div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          {(isGenerating || hasGenerated) && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">진행률</span>
                <span className="text-primary">{progress}%</span>
              </div>
              <div className="h-2 bg-input-background rounded-full overflow-hidden border border-border">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-primary to-[#6366f1] rounded-full relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]"></div>
                </motion.div>
              </div>
            </div>
          )}

          {/* Generation Stats */}
          {isGenerating && (
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-input-background/50 rounded-lg p-3 border border-border">
                <div className="text-xs text-muted-foreground mb-1">버텍스</div>
                <div className="text-sm">{Math.floor(progress * 520).toLocaleString()}</div>
              </div>
              <div className="bg-input-background/50 rounded-lg p-3 border border-border">
                <div className="text-xs text-muted-foreground mb-1">면</div>
                <div className="text-sm">{Math.floor(progress * 1040).toLocaleString()}</div>
              </div>
              <div className="bg-input-background/50 rounded-lg p-3 border border-border">
                <div className="text-xs text-muted-foreground mb-1">남은 시간</div>
                <div className="text-sm">{Math.max(0, Math.floor((100 - progress) / 2))}초</div>
              </div>
            </div>
          )}

          {/* Export Options */}
          {hasGenerated && (
            <div className="space-y-3">
              <label className="block text-sm">내보내기 형식</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { format: 'OBJ', desc: '3D 오브젝트', icon: '🎨' },
                  { format: 'GLB', desc: 'glTF Binary', icon: '📦' },
                  { format: 'FBX', desc: 'Autodesk', icon: '🔧' },
                  { format: 'STL', desc: '3D 프린팅', icon: '🖨️' }
                ].map(({ format, desc, icon }) => (
                  <button
                    key={format}
                    className="flex flex-col items-center gap-2 p-4 bg-input-background border border-border rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all group"
                  >
                    <span className="text-3xl">{icon}</span>
                    <div className="text-center">
                      <div className="text-sm mb-0.5">{format}</div>
                      <div className="text-xs text-muted-foreground">{desc}</div>
                    </div>
                    <Download className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors mt-1" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Model Info */}
          {hasGenerated && (
            <div className="space-y-3 pt-4 border-t border-border">
              <label className="block text-sm">모델 정보</label>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-input-background/30 rounded-xl">
                  <div className="text-xs text-muted-foreground mb-1">파일 크기</div>
                  <div className="text-sm">24.8 MB</div>
                </div>
                <div className="p-3 bg-input-background/30 rounded-xl">
                  <div className="text-xs text-muted-foreground mb-1">폴리곤</div>
                  <div className="text-sm">52,480</div>
                </div>
                <div className="p-3 bg-input-background/30 rounded-xl">
                  <div className="text-xs text-muted-foreground mb-1">텍스처</div>
                  <div className="text-sm">4K</div>
                </div>
                <div className="p-3 bg-input-background/30 rounded-xl">
                  <div className="text-xs text-muted-foreground mb-1">생성 시간</div>
                  <div className="text-sm">방금 전</div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {hasGenerated && (
            <div className="grid grid-cols-2 gap-3">
              <button className="py-3 bg-input-background border border-border rounded-xl hover:border-primary/50 transition-all flex items-center justify-center gap-2">
                <Eye className="w-4 h-4" />
                <span>미리보기</span>
              </button>
              <button className="py-3 bg-gradient-to-r from-primary to-[#6366f1] text-primary-foreground rounded-xl hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                <span>다운로드</span>
              </button>
            </div>
          )}
        </motion.div>
      </div>

      <style>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
