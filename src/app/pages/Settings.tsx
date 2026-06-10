import { useState } from 'react';
import { User, Bell, Palette, Shield, Globe, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import Alert from '../components/Alert';

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [activeSection, setActiveSection] = useState('profile');
  const [notifications, setNotifications] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [showDataModal, setShowDataModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ message: '', type: 'info' as 'success' | 'error' | 'info' });

  const sections = [
    { id: 'profile', label: t('settings.profile'), icon: User },
    { id: 'notifications', label: t('settings.notifications'), icon: Bell },
    { id: 'appearance', label: t('settings.appearance'), icon: Palette },
    { id: 'privacy', label: t('settings.privacy'), icon: Shield },
    { id: 'language', label: t('settings.language'), icon: Globe },
  ];

  return (
    <div className="size-full bg-background">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8">
        <h1 className="text-2xl md:text-3xl mb-6 md:mb-8 text-foreground" style={{ fontWeight: 700 }}>
          {t('settings.title')}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 md:gap-8">
          {/* Left Sidebar - Horizontal scroll on mobile */}
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex-shrink-0 md:flex-shrink md:w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
                    activeSection === section.id
                      ? 'bg-[#5b5bff]/10 border border-[#5b5bff] text-[#5b5bff]'
                      : 'bg-card border border-border text-muted-foreground hover:border-[#5b5bff]/30 hover:text-foreground'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm whitespace-nowrap md:whitespace-normal" style={{ fontWeight: 500 }}>{section.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Content */}
          <div className="bg-card border border-border rounded-2xl p-4 md:p-8">
            {activeSection === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-xl mb-6 text-foreground" style={{ fontWeight: 700 }}>프로필 설정</h2>
                <div>
                  <label className="block text-sm mb-2 text-foreground" style={{ fontWeight: 600 }}>사용자 이름</label>
                  <input
                    type="text"
                    defaultValue="사용자"
                    className="w-full px-4 py-3 bg-input-background border border-border text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b5bff]/50"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-foreground" style={{ fontWeight: 600 }}>이메일</label>
                  <input
                    type="email"
                    defaultValue="user@example.com"
                    className="w-full px-4 py-3 bg-input-background border border-border text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b5bff]/50"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-foreground" style={{ fontWeight: 600 }}>프로필 사진</label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#5b5bff] to-[#6366f1] rounded-full flex items-center justify-center text-white text-2xl" style={{ fontWeight: 700 }}>
                      U
                    </div>
                    <button className="px-4 py-2 bg-[#5b5bff] text-white rounded-lg hover:opacity-90 transition-all text-sm" style={{ fontWeight: 600 }}>
                      사진 변경
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl mb-6 text-foreground" style={{ fontWeight: 700 }}>알림 설정</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-input-background rounded-lg border border-border">
                    <div>
                      <p className="text-sm mb-1 text-foreground" style={{ fontWeight: 600 }}>모델 생성 완료</p>
                      <p className="text-xs text-muted-foreground">3D 모델 생성이 완료되면 알림을 받습니다</p>
                    </div>
                    <label className="relative inline-block w-12 h-6">
                      <input
                        type="checkbox"
                        checked={notifications}
                        onChange={(e) => setNotifications(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-12 h-6 bg-switch-background peer-checked:bg-[#5b5bff] rounded-full peer transition-all cursor-pointer"></div>
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-6 transition-all"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-input-background rounded-lg border border-border">
                    <div>
                      <p className="text-sm mb-1 text-foreground" style={{ fontWeight: 600 }}>이메일 알림</p>
                      <p className="text-xs text-muted-foreground">중요한 업데이트를 이메일로 받습니다</p>
                    </div>
                    <label className="relative inline-block w-12 h-6">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-12 h-6 bg-switch-background peer-checked:bg-[#5b5bff] rounded-full peer transition-all cursor-pointer"></div>
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-6 transition-all"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-input-background rounded-lg border border-border">
                    <div>
                      <p className="text-sm mb-1 text-foreground" style={{ fontWeight: 600 }}>마케팅 알림</p>
                      <p className="text-xs text-muted-foreground">새로운 기능 및 프로모션 알림</p>
                    </div>
                    <label className="relative inline-block w-12 h-6">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-12 h-6 bg-switch-background peer-checked:bg-[#5b5bff] rounded-full peer transition-all cursor-pointer"></div>
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-6 transition-all"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'appearance' && (
              <div className="space-y-6">
                <h2 className="text-xl mb-6 text-foreground" style={{ fontWeight: 700 }}>외관 설정</h2>
                <div>
                  <label className="block text-sm mb-3 text-foreground" style={{ fontWeight: 600 }}>테마</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setTheme('light')}
                      className={`p-4 rounded-xl border transition-all ${
                        theme === 'light'
                          ? 'bg-[#5b5bff]/10 border-[#5b5bff] text-[#5b5bff]'
                          : 'bg-card border-border text-muted-foreground hover:border-[#5b5bff]/30'
                      }`}
                    >
                      <div className="text-sm" style={{ fontWeight: 600 }}>라이트 모드</div>
                      <div className="text-xs opacity-60 mt-1">{theme === 'light' ? '현재 활성화됨' : '밝은 테마'}</div>
                    </button>
                    <button
                      onClick={() => setTheme('dark')}
                      className={`p-4 rounded-xl border transition-all ${
                        theme === 'dark'
                          ? 'bg-[#5b5bff]/10 border-[#5b5bff] text-[#5b5bff]'
                          : 'bg-card border-border text-muted-foreground hover:border-[#5b5bff]/30'
                      }`}
                    >
                      <div className="text-sm" style={{ fontWeight: 600 }}>다크 모드</div>
                      <div className="text-xs opacity-60 mt-1">{theme === 'dark' ? '현재 활성화됨' : '어두운 테마'}</div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'privacy' && (
              <div className="space-y-6">
                <h2 className="text-xl mb-6 text-foreground" style={{ fontWeight: 700 }}>개인정보 및 보안</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-input-background rounded-lg border border-border">
                    <p className="text-sm mb-2 text-foreground" style={{ fontWeight: 600 }}>비밀번호 변경</p>
                    <button
                      onClick={() => setShowPasswordModal(true)}
                      className="px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-all text-sm"
                      style={{ fontWeight: 600 }}
                    >
                      변경하기
                    </button>
                  </div>
                  <div className="p-4 bg-input-background rounded-lg border border-border">
                    <p className="text-sm mb-2 text-foreground" style={{ fontWeight: 600 }}>2단계 인증</p>
                    <p className="text-xs text-muted-foreground mb-3">계정 보안을 강화합니다</p>
                    <button
                      onClick={() => setShow2FAModal(true)}
                      className="px-4 py-2 bg-[#5b5bff] text-white rounded-lg hover:opacity-90 transition-all text-sm"
                      style={{ fontWeight: 600 }}
                    >
                      활성화
                    </button>
                  </div>
                  <div className="p-4 bg-input-background rounded-lg border border-border">
                    <p className="text-sm mb-2 text-foreground" style={{ fontWeight: 600 }}>데이터 다운로드</p>
                    <p className="text-xs text-muted-foreground mb-3">내 모든 데이터를 다운로드합니다</p>
                    <button
                      onClick={() => setShowDataModal(true)}
                      className="px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-all text-sm"
                      style={{ fontWeight: 600 }}
                    >
                      요청하기
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'language' && (
              <div className="space-y-6">
                <h2 className="text-xl mb-6 text-foreground" style={{ fontWeight: 700 }}>{t('settings.languageSettings')}</h2>
                <div>
                  <label className="block text-sm mb-3 text-foreground" style={{ fontWeight: 600 }}>{t('settings.selectLanguage')}</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setLanguage('ko')}
                      className={`p-4 rounded-xl border transition-all text-left ${
                        language === 'ko'
                          ? 'bg-[#5b5bff]/10 border-[#5b5bff] text-[#5b5bff]'
                          : 'bg-input-background border-border text-muted-foreground hover:border-[#5b5bff]/30'
                      }`}
                    >
                      <div className="text-sm" style={{ fontWeight: 600 }}>한국어</div>
                      <div className="text-xs opacity-60 mt-1">Korean</div>
                    </button>
                    <button
                      onClick={() => setLanguage('en')}
                      className={`p-4 rounded-xl border transition-all text-left ${
                        language === 'en'
                          ? 'bg-[#5b5bff]/10 border-[#5b5bff] text-[#5b5bff]'
                          : 'bg-input-background border-border text-muted-foreground hover:border-[#5b5bff]/30'
                      }`}
                    >
                      <div className="text-sm" style={{ fontWeight: 600 }}>English</div>
                      <div className="text-xs opacity-60 mt-1">영어</div>
                    </button>
                    <button
                      onClick={() => setLanguage('zh')}
                      className={`p-4 rounded-xl border transition-all text-left ${
                        language === 'zh'
                          ? 'bg-[#5b5bff]/10 border-[#5b5bff] text-[#5b5bff]'
                          : 'bg-input-background border-border text-muted-foreground hover:border-[#5b5bff]/30'
                      }`}
                    >
                      <div className="text-sm" style={{ fontWeight: 600 }}>中文</div>
                      <div className="text-xs opacity-60 mt-1">Chinese</div>
                    </button>
                    <button
                      onClick={() => setLanguage('ja')}
                      className={`p-4 rounded-xl border transition-all text-left ${
                        language === 'ja'
                          ? 'bg-[#5b5bff]/10 border-[#5b5bff] text-[#5b5bff]'
                          : 'bg-input-background border-border text-muted-foreground hover:border-[#5b5bff]/30'
                      }`}
                    >
                      <div className="text-sm" style={{ fontWeight: 600 }}>日本語</div>
                      <div className="text-xs opacity-60 mt-1">Japanese</div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-6">
          <div className="bg-card rounded-2xl border border-border w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg text-foreground" style={{ fontWeight: 700 }}>비밀번호 변경</h3>
              <button onClick={() => setShowPasswordModal(false)} className="p-2 hover:bg-secondary rounded-lg transition-all">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2 text-foreground" style={{ fontWeight: 600 }}>현재 비밀번호</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 bg-input-background border border-border text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b5bff]/50"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-foreground" style={{ fontWeight: 600 }}>새 비밀번호</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 bg-input-background border border-border text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b5bff]/50"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-foreground" style={{ fontWeight: 600 }}>새 비밀번호 확인</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 bg-input-background border border-border text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b5bff]/50"
                />
              </div>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="w-full py-3 bg-[#5b5bff] text-white rounded-lg hover:opacity-90 transition-all"
                style={{ fontWeight: 600 }}
              >
                비밀번호 변경
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2FA Modal */}
      {show2FAModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-6">
          <div className="bg-card rounded-2xl border border-border w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg text-foreground" style={{ fontWeight: 700 }}>2단계 인증 활성화</h3>
              <button onClick={() => setShow2FAModal(false)} className="p-2 hover:bg-secondary rounded-lg transition-all">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-input-background rounded-lg p-8 flex items-center justify-center border border-border">
                <div className="w-40 h-40 bg-white rounded-lg flex items-center justify-center">
                  <p className="text-xs text-gray-600">QR 코드</p>
                </div>
              </div>
              <div>
                <label className="block text-sm mb-2 text-foreground" style={{ fontWeight: 600 }}>인증 코드 입력</label>
                <input
                  type="text"
                  placeholder="6자리 코드"
                  className="w-full px-4 py-3 bg-input-background border border-border text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b5bff]/50 placeholder:text-muted-foreground"
                />
              </div>
              <button
                onClick={() => setShow2FAModal(false)}
                className="w-full py-3 bg-[#5b5bff] text-white rounded-lg hover:opacity-90 transition-all"
                style={{ fontWeight: 600 }}
              >
                인증 활성화
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Data Download Modal */}
      {showDataModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-6">
          <div className="bg-card rounded-2xl border border-border w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg text-foreground" style={{ fontWeight: 700 }}>데이터 다운로드</h3>
              <button onClick={() => setShowDataModal(false)} className="p-2 hover:bg-secondary rounded-lg transition-all">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-foreground opacity-80">
                회원님의 모든 데이터를 다운로드할 수 있습니다. 데이터 준비에는 최대 48시간이 소요될 수 있으며, 준비가 완료되면 이메일로 알려드립니다.
              </p>
              <div className="bg-input-background rounded-lg p-4 border border-border">
                <p className="text-sm text-foreground mb-2" style={{ fontWeight: 600 }}>포함되는 데이터:</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• 프로필 정보</li>
                  <li>• 생성한 3D 모델</li>
                  <li>• 거래 내역</li>
                  <li>• 채팅 기록</li>
                </ul>
              </div>
              <button
                onClick={() => {
                  setShowDataModal(false);
                  setAlertConfig({ message: '데이터 다운로드 요청이 접수되었습니다.', type: 'success' });
                  setShowAlert(true);
                }}
                className="w-full py-3 bg-[#5b5bff] text-white rounded-lg hover:opacity-90 transition-all"
                style={{ fontWeight: 600 }}
              >
                다운로드 요청
              </button>
            </div>
          </div>
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