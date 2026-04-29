import { useState } from 'react';
import { Search, Filter, Download, Heart, Eye, Clock, Grid3x3, LayoutGrid } from 'lucide-react';
import { motion } from 'motion/react';

export default function Gallery() {
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('masonry');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const mockModels = [
    { id: 1, title: '미래형 우주선', views: '12.4K', likes: 342, date: '2일 전', color: 'from-cyan-500 to-blue-600' },
    { id: 2, title: '드래곤 조각상', views: '8.2K', likes: 256, date: '5일 전', color: 'from-red-500 to-orange-600' },
    { id: 3, title: '고대 사원', views: '15.1K', likes: 489, date: '1주일 전', color: 'from-amber-500 to-yellow-600' },
    { id: 4, title: '크리스탈 형성', views: '6.7K', likes: 178, date: '3일 전', color: 'from-purple-500 to-pink-600' },
    { id: 5, title: '사이버펑크 도시', views: '22.3K', likes: 721, date: '1일 전', color: 'from-blue-500 to-purple-600' },
    { id: 6, title: '기계 로봇', views: '9.8K', likes: 312, date: '4일 전', color: 'from-gray-500 to-zinc-600' },
    { id: 7, title: '판타지 무기', views: '11.2K', likes: 401, date: '6일 전', color: 'from-indigo-500 to-blue-600' },
    { id: 8, title: '유기체 생명체', views: '14.5K', likes: 523, date: '2일 전', color: 'from-green-500 to-emerald-600' },
    { id: 9, title: 'SF 차량', views: '18.9K', likes: 634, date: '3일 전', color: 'from-teal-500 to-cyan-600' },
  ];

  const filters = [
    { id: 'all', label: '전체' },
    { id: 'recent', label: '최근' },
    { id: 'popular', label: '인기' },
    { id: 'favorites', label: '즐겨찾기' }
  ];

  return (
    <div className="size-full bg-background overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(0, 212, 255, 0.15) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)`
        }}></div>
      </div>

      <div className="relative h-full flex flex-col p-6 gap-6">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="mb-2">내 갤러리</h1>
            <p className="text-sm text-muted-foreground">생성한 3D 모델을 탐색하고 관리하세요</p>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex gap-1 p-1 bg-input-background rounded-lg border border-border">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('masonry')}
                className={`p-2 rounded-md transition-all ${viewMode === 'masonry' ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex gap-4"
        >
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="모델 검색..."
              className="w-full h-12 pl-12 pr-4 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-5 py-3 rounded-xl border transition-all ${
                  selectedFilter === filter.id
                    ? 'bg-primary/10 border-primary text-primary'
                    : 'bg-input-background border-border hover:border-primary/30'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <button className="px-5 py-3 bg-input-background border border-border rounded-xl hover:border-primary/50 transition-all flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <span>더보기</span>
          </button>
        </motion.div>

        {/* Models Grid */}
        <div className="flex-1 overflow-y-auto">
          <div className={viewMode === 'grid'
            ? 'grid grid-cols-3 gap-6'
            : 'columns-3 gap-6 space-y-6'
          }>
            {mockModels.map((model, index) => (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group relative bg-[var(--panel-bg)] rounded-2xl border border-[var(--panel-border)] overflow-hidden cursor-pointer hover:border-primary/50 transition-all"
                style={{
                  boxShadow: '0 4px 20px rgba(0, 212, 255, 0.05)',
                  breakInside: 'avoid'
                }}
              >
                {/* Model Preview */}
                <div className={`relative ${viewMode === 'grid' ? 'aspect-square' : 'aspect-[4/5]'} overflow-hidden bg-gradient-to-br ${model.color} p-8`}>
                  <motion.div
                    animate={{
                      rotate: 360,
                      scale: [1, 1.05, 1]
                    }}
                    transition={{
                      rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                      scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
                    }}
                    className="w-full h-full bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30"
                  ></motion.div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button className="p-3 bg-primary/90 rounded-full hover:scale-110 transition-transform">
                      <Eye className="w-5 h-5" />
                    </button>
                    <button className="p-3 bg-primary/90 rounded-full hover:scale-110 transition-transform">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Model Info */}
                <div className="p-4 space-y-3">
                  <h3 className="text-base">{model.title}</h3>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <Eye className="w-4 h-4" />
                        <span>{model.views}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Heart className="w-4 h-4" />
                        <span>{model.likes}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>{model.date}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
