import React, { useState } from 'react';
import { SITE_CONFIG } from '../../config/siteData';
import { copyToClipboard } from '../../utils/helpers';
import { trackEvent } from '../../utils/analytics';
import { Copy, Check, ShieldCheck, Smartphone, Info } from 'lucide-react';


export const PaymentSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const upiId = SITE_CONFIG.personal.upiId;

  const handleCopyUpi = async () => {
    const success = await copyToClipboard(upiId);
    if (success) {
      setCopied(true);
      trackEvent({
        eventName: 'copy_upi_id',
        category: 'Interaction',
        label: upiId
      });
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section id="payment" className="py-24 relative bg-[#090d16]/95 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            Supported Payments
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Direct & Instant UPI Payment
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Convenient digital payment options for project milestone deposits and final handovers.
          </p>
        </div>

        {/* UPI Payment Card Container */}
        <div className="max-w-3xl mx-auto">
          <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-emerald-500/30 bg-slate-900/70 shadow-2xl relative overflow-hidden space-y-8">
            
            {/* Top Bar Status */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">UPI Payment Option</h3>
                  <p className="text-xs text-slate-400">Google Pay, PhonePe, Paytm, BHIM UPI</p>
                </div>
              </div>

              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Official Verified Account
              </span>
            </div>

            {/* UPI Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              
              {/* Left Column: Copyable UPI ID Box */}
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Official UPI ID:
                  </label>
                  <div className="flex items-center gap-2 p-3.5 rounded-2xl glass-input border border-slate-700 bg-slate-950/80">
                    <span className="text-base font-mono font-bold text-emerald-300 flex-1 truncate select-all">
                      {upiId}
                    </span>
                    <button
                      onClick={handleCopyUpi}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        copied
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-700'
                      }`}
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy ID</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Instructions List */}
                <div className="space-y-2.5">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Payment Instructions:
                  </span>
                  <div className="space-y-2 text-xs text-slate-300">
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-mono font-bold text-[10px] shrink-0">1</span>
                      <span>Open any UPI app (GPay, PhonePe, Paytm, BHIM) on your mobile device.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-mono font-bold text-[10px] shrink-0">2</span>
                      <span>Paste the copied UPI ID or scan the QR code alongside.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-mono font-bold text-[10px] shrink-0">3</span>
                      <span>Enter the agreed milestone deposit amount and add project reference note.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Visual QR Code Card */}
              <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col items-center justify-center text-center space-y-4">
                <div className="relative p-4 rounded-2xl bg-white shadow-2xl">
                  {/* SVG Rendered QR Code Placeholder */}
                  <svg className="w-36 h-36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100" height="100" fill="white" />
                    {/* Corner Position Detection Patterns */}
                    <rect x="5" y="5" width="30" height="30" fill="black" />
                    <rect x="10" y="10" width="20" height="20" fill="white" />
                    <rect x="15" y="15" width="10" height="10" fill="black" />

                    <rect x="65" y="5" width="30" height="30" fill="black" />
                    <rect x="70" y="10" width="20" height="20" fill="white" />
                    <rect x="75" y="15" width="10" height="10" fill="black" />

                    <rect x="5" y="65" width="30" height="30" fill="black" />
                    <rect x="10" y="70" width="20" height="20" fill="white" />
                    <rect x="15" y="75" width="10" height="10" fill="black" />

                    {/* Data Pixels */}
                    <rect x="40" y="10" width="10" height="10" fill="black" />
                    <rect x="40" y="30" width="10" height="10" fill="black" />
                    <rect x="40" y="50" width="10" height="10" fill="black" />
                    <rect x="50" y="20" width="10" height="10" fill="black" />
                    <rect x="50" y="60" width="10" height="10" fill="black" />
                    <rect x="60" y="40" width="10" height="10" fill="black" />
                    <rect x="70" y="50" width="10" height="10" fill="black" />
                    <rect x="40" y="70" width="10" height="10" fill="black" />
                    <rect x="60" y="70" width="20" height="10" fill="black" />
                    <rect x="70" y="80" width="10" height="10" fill="black" />
                    <rect x="85" y="65" width="10" height="25" fill="black" />
                  </svg>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-bold text-white block">UPI Scan & Pay</span>
                  <span className="text-[11px] text-slate-400 block">{SITE_CONFIG.personal.upiQrNote}</span>
                </div>
              </div>

            </div>

            {/* Bottom Notice Requirement */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs text-slate-400 bg-slate-950/40 p-3.5 rounded-xl border border-slate-800">
              <Info className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Payment details & formal project invoice will be provided after project scope confirmation.</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
