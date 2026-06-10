import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ko' | 'en' | 'zh' | 'ja';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ko: {
    // Navigation
    'nav.home': '홈',
    'nav.sell': '판매하기',
    'nav.generate': '생성',
    'nav.gallery': '갤러리',
    'nav.settings': '설정',

    // Home
    'home.title': '방금 올라온 3D 상품',
    'home.badge': '3D 스캔본',

    // Sell
    'sell.title': '상품 등록하기 (3D 생성)',
    'sell.productName': '상품명',
    'sell.category': '카테고리',
    'sell.price': '가격 (원)',
    'sell.description': '설명',
    'sell.video': '상품 촬영 영상',
    'sell.videoUpload': '클릭하여 영상 업로드 및 3D 생성',
    'sell.videoHint': '물건을 중심으로 한 바퀴 빌 듯이 영상을 촬영합니다.',
    'sell.submit': '등록하기',
    'sell.submitting': '3D 생성 중...',
    'sell.errorMsg': '상품명, 가격, 영상을 모두 입력해주세요.',
    'sell.successMsg': '상품이 성공적으로 등록되었습니다! 3D 모델이 생성 중입니다.',

    // Product
    'product.condition': '상태',
    'product.restoration': '복원',
    'product.chat': '판매자와 채팅하기',
    'product.seller': '판매자',
    'product.sellerInitial': '판',
    'product.inputPlaceholder': '메시지를 입력하세요...',
    'product.welcomeMessage': '안녕하세요! 문의 사항이 있으시면 언제든지 물어보세요.',
    'product.replyMessage': '메시지 감사합니다. 곧 답변 드리겠습니다!',
    'product.viewerHint': '마우스로 물건을 돌리거나 스크래치를 확인하세요',
    'product.rendering': '3DGS 렌더링',

    // Generate
    'generate.title': '이미지를 3D 모델로 변환',
    'generate.subtitle': '이미지를 업로드하고 AI가 3D 모델을 생성합니다',
    'generate.uploadImage': '이미지 업로드',
    'generate.uploadHint': '클릭하거나 드래그하여 이미지 업로드',
    'generate.fileHint': 'PNG, JPG, WEBP (최대 10MB)',
    'generate.additionalDesc': '추가 설명 (선택사항)',
    'generate.style': '스타일',
    'generate.styleRealistic': '사실적',
    'generate.styleStylized': '양식화',
    'generate.styleLowPoly': '로우폴리',
    'generate.styleAbstract': '추상적',
    'generate.resolution': '해상도',
    'generate.modelType': '모델 타입',
    'generate.modelStandard': '표준',
    'generate.modelDetailed': '정밀',
    'generate.modelFast': '빠름',
    'generate.generate': '3D 모델 생성',
    'generate.generating': '3D 모델 생성 중...',
    'generate.preview': '3D 미리보기',
    'generate.viewport': '인터랙티브 모델 뷰포트',
    'generate.progress': '진행률',
    'generate.export': '내보내기 형식',

    // Gallery
    'gallery.title': '내 갤러리',
    'gallery.count': '생성된 3D 모델 {count}개',
    'gallery.search': '모델 검색...',
    'gallery.allStyles': '모든 스타일',
    'gallery.deleteTitle': '모델 삭제',
    'gallery.deleteConfirm': '이 모델을 삭제하시겠습니까? 삭제된 모델은 복구할 수 없습니다.',
    'gallery.cancel': '취소',
    'gallery.delete': '삭제',
    'gallery.deleteSuccess': '모델이 삭제되었습니다.',
    'gallery.downloadMsg': '{name} 다운로드를 시작합니다.\n형식: GLB\n해상도: {resolution}px',
    'gallery.viewer': '3D 모델 뷰어',
    'gallery.download': '다운로드',
    'gallery.noResults': '검색 결과가 없습니다.',

    // Settings
    'settings.title': '설정',
    'settings.profile': '프로필',
    'settings.notifications': '알림',
    'settings.appearance': '외관',
    'settings.performance': '성능',
    'settings.billing': '결제',
    'settings.privacy': '개인정보 및 보안',
    'settings.language': '언어 및 지역',
    'settings.profileSettings': '프로필 설정',
    'settings.username': '사용자 이름',
    'settings.email': '이메일',
    'settings.profilePhoto': '프로필 사진',
    'settings.changePhoto': '사진 변경',
    'settings.notificationSettings': '알림 설정',
    'settings.modelComplete': '모델 생성 완료',
    'settings.modelCompleteDesc': '3D 모델 생성이 완료되면 알림을 받습니다',
    'settings.emailNotif': '이메일 알림',
    'settings.emailNotifDesc': '중요한 업데이트를 이메일로 받습니다',
    'settings.marketing': '마케팅 알림',
    'settings.marketingDesc': '새로운 기능 및 프로모션 알림',
    'settings.appearanceSettings': '외관 설정',
    'settings.theme': '테마',
    'settings.darkMode': '다크 모드',
    'settings.lightMode': '라이트 모드',
    'settings.currentActive': '현재 활성화됨',
    'settings.darkTheme': '어두운 테마',
    'settings.lightTheme': '밝은 테마',
    'settings.changePassword': '비밀번호 변경',
    'settings.enable2FA': '2단계 인증',
    'settings.enable2FADesc': '계정 보안을 강화합니다',
    'settings.activate': '활성화',
    'settings.downloadData': '데이터 다운로드',
    'settings.downloadDataDesc': '내 모든 데이터를 다운로드합니다',
    'settings.request': '요청하기',
    'settings.languageSettings': '언어 및 지역',
    'settings.selectLanguage': '언어',
    'settings.downloadSuccess': '데이터 다운로드 요청이 접수되었습니다.',

    // Alert
    'alert.confirm': '확인',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.sell': 'Sell',
    'nav.generate': 'Generate',
    'nav.gallery': 'Gallery',
    'nav.settings': 'Settings',

    // Home
    'home.title': 'Latest 3D Products',
    'home.badge': '3D Scanned',

    // Sell
    'sell.title': 'List Product (3D Generation)',
    'sell.productName': 'Product Name',
    'sell.category': 'Category',
    'sell.price': 'Price (KRW)',
    'sell.description': 'Description',
    'sell.video': 'Product Video',
    'sell.videoUpload': 'Click to upload video and generate 3D',
    'sell.videoHint': 'Record a 360° video around the item.',
    'sell.submit': 'Submit',
    'sell.submitting': 'Generating 3D...',
    'sell.errorMsg': 'Please enter product name, price, and upload video.',
    'sell.successMsg': 'Product successfully listed! 3D model is being generated.',

    // Product
    'product.condition': 'Condition',
    'product.restoration': 'Restoration',
    'product.chat': 'Chat with Seller',
    'product.seller': 'Seller',
    'product.sellerInitial': 'S',
    'product.inputPlaceholder': 'Type a message...',
    'product.welcomeMessage': 'Hello! Feel free to ask any questions.',
    'product.replyMessage': 'Thank you for your message. I will reply soon!',
    'product.viewerHint': 'Use mouse to rotate and inspect the item',
    'product.rendering': '3DGS Rendering',

    // Generate
    'generate.title': 'Convert Image to 3D Model',
    'generate.subtitle': 'Upload an image and AI will generate a 3D model',
    'generate.uploadImage': 'Upload Image',
    'generate.uploadHint': 'Click or drag to upload image',
    'generate.fileHint': 'PNG, JPG, WEBP (max 10MB)',
    'generate.additionalDesc': 'Additional Description (optional)',
    'generate.style': 'Style',
    'generate.styleRealistic': 'Realistic',
    'generate.styleStylized': 'Stylized',
    'generate.styleLowPoly': 'Low-Poly',
    'generate.styleAbstract': 'Abstract',
    'generate.resolution': 'Resolution',
    'generate.modelType': 'Model Type',
    'generate.modelStandard': 'Standard',
    'generate.modelDetailed': 'Detailed',
    'generate.modelFast': 'Fast',
    'generate.generate': 'Generate 3D Model',
    'generate.generating': 'Generating 3D Model...',
    'generate.preview': '3D Preview',
    'generate.viewport': 'Interactive Model Viewport',
    'generate.progress': 'Progress',
    'generate.export': 'Export Format',

    // Gallery
    'gallery.title': 'My Gallery',
    'gallery.count': '{count} 3D models generated',
    'gallery.search': 'Search models...',
    'gallery.allStyles': 'All Styles',
    'gallery.deleteTitle': 'Delete Model',
    'gallery.deleteConfirm': 'Delete this model? This action cannot be undone.',
    'gallery.cancel': 'Cancel',
    'gallery.delete': 'Delete',
    'gallery.deleteSuccess': 'Model deleted.',
    'gallery.downloadMsg': 'Starting download of {name}.\nFormat: GLB\nResolution: {resolution}px',
    'gallery.viewer': '3D Model Viewer',
    'gallery.download': 'Download',
    'gallery.noResults': 'No results found.',

    // Settings
    'settings.title': 'Settings',
    'settings.profile': 'Profile',
    'settings.notifications': 'Notifications',
    'settings.appearance': 'Appearance',
    'settings.performance': 'Performance',
    'settings.billing': 'Billing',
    'settings.privacy': 'Privacy & Security',
    'settings.language': 'Language & Region',
    'settings.profileSettings': 'Profile Settings',
    'settings.username': 'Username',
    'settings.email': 'Email',
    'settings.profilePhoto': 'Profile Photo',
    'settings.changePhoto': 'Change Photo',
    'settings.notificationSettings': 'Notification Settings',
    'settings.modelComplete': 'Model Generation Complete',
    'settings.modelCompleteDesc': 'Get notified when 3D model generation completes',
    'settings.emailNotif': 'Email Notifications',
    'settings.emailNotifDesc': 'Receive important updates via email',
    'settings.marketing': 'Marketing Notifications',
    'settings.marketingDesc': 'New features and promotions',
    'settings.appearanceSettings': 'Appearance Settings',
    'settings.theme': 'Theme',
    'settings.darkMode': 'Dark Mode',
    'settings.lightMode': 'Light Mode',
    'settings.currentActive': 'Currently Active',
    'settings.darkTheme': 'Dark theme',
    'settings.lightTheme': 'Light theme',
    'settings.changePassword': 'Change Password',
    'settings.enable2FA': '2-Factor Authentication',
    'settings.enable2FADesc': 'Enhance account security',
    'settings.activate': 'Activate',
    'settings.downloadData': 'Download Data',
    'settings.downloadDataDesc': 'Download all your data',
    'settings.request': 'Request',
    'settings.languageSettings': 'Language & Region',
    'settings.selectLanguage': 'Language',
    'settings.downloadSuccess': 'Data download request received.',

    // Alert
    'alert.confirm': 'OK',
  },
  zh: {
    // Navigation
    'nav.home': '首页',
    'nav.sell': '出售',
    'nav.generate': '生成',
    'nav.gallery': '画廊',
    'nav.settings': '设置',

    // Home
    'home.title': '最新上架 3D 商品',
    'home.badge': '3D 扫描',

    // Sell
    'sell.title': '发布商品（3D 生成）',
    'sell.productName': '商品名称',
    'sell.category': '类别',
    'sell.price': '价格（韩元）',
    'sell.description': '描述',
    'sell.video': '商品视频',
    'sell.videoUpload': '点击上传视频并生成 3D',
    'sell.videoHint': '环绕物品录制 360° 视频。',
    'sell.submit': '提交',
    'sell.submitting': '正在生成 3D...',
    'sell.errorMsg': '请输入商品名称、价格并上传视频。',
    'sell.successMsg': '商品发布成功！正在生成 3D 模型。',

    // Product
    'product.condition': '状态',
    'product.restoration': '修复',
    'product.chat': '与卖家聊天',
    'product.seller': '卖家',
    'product.sellerInitial': '卖',
    'product.inputPlaceholder': '输入消息...',
    'product.welcomeMessage': '您好！如有任何疑问请随时咨询。',
    'product.replyMessage': '感谢您的留言。我会尽快回复！',
    'product.viewerHint': '使用鼠标旋转和检查商品',
    'product.rendering': '3DGS 渲染',

    // Generate
    'generate.title': '将图片转换为 3D 模型',
    'generate.subtitle': '上传图片，AI 将生成 3D 模型',
    'generate.uploadImage': '上传图片',
    'generate.uploadHint': '点击或拖拽上传图片',
    'generate.fileHint': 'PNG, JPG, WEBP（最大 10MB）',
    'generate.additionalDesc': '附加说明（可选）',
    'generate.style': '风格',
    'generate.styleRealistic': '写实',
    'generate.styleStylized': '风格化',
    'generate.styleLowPoly': '低多边形',
    'generate.styleAbstract': '抽象',
    'generate.resolution': '分辨率',
    'generate.modelType': '模型类型',
    'generate.modelStandard': '标准',
    'generate.modelDetailed': '精细',
    'generate.modelFast': '快速',
    'generate.generate': '生成 3D 模型',
    'generate.generating': '正在生成 3D 模型...',
    'generate.preview': '3D 预览',
    'generate.viewport': '交互式模型视图',
    'generate.progress': '进度',
    'generate.export': '导出格式',

    // Gallery
    'gallery.title': '我的画廊',
    'gallery.count': '已生成 {count} 个 3D 模型',
    'gallery.search': '搜索模型...',
    'gallery.allStyles': '所有风格',
    'gallery.deleteTitle': '删除模型',
    'gallery.deleteConfirm': '删除此模型？此操作无法撤销。',
    'gallery.cancel': '取消',
    'gallery.delete': '删除',
    'gallery.deleteSuccess': '模型已删除。',
    'gallery.downloadMsg': '开始下载 {name}。\n格式：GLB\n分辨率：{resolution}px',
    'gallery.viewer': '3D 模型查看器',
    'gallery.download': '下载',
    'gallery.noResults': '未找到结果。',

    // Settings
    'settings.title': '设置',
    'settings.profile': '个人资料',
    'settings.notifications': '通知',
    'settings.appearance': '外观',
    'settings.performance': '性能',
    'settings.billing': '账单',
    'settings.privacy': '隐私与安全',
    'settings.language': '语言与地区',
    'settings.profileSettings': '个人资料设置',
    'settings.username': '用户名',
    'settings.email': '邮箱',
    'settings.profilePhoto': '头像',
    'settings.changePhoto': '更改头像',
    'settings.notificationSettings': '通知设置',
    'settings.modelComplete': '模型生成完成',
    'settings.modelCompleteDesc': '3D 模型生成完成时接收通知',
    'settings.emailNotif': '邮件通知',
    'settings.emailNotifDesc': '通过邮件接收重要更新',
    'settings.marketing': '营销通知',
    'settings.marketingDesc': '新功能和促销信息',
    'settings.appearanceSettings': '外观设置',
    'settings.theme': '主题',
    'settings.darkMode': '深色模式',
    'settings.lightMode': '浅色模式',
    'settings.currentActive': '当前激活',
    'settings.darkTheme': '深色主题',
    'settings.lightTheme': '浅色主题',
    'settings.changePassword': '修改密码',
    'settings.enable2FA': '双重认证',
    'settings.enable2FADesc': '增强账户安全',
    'settings.activate': '激活',
    'settings.downloadData': '下载数据',
    'settings.downloadDataDesc': '下载所有数据',
    'settings.request': '请求',
    'settings.languageSettings': '语言与地区',
    'settings.selectLanguage': '语言',
    'settings.downloadSuccess': '已收到数据下载请求。',

    // Alert
    'alert.confirm': '确定',
  },
  ja: {
    // Navigation
    'nav.home': 'ホーム',
    'nav.sell': '出品',
    'nav.generate': '生成',
    'nav.gallery': 'ギャラリー',
    'nav.settings': '設定',

    // Home
    'home.title': '最新の3D商品',
    'home.badge': '3Dスキャン',

    // Sell
    'sell.title': '商品登録（3D生成）',
    'sell.productName': '商品名',
    'sell.category': 'カテゴリー',
    'sell.price': '価格（ウォン）',
    'sell.description': '説明',
    'sell.video': '商品動画',
    'sell.videoUpload': 'クリックして動画をアップロードし3D生成',
    'sell.videoHint': '商品を中心に360°動画を撮影してください。',
    'sell.submit': '登録',
    'sell.submitting': '3D生成中...',
    'sell.errorMsg': '商品名、価格、動画を全て入力してください。',
    'sell.successMsg': '商品が正常に登録されました！3Dモデルを生成中です。',

    // Product
    'product.condition': '状態',
    'product.restoration': '復元',
    'product.chat': '出品者とチャット',
    'product.seller': '出品者',
    'product.sellerInitial': '出',
    'product.inputPlaceholder': 'メッセージを入力...',
    'product.welcomeMessage': 'こんにちは！ご質問があればお気軽にどうぞ。',
    'product.replyMessage': 'メッセージありがとうございます。すぐに返信します！',
    'product.viewerHint': 'マウスで商品を回転・確認できます',
    'product.rendering': '3DGSレンダリング',

    // Generate
    'generate.title': '画像を3Dモデルに変換',
    'generate.subtitle': '画像をアップロードしてAIが3Dモデルを生成',
    'generate.uploadImage': '画像アップロード',
    'generate.uploadHint': 'クリックまたはドラッグして画像をアップロード',
    'generate.fileHint': 'PNG、JPG、WEBP（最大10MB）',
    'generate.additionalDesc': '追加説明（任意）',
    'generate.style': 'スタイル',
    'generate.styleRealistic': 'リアリスティック',
    'generate.styleStylized': 'スタイライズド',
    'generate.styleLowPoly': 'ローポリ',
    'generate.styleAbstract': '抽象的',
    'generate.resolution': '解像度',
    'generate.modelType': 'モデルタイプ',
    'generate.modelStandard': '標準',
    'generate.modelDetailed': '詳細',
    'generate.modelFast': '高速',
    'generate.generate': '3Dモデル生成',
    'generate.generating': '3Dモデル生成中...',
    'generate.preview': '3Dプレビュー',
    'generate.viewport': 'インタラクティブモデルビューポート',
    'generate.progress': '進行状況',
    'generate.export': 'エクスポート形式',

    // Gallery
    'gallery.title': 'マイギャラリー',
    'gallery.count': '生成された3Dモデル {count}個',
    'gallery.search': 'モデル検索...',
    'gallery.allStyles': 'すべてのスタイル',
    'gallery.deleteTitle': 'モデル削除',
    'gallery.deleteConfirm': 'このモデルを削除しますか？削除したモデルは復元できません。',
    'gallery.cancel': 'キャンセル',
    'gallery.delete': '削除',
    'gallery.deleteSuccess': 'モデルが削除されました。',
    'gallery.downloadMsg': '{name}のダウンロードを開始します。\n形式：GLB\n解像度：{resolution}px',
    'gallery.viewer': '3Dモデルビューアー',
    'gallery.download': 'ダウンロード',
    'gallery.noResults': '検索結果がありません。',

    // Settings
    'settings.title': '設定',
    'settings.profile': 'プロフィール',
    'settings.notifications': '通知',
    'settings.appearance': '外観',
    'settings.performance': 'パフォーマンス',
    'settings.billing': '請求',
    'settings.privacy': 'プライバシーとセキュリティ',
    'settings.language': '言語と地域',
    'settings.profileSettings': 'プロフィール設定',
    'settings.username': 'ユーザー名',
    'settings.email': 'メール',
    'settings.profilePhoto': 'プロフィール写真',
    'settings.changePhoto': '写真変更',
    'settings.notificationSettings': '通知設定',
    'settings.modelComplete': 'モデル生成完了',
    'settings.modelCompleteDesc': '3Dモデル生成完了時に通知を受け取る',
    'settings.emailNotif': 'メール通知',
    'settings.emailNotifDesc': '重要な更新をメールで受け取る',
    'settings.marketing': 'マーケティング通知',
    'settings.marketingDesc': '新機能とプロモーション',
    'settings.appearanceSettings': '外観設定',
    'settings.theme': 'テーマ',
    'settings.darkMode': 'ダークモード',
    'settings.lightMode': 'ライトモード',
    'settings.currentActive': '現在有効',
    'settings.darkTheme': 'ダークテーマ',
    'settings.lightTheme': 'ライトテーマ',
    'settings.changePassword': 'パスワード変更',
    'settings.enable2FA': '2段階認証',
    'settings.enable2FADesc': 'アカウントセキュリティを強化',
    'settings.activate': '有効化',
    'settings.downloadData': 'データダウンロード',
    'settings.downloadDataDesc': 'すべてのデータをダウンロード',
    'settings.request': 'リクエスト',
    'settings.languageSettings': '言語と地域',
    'settings.selectLanguage': '言語',
    'settings.downloadSuccess': 'データダウンロードリクエストを受け付けました。',

    // Alert
    'alert.confirm': 'OK',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ko');

  const t = (key: string, params?: Record<string, string | number>): string => {
    let text = translations[language][key] || translations['ko'][key] || key;

    // Replace parameters like {count}, {name}, etc.
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        text = text.replace(`{${key}}`, String(value));
      });
    }

    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
