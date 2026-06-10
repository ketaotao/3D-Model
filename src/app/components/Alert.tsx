import { CheckCircle, AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

interface AlertProps {
  show: boolean;
  title?: string;
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
}

export default function Alert({ show, title, message, type = 'info', onClose }: AlertProps) {
  const { t } = useLanguage();

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-card rounded-2xl border border-border w-full max-w-md p-6 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {type === 'success' && (
                  <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                )}
                {type === 'error' && (
                  <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-red-500" />
                  </div>
                )}
                {type === 'info' && (
                  <div className="w-10 h-10 bg-[#5b5bff]/10 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-[#5b5bff]" />
                  </div>
                )}
                <div>
                  <h3 className="text-lg text-foreground" style={{ fontWeight: 700 }}>
                    {title || 'Twin-Market'}
                  </h3>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1 hover:bg-secondary rounded-lg transition-all"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Message */}
            <p className="text-sm text-foreground mb-6 leading-relaxed whitespace-pre-line">
              {message}
            </p>

            {/* Button */}
            <button
              onClick={onClose}
              className="w-full py-3 bg-[#5b5bff] text-white rounded-xl hover:opacity-90 transition-all"
              style={{ fontWeight: 600 }}
            >
              {t('alert.confirm')}
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
