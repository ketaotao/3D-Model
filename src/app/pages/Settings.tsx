import { useState } from 'react';
import { User, Bell, Palette, Zap, CreditCard, Shield, Globe, Save, Check } from 'lucide-react';
import { motion } from 'motion/react';

export default function Settings() {
  const [selectedSection, setSelectedSection] = useState('profile');
  const [saved, setSaved] = useState(false);

  const sections = [
    { id: 'profile', label: '프로필', icon: User },
    { id: 'notifications', label: '알림', icon: Bell },
    { id: 'appearance', label: '외관', icon: Palette },
    { id: 'performance', label: '성능', icon: Zap },
    { id: 'billing', label: '결제', icon: CreditCard },
    { id: 'privacy', label: '개인정보 및 보안', icon: Shield },
    { id: 'language', label: '언어 및 지역', icon: Globe },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="size-full bg-background overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 30% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
                           radial-gradient(circle at 70% 80%, rgba(0, 212, 255, 0.15) 0%, transparent 50%)`
        }}></div>
      </div>

      <div className="relative h-full flex gap-6 p-6">
        {/* Left Sidebar - Navigation */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-64 bg-[var(--panel-bg)] rounded-2xl border border-[var(--panel-border)] p-4"
          style={{
            boxShadow: '0 4px 24px rgba(0, 212, 255, 0.08)'
          }}
        >
          <div className="mb-6">
            <h2 className="mb-1">설정</h2>
            <p className="text-sm text-muted-foreground">환경설정 관리</p>
          </div>

          <div className="space-y-1">
            {sections.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setSelectedSection(id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  selectedSection === id
                    ? 'bg-gradient-to-r from-primary/10 to-[#6366f1]/10 border border-primary/30 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-input-background/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex-1 bg-[var(--panel-bg)] rounded-2xl border border-[var(--panel-border)] overflow-hidden"
          style={{
            boxShadow: '0 4px 24px rgba(0, 212, 255, 0.08)'
          }}
        >
          <div className="h-full flex flex-col">
            {/* Content Header */}
            <div className="p-6 border-b border-border">
              <h2 className="mb-1">{sections.find(s => s.id === selectedSection)?.label}</h2>
              <p className="text-sm text-muted-foreground">
                {selectedSection === 'profile' && '계정 정보 및 환경설정 관리'}
                {selectedSection === 'notifications' && '알림 수신 방법 구성'}
                {selectedSection === 'appearance' && '인터페이스 모양 및 느낌 사용자 지정'}
                {selectedSection === 'performance' && '생성 속도 및 품질 최적화'}
                {selectedSection === 'billing' && '구독 및 결제 방법 관리'}
                {selectedSection === 'privacy' && '데이터 및 보안 설정 제어'}
                {selectedSection === 'language' && '언어 및 지역 환경설정'}
              </p>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-6">
              {selectedSection === 'profile' && (
                <div className="space-y-6 max-w-2xl">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-[#6366f1] flex items-center justify-center border-2 border-primary/30">
                        <span className="text-2xl">JD</span>
                      </div>
                      <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                        <User className="w-4 h-4" />
                      </button>
                    </div>
                    <div>
                      <h3 className="text-base mb-1">Profile Picture</h3>
                      <p className="text-sm text-muted-foreground mb-3">Upload a new avatar or change your initials</p>
                      <button className="px-4 py-2 bg-input-background border border-border rounded-lg hover:border-primary/50 transition-all text-sm">
                        Change Avatar
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm">First Name</label>
                      <input
                        type="text"
                        defaultValue="John"
                        className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm">Last Name</label>
                      <input
                        type="text"
                        defaultValue="Doe"
                        className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm">Email Address</label>
                    <input
                      type="email"
                      defaultValue="john.doe@example.com"
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm">Bio</label>
                    <textarea
                      defaultValue="3D artist and creative technologist passionate about AI-generated models."
                      className="w-full h-32 px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                    />
                  </div>
                </div>
              )}

              {selectedSection === 'notifications' && (
                <div className="space-y-4 max-w-2xl">
                  {[
                    { label: 'Generation Complete', desc: 'Get notified when your 3D model is ready' },
                    { label: 'Community Activity', desc: 'Likes, comments, and shares on your models' },
                    { label: 'New Followers', desc: 'When someone follows your profile' },
                    { label: 'Weekly Digest', desc: 'Summary of your activity and trending models' },
                    { label: 'Product Updates', desc: 'New features and platform improvements' },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 bg-input-background/30 rounded-xl border border-border hover:border-primary/30 transition-all"
                    >
                      <div>
                        <div className="text-sm mb-1">{item.label}</div>
                        <div className="text-xs text-muted-foreground">{item.desc}</div>
                      </div>
                      <div className="relative w-12 h-6 bg-primary/20 rounded-full cursor-pointer border border-primary/30">
                        <div className="absolute top-0.5 right-0.5 w-5 h-5 bg-primary rounded-full transition-all"></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {selectedSection === 'appearance' && (
                <div className="space-y-6 max-w-2xl">
                  <div className="space-y-3">
                    <label className="block text-sm">Theme</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['Dark', 'Light', 'Auto'].map(theme => (
                        <button
                          key={theme}
                          className={`p-4 rounded-xl border transition-all ${
                            theme === 'Dark'
                              ? 'bg-primary/10 border-primary text-primary'
                              : 'bg-input-background border-border hover:border-primary/30'
                          }`}
                        >
                          {theme}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm">Accent Color</label>
                    <div className="grid grid-cols-6 gap-3">
                      {[
                        'bg-cyan-500',
                        'bg-blue-500',
                        'bg-purple-500',
                        'bg-pink-500',
                        'bg-red-500',
                        'bg-orange-500',
                      ].map((color, i) => (
                        <button
                          key={i}
                          className={`aspect-square rounded-xl ${color} hover:scale-110 transition-transform ${
                            i === 0 ? 'ring-2 ring-white ring-offset-2 ring-offset-background' : ''
                          }`}
                        ></button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm">Animation Speed</label>
                    <div className="px-4">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        defaultValue="70"
                        className="w-full h-2 bg-input-background rounded-full appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-2">
                        <span>Slow</span>
                        <span>Fast</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedSection === 'performance' && (
                <div className="space-y-6 max-w-2xl">
                  <div className="space-y-3">
                    <label className="block text-sm">Default Quality</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['Draft', 'Standard', 'High'].map(quality => (
                        <button
                          key={quality}
                          className={`p-4 rounded-xl border transition-all ${
                            quality === 'Standard'
                              ? 'bg-primary/10 border-primary text-primary'
                              : 'bg-input-background border-border hover:border-primary/30'
                          }`}
                        >
                          <div>{quality}</div>
                          <div className="text-xs opacity-60 mt-1">
                            {quality === 'Draft' && '~30s'}
                            {quality === 'Standard' && '~2min'}
                            {quality === 'High' && '~5min'}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-input-background/30 rounded-xl border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Hardware Acceleration</span>
                      <div className="relative w-12 h-6 bg-primary/20 rounded-full cursor-pointer border border-primary/30">
                        <div className="absolute top-0.5 right-0.5 w-5 h-5 bg-primary rounded-full"></div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">Use GPU for faster generation when available</p>
                  </div>

                  <div className="p-4 bg-input-background/30 rounded-xl border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Auto-save Generations</span>
                      <div className="relative w-12 h-6 bg-primary/20 rounded-full cursor-pointer border border-primary/30">
                        <div className="absolute top-0.5 right-0.5 w-5 h-5 bg-primary rounded-full"></div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">Automatically save completed models to gallery</p>
                  </div>
                </div>
              )}

              {selectedSection === 'billing' && (
                <div className="space-y-6 max-w-2xl">
                  <div className="p-6 bg-gradient-to-br from-primary/10 to-[#6366f1]/10 rounded-2xl border border-primary/30">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-base mb-1">Pro Plan</h3>
                        <p className="text-sm text-muted-foreground">Unlimited generations</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl mb-1">$29</div>
                        <div className="text-xs text-muted-foreground">per month</div>
                      </div>
                    </div>
                    <button className="w-full py-3 bg-gradient-to-r from-primary to-[#6366f1] text-primary-foreground rounded-xl hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] transition-all">
                      Manage Subscription
                    </button>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm">Payment Method</label>
                    <div className="p-4 bg-input-background rounded-xl border border-border flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-md"></div>
                        <div>
                          <div className="text-sm">•••• •••• •••• 4242</div>
                          <div className="text-xs text-muted-foreground">Expires 12/26</div>
                        </div>
                      </div>
                      <button className="text-sm text-primary hover:underline">Edit</button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm">Billing History</label>
                    {[
                      { date: 'Apr 1, 2026', amount: '$29.00', status: 'Paid' },
                      { date: 'Mar 1, 2026', amount: '$29.00', status: 'Paid' },
                      { date: 'Feb 1, 2026', amount: '$29.00', status: 'Paid' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-input-background/30 rounded-lg border border-border">
                        <div className="text-sm">{item.date}</div>
                        <div className="text-sm">{item.amount}</div>
                        <div className="text-xs px-2 py-1 bg-green-500/20 text-green-500 rounded-full border border-green-500/30">
                          {item.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedSection === 'privacy' && (
                <div className="space-y-4 max-w-2xl">
                  {[
                    { label: 'Public Profile', desc: 'Allow others to view your profile and creations' },
                    { label: 'Show in Search', desc: 'Make your profile discoverable in search results' },
                    { label: 'Activity Status', desc: 'Show when you\'re online to other users' },
                    { label: 'Analytics', desc: 'Help improve the platform by sharing usage data' },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 bg-input-background/30 rounded-xl border border-border"
                    >
                      <div>
                        <div className="text-sm mb-1">{item.label}</div>
                        <div className="text-xs text-muted-foreground">{item.desc}</div>
                      </div>
                      <div className="relative w-12 h-6 bg-primary/20 rounded-full cursor-pointer border border-primary/30">
                        <div className="absolute top-0.5 right-0.5 w-5 h-5 bg-primary rounded-full"></div>
                      </div>
                    </div>
                  ))}

                  <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/30 mt-8">
                    <h3 className="text-base text-red-500 mb-2">Danger Zone</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Permanently delete your account and all associated data
                    </p>
                    <button className="px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-500 rounded-lg hover:bg-red-500/30 transition-all text-sm">
                      Delete Account
                    </button>
                  </div>
                </div>
              )}

              {selectedSection === 'language' && (
                <div className="space-y-6 max-w-2xl">
                  <div className="space-y-3">
                    <label className="block text-sm">Language</label>
                    <select className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all">
                      <option>English (US)</option>
                      <option>한국어 (Korean)</option>
                      <option>日本語 (Japanese)</option>
                      <option>中文 (Chinese)</option>
                      <option>Español (Spanish)</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm">Time Zone</label>
                    <select className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all">
                      <option>UTC-8 (Pacific Time)</option>
                      <option>UTC-5 (Eastern Time)</option>
                      <option>UTC+0 (London)</option>
                      <option>UTC+9 (Seoul, Tokyo)</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm">Date Format</label>
                    <div className="grid grid-cols-2 gap-3">
                      {['MM/DD/YYYY', 'DD/MM/YYYY'].map(format => (
                        <button
                          key={format}
                          className={`p-4 rounded-xl border transition-all ${
                            format === 'MM/DD/YYYY'
                              ? 'bg-primary/10 border-primary text-primary'
                              : 'bg-input-background border-border hover:border-primary/30'
                          }`}
                        >
                          {format}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                변경 사항이 자동으로 저장됩니다
              </p>
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-gradient-to-r from-primary to-[#6366f1] text-primary-foreground rounded-xl hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] transition-all flex items-center gap-2"
              >
                {saved ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>저장됨</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>변경사항 저장</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
