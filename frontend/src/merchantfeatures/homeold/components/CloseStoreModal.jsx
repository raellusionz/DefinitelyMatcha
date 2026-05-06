// components/CloseStoreModal.jsx

/**
 * CloseStoreModal
 * Props:
 *   onCancel  {function} — dismiss the modal
 *   onConfirm {function} — confirm closing the store
 */
export default function CloseStoreModal({ onCancel, onConfirm }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex animate-fade-in items-center justify-center bg-[rgba(44,36,22,0.38)] p-5 backdrop-blur-[5px]"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-[360px] animate-scale-in rounded-[22px] bg-white p-[clamp(28px,5vw,40px)] text-center shadow-[0_24px_64px_rgba(44,36,22,0.2)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 text-[38px]">🌙</div>
        <h2 className="mb-2 font-['Cormorant_Garamond'] text-[clamp(20px,4vw,24px)] font-semibold text-[#2c2416]">
          Close your store?
        </h2>
        <p className="mb-[26px] text-[13.5px] leading-[1.6] text-[#9a8f7e]">
          Customers won&apos;t be able to place new orders until you reopen.
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            className="flex-1 cursor-pointer rounded-xl border-[1.5px] border-[#ede8de] bg-white p-[13px] font-['DM_Sans'] text-sm font-medium text-[#4a3f30] transition-colors hover:bg-[#f8f4ee]"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="flex-1 cursor-pointer rounded-xl border-0 bg-[#2c2416] p-[13px] font-['DM_Sans'] text-sm font-medium text-white transition-colors hover:bg-[#3d3020]"
            onClick={onConfirm}
          >
            Close Store
          </button>
        </div>
      </div>
    </div>
  );
}
