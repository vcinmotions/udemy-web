import React from 'react';
import { Shield, RefreshCw, Zap, HeadphonesIcon } from 'lucide-react';

const trustItems = [
  { id: 'trust-money', icon: Shield, label: '30-Day Money-Back Guarantee', desc: 'Full refund, no questions asked' },
  { id: 'trust-lifetime', icon: RefreshCw, label: 'Lifetime Access', desc: 'Learn at your own pace, forever' },
  { id: 'trust-cert', icon: Zap, label: 'Certificate of Completion', desc: 'Share on LinkedIn instantly' },
  { id: 'trust-support', icon: HeadphonesIcon, label: '24/7 Support', desc: 'Expert instructors respond within 24h' },
];

export default function TrustBar() {
  return (
    <div className="border-y border-border bg-muted/30">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 py-5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {trustItems?.map((item) => (
            <div key={item?.id} className="flex items-center gap-3">
              <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                <item.icon size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground leading-tight">{item?.label}</p>
                <p className="text-xs text-muted-foreground">{item?.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}