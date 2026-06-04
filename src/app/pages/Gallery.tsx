import { useState } from 'react';
import { Grid3x3, LayoutGrid, Search, Filter, Download, Eye, Trash2, X } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import Alert from '../components/Alert';

export default function Gallery() {
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStyle, setFilterStyle] = useState('all');
  const [selectedModel, setSelectedModel] = useState<any>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ message: '', type: 'info' as 'success' | 'error' | 'info' });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteModelId, setDeleteModelId] = useState<number | null>(null);
  const [modelsList, setModelsList] = useState([
    { id: 1, name: '빈티지 카메라', style: 'realistic', date: '2026-05-08', thumbnail: '📷', resolution: '2048' },
    { id: 2, name: '게이밍 헤드셋', style: 'realistic', date: '2026-05-07', thumbnail: '🎧', resolution: '1024' },
    { id: 3, name: '스마트폰', style: 'realistic', date: '2026-05-06', thumbnail: '📱', resolution: '2048' },
    { id: 4, name: '기계식 키보드', style: 'stylized', date: '2026-05-05', thumbnail: '⌨️', resolution: '1024' },
    { id: 5, name: '무선 마우스', style: 'low-poly', date: '2026-05-04', thumbnail: '🖱️', resolution: '1024' },
    { id: 6, name: '블루투스 스피커', style: 'realistic', date: '2026-05-03', thumbnail: '🔊', resolution: '4096' },
    { id: 7, name: '게임 컨트롤러', style: 'stylized', date: '2026-05-02', thumbnail: '🎮', resolution: '2048' },
    { id: 8, name: '스마트워치', style: 'realistic', date: '2026-05-01', thumbnail: '⌚', resolution: '1024' },
  ]);

  const handleView = (model: any) => {
    setSelectedModel(model);
  };

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
      setModelsList(modelsList.filter(m => m.id !== deleteModelId));
      setShowDeleteConfirm(false);
      setAlertConfig({ message: t('gallery.deleteSuccess'), type: 'success' });
      setShowAlert(true);
      setDeleteModelId(null);
    }
  };

  const filteredModels = modelsList.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStyle === 'all' || model.style === filterStyle;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="size-full bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl mb-2 text-foreground" style={{ fontWeight: 700 }}>
              {t('gallery.title')}
            </h1>
            <p className="text-sm text-muted-foreground">{t('gallery.count', { count: modelsList.length })}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2.5 rounded-lg border transition-all ${
                viewMode === 'grid'
                  ? 'bg-[#5b5bff]/10 border-[#5b5bff] text-[#5b5bff]'
                  : 'bg-card border-border text-muted-foreground hover:border-[#5b5bff]/30'
              }`}
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('masonry')}
              className={`p-2.5 rounded-lg border transition-all ${
                viewMode === 'masonry'
                  ? 'bg-[#5b5bff]/10 border-[#5b5bff] text-[#5b5bff]'
                  : 'bg-card border-border text-muted-foreground hover:border-[#5b5bff]/30'
              }`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search and Filter Bar */}
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
          <div className="flex items-center gap-3 px-4 bg-card border border-border rounded-xl">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <select
              value={filterStyle}
              onChange={(e) => setFilterStyle(e.target.value)}
              className="bg-transparent text-foreground text-sm focus:outline-none"
            >
              <option value="all">{t('gallery.allStyles')}</option>
              <option value="realistic">{t('generate.styleRealistic')}</option>
              <option value="stylized">{t('generate.styleStylized')}</option>
              <option value="low-poly">{t('generate.styleLowPoly')}</option>
              <option value="abstract">{t('generate.styleAbstract')}</option>
            </select>
          </div>
        </div>

        {/* Models Grid */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-4 gap-6' : 'grid grid-cols-3 gap-6'}>
          {filteredModels.map((model, index) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-card rounded-2xl overflow-hidden border border-border hover:border-[#5b5bff]/50 transition-all group"
            >
              {/* Model Preview */}
              <div className="relative aspect-square bg-input-background flex items-center justify-center">
                <span className="text-6xl">{model.thumbnail}</span>

                {/* Hover Actions */}
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    onClick={() => handleView(model)}
                    className="p-3 bg-[#5b5bff] rounded-full hover:bg-[#4a4aee] transition-all"
                  >
                    <Eye className="w-5 h-5 text-foreground" />
                  </button>
                  <button
                    onClick={() => handleDownload(model)}
                    className="p-3 bg-secondary rounded-full hover:bg-secondary/80 transition-all"
                  >
                    <Download className="w-5 h-5 text-foreground" />
                  </button>
                  <button
                    onClick={() => handleDeleteRequest(model.id)}
                    className="p-3 bg-secondary rounded-full hover:bg-red-500/20 transition-all"
                  >
                    <Trash2 className="w-5 h-5 text-red-400" />
                  </button>
                </div>

                {/* Badge */}
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 bg-[#5b5bff]/20 border border-[#5b5bff] rounded-lg text-xs text-[#5b5bff]" style={{ fontWeight: 600 }}>
                    {model.resolution}px
                  </span>
                </div>
              </div>

              {/* Model Info */}
              <div className="p-4">
                <h3 className="text-base mb-2 text-foreground" style={{ fontWeight: 600 }}>
                  {model.name}
                </h3>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{model.style === 'realistic' ? t('generate.styleRealistic') : model.style === 'stylized' ? t('generate.styleStylized') : model.style === 'low-poly' ? t('generate.styleLowPoly') : t('generate.styleAbstract')}</span>
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

      {/* View Modal */}
      {selectedModel && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">
          <div className="bg-card rounded-2xl border border-border w-full max-w-4xl">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h3 className="text-xl text-foreground mb-1" style={{ fontWeight: 700 }}>{selectedModel.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedModel.resolution}px • {selectedModel.date}</p>
              </div>
              <button
                onClick={() => setSelectedModel(null)}
                className="p-2 hover:bg-secondary rounded-lg transition-all"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <div className="p-8">
              <div className="aspect-video bg-input-background rounded-xl flex items-center justify-center border border-border">
                <div className="text-center">
                  <div className="text-9xl mb-4">{selectedModel.thumbnail}</div>
                  <p className="text-muted-foreground text-sm">{t('gallery.viewer')}</p>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => handleDownload(selectedModel)}
                  className="flex-1 py-3 bg-[#5b5bff] text-foreground rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2"
                  style={{ fontWeight: 600 }}
                >
                  <Download className="w-5 h-5" />
                  <span>{t('gallery.download')}</span>
                </button>
                <button
                  onClick={() => {
                    handleDeleteRequest(selectedModel.id);
                    setSelectedModel(null);
                  }}
                  className="px-6 py-3 bg-secondary text-red-400 rounded-xl hover:bg-red-500/20 transition-all flex items-center gap-2"
                  style={{ fontWeight: 600 }}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-card rounded-2xl border border-border w-full max-w-md p-6"
          >
            <h3 className="text-lg text-foreground mb-4" style={{ fontWeight: 700 }}>{t('gallery.deleteTitle')}</h3>
            <p className="text-sm text-foreground mb-6">
              {t('gallery.deleteConfirm')}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-3 bg-secondary text-foreground rounded-xl hover:opacity-90 transition-all"
                style={{ fontWeight: 600 }}
              >
                {t('gallery.cancel')}
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 py-3 bg-red-500 text-foreground rounded-xl hover:opacity-90 transition-all"
                style={{ fontWeight: 600 }}
              >
                {t('gallery.delete')}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <Alert
        show={showAlert}
        message={alertConfig.message}
        type={alertConfig.type}
        onClose={() => setShowAlert(false)}
      />
    </div>
  );
}
