import { useState, useEffect } from 'react';
import { Grid3x3, LayoutGrid, Search, Download, Eye, Trash2, X, Box } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import Alert from '../components/Alert';

function ModelThumbnail({ url, videoUrl, name }: { url: string | null; videoUrl?: string | null; name: string }) {
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
      <span className="text-xs text-muted-foreground">3D 렌더</span>
    </div>
  );
}

export default function Gallery() {
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModel, setSelectedModel] = useState<any>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ message: '', type: 'info' as 'success' | 'error' | 'info' });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteModelId, setDeleteModelId] = useState<number | null>(null);
  const [modelsList, setModelsList] = useState<any[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('gallery') || '[]');
    setModelsList(saved);
  }, []);

  const handleView = (model: any) => setSelectedModel(model);

  const handleDownload = (model: any) => {
    setAlertConfig({
      message: t('gallery.downloadMsg', { name: model.name, resolution: model.resolution }),
      type: 'success'
    });
    setShowAlert(true);
  };

  const handleDeleteRequest = (modelId: number) => {
    setDeleteModelId(modelId);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    if (deleteModelId !== null) {
      const updated = modelsList.filter(m => m.id !== deleteModelId);
      setModelsList(updated);
      localStorage.setItem('gallery', JSON.stringify(updated));
      setShowDeleteConfirm(false);
      setAlertConfig({ message: t('gallery.deleteSuccess'), type: 'success' });
      setShowAlert(true);
      setDeleteModelId(null);
    }
  };

  const filteredModels = modelsList.filter(model =>
    model.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="size-full bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl mb-2 text-foreground" style={{ fontWeight: 700 }}>{t('gallery.title')}</h1>
            <p className="text-sm text-muted-foreground">{t('gallery.count', { count: modelsList.length })}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setViewMode('grid')} className={`p-2.5 rounded-lg border transition-all ${viewMode === 'grid' ? 'bg-[#5b5bff]/10 border-[#5b5bff] text-[#5b5bff]' : 'bg-card border-border text-muted-foreground hover:border-[#5b5bff]/30'}`}>
              <Grid3x3 className="w-5 h-5" />
            </button>
            <button onClick={() => setViewMode('masonry')} className={`p-2.5 rounded-lg border transition-all ${viewMode === 'masonry' ? 'bg-[#5b5bff]/10 border-[#5b5bff] text-[#5b5bff]' : 'bg-card border-border text-muted-foreground hover:border-[#5b5bff]/30'}`}>
              <LayoutGrid className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('gallery.search')}
              className="w-full pl-12 pr-4 py-3 bg-card border border-border text-foreground rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5b5bff]/50 transition-all placeholder:text-muted-foreground"
            />
          </div>
        </div>

        <div className={viewMode === 'grid' ? 'grid grid-cols-4 gap-6' : 'grid grid-cols-3 gap-6'}>
          {filteredModels.map((model, index) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-card rounded-2xl overflow-hidden border border-border hover:border-[#5b5bff]/50 transition-all group"
            >
              <div className="relative aspect-square overflow-hidden">
                <ModelThumbnail url={model.thumbnailUrl} videoUrl={model.videoUrl} name={model.name} />
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button onClick={() => handleView(model)} className="p-3 bg-[#5b5bff] rounded-full hover:bg-[#4a4aee] transition-all">
                    <Eye className="w-5 h-5 text-foreground" />
                  </button>
                  <button onClick={() => handleDownload(model)} className="p-3 bg-secondary rounded-full hover:bg-secondary/80 transition-all">
                    <Download className="w-5 h-5 text-foreground" />
                  </button>
                  <button onClick={() => handleDeleteRequest(model.id)} className="p-3 bg-secondary rounded-full hover:bg-red-500/20 transition-all">
                    <Trash2 className="w-5 h-5 text-red-400" />
                  </button>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 bg-[#5b5bff]/20 border border-[#5b5bff] rounded-lg text-xs text-[#5b5bff]" style={{ fontWeight: 600 }}>
                    {model.resolution}px
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-base mb-2 text-foreground" style={{ fontWeight: 600 }}>{model.name}</h3>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{model.resolution}px</span>
                  <span>{model.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredModels.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">{t('gallery.noResults')}</p>
          </div>
        )}
      </div>

      {selectedModel && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">
          <div className="bg-card rounded-2xl border border-border w-full max-w-4xl">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h3 className="text-xl text-foreground mb-1" style={{ fontWeight: 700 }}>{selectedModel.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedModel.resolution}px • {selectedModel.date}</p>
              </div>
              <button onClick={() => setSelectedModel(null)} className="p-2 hover:bg-secondary rounded-lg transition-all">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <div className="p-8">
              <div className="aspect-video rounded-xl overflow-hidden border border-border relative">
                <ModelThumbnail url={selectedModel.thumbnailUrl} videoUrl={selectedModel.videoUrl} name={selectedModel.name} />
                <div className="absolute bottom-3 left-3">
                  <span className="px-2.5 py-1 bg-black/60 rounded-lg text-xs text-white">{t('gallery.viewer')}</span>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => handleDownload(selectedModel)} className="flex-1 py-3 bg-[#5b5bff] text-foreground rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2" style={{ fontWeight: 600 }}>
                  <Download className="w-5 h-5" />
                  <span>{t('gallery.download')}</span>
                </button>
                <button onClick={() => { handleDeleteRequest(selectedModel.id); setSelectedModel(null); }} className="px-6 py-3 bg-secondary text-red-400 rounded-xl hover:bg-red-500/20 transition-all flex items-center gap-2" style={{ fontWeight: 600 }}>
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-6">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-card rounded-2xl border border-border w-full max-w-md p-6">
            <h3 className="text-lg text-foreground mb-4" style={{ fontWeight: 700 }}>{t('gallery.deleteTitle')}</h3>
            <p className="text-sm text-foreground mb-6">{t('gallery.deleteConfirm')}</p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 py-3 bg-secondary text-foreground rounded-xl hover:opacity-90 transition-all" style={{ fontWeight: 600 }}>
                {t('gallery.cancel')}
              </button>
              <button onClick={handleDeleteConfirm} className="flex-1 py-3 bg-red-500 text-foreground rounded-xl hover:opacity-90 transition-all" style={{ fontWeight: 600 }}>
                {t('gallery.delete')}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <Alert show={showAlert} message={alertConfig.message} type={alertConfig.type} onClose={() => setShowAlert(false)} />
    </div>
  );
}