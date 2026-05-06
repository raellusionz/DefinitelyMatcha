// components/StoreStatusCard.jsx

function MerchStoreStatusCard({ isOpen, onToggle }) {
  return (
    <div className="mt-3 flex animate-fade-up-delayed-1 items-center justify-between gap-5 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <div className="min-w-0 flex-1 basis-0">
        <div className="mb-[5px] text-[11px] font-medium uppercase tracking-[0.14em] text-[#a09880]">
          Store Status
        </div>
        <h2 className="mb-1 break-words font-['Cormorant_Garamond'] text-[clamp(20px,4vw,28px)] font-semibold leading-[1.1] text-[#2c2416]">
          {isOpen ? "You're Open 🌿" : "You're Closed 🌙"}
        </h2>
        <p className={`text-[clamp(12px,2vw,13.5px)] font-light leading-[1.5] ${isOpen ? "text-[#5a8f63]" : "text-[#b08080]"}`}>
          {isOpen
            ? "Customers can browse and place orders right now."
            : "Your store is hidden from customers. Toggle to reopen."}
        </p>
      </div>

      <div className="flex shrink-0 flex-col items-center gap-[7px]">
        <button
          type="button"
          className={`relative h-9 w-[68px] cursor-pointer rounded-[18px] border-0 outline-none [-webkit-tap-highlight-color:transparent] transition-colors duration-300 ${
            isOpen ? "bg-[#3d6b47]" : "bg-[#d4cdc0]"
          }`}
          onClick={onToggle}
          aria-label="Toggle store open or closed"
        >
          <div
            className={`absolute top-1 h-7 w-7 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.18)] transition-[left] duration-300 ease-out ${
              isOpen ? "translate-x-9" : "translate-x-1"
            }`}
          />
        </button>
        <span className={`whitespace-nowrap text-[10.5px] font-medium uppercase tracking-[0.1em] ${isOpen ? "text-[#3d6b47]" : "text-[#b0a090]"}`}>
          {isOpen ? "OPEN" : "CLOSED"}
        </span>
      </div>
    </div>
  );
}

export default MerchStoreStatusCard