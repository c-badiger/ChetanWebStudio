import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { SITE_CONFIG } from '../../config/siteData';

interface LegalModalsProps {
  modalType: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalsProps> = ({ modalType, onClose }) => {
  if (!modalType) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#090d16] border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden my-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2 text-sky-400">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="text-lg font-bold text-white">
              {modalType === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="text-xs text-slate-300 space-y-4 max-h-[65vh] overflow-y-auto pr-2 leading-relaxed">
          {modalType === 'privacy' ? (
            <>
              <p>
                <strong>Last Updated: 2026</strong>
              </p>
              <p>
                {SITE_CONFIG.personal.name} ("ChetanWebStudio", "I", "me") respects your privacy. This policy outlines how information submitted through inquiry forms is processed.
              </p>
              <h4 className="font-bold text-white text-sm">1. Information Collected</h4>
              <p>
                When you submit a project inquiry or qualification brief, I collect details such as your name, email address, business name, budget, and project description solely for project evaluation and proposal communication.
              </p>
              <h4 className="font-bold text-white text-sm">2. Use of Information</h4>
              <p>
                Your information is strictly used to communicate regarding your web development project. I never sell, rent, or trade client contact details to third-party marketing services.
              </p>
              <h4 className="font-bold text-white text-sm">3. Security</h4>
              <p>
                Form submissions are sanitized and protected against automated spam scripts. No private payment details or credentials are stored insecurely.
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>Last Updated: 2026</strong>
              </p>
              <h4 className="font-bold text-white text-sm">1. Scope of Work</h4>
              <p>
                All freelance web design and development projects are governed by the agreed milestone proposal, deliverables list, and custom quote signed prior to project commencement.
              </p>
              <h4 className="font-bold text-white text-sm">2. Payments & Milestones</h4>
              <p>
                Projects require a deposit upon confirmation. Final source code and domain handover are executed upon full milestone payment settlement. Payments can be completed via UPI or direct wire transfer.
              </p>
              <h4 className="font-bold text-white text-sm">3. Revisions & Support</h4>
              <p>
                Revisions are included as specified in the chosen package scope. Additional scope modifications outside the proposal will be estimated separately.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
