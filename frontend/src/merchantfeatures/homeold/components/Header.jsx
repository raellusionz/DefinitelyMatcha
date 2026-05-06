// components/Header.jsx

/**
 * Header
 * Props:
 *   isOpen  {boolean} — controls the Open/Closed pill colour
 *   initials {string} — merchant avatar initials, e.g. "AM"
 */
export default function Header({ isOpen, initials = "AM" }) {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between gap-3 border-b border-[#ede8de] bg-[rgba(250,248,242,0.92)] px-[clamp(16px,4vw,40px)] backdrop-blur-xl">
      <div className="flex shrink-0 items-center gap-[9px]">
        <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[9px] bg-[#3d6b47] text-base">
          🍵
        </div>
        <div className="whitespace-nowrap font-['Cormorant_Garamond'] text-xl font-semibold tracking-[0.02em] text-[#2c2416]">
          Definitely <span className="italic text-[#3d6b47]">Matcha</span>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <div
          className={`inline-flex items-center gap-[5px] whitespace-nowrap rounded-[20px] px-[11px] py-[5px] text-xs font-medium transition-all duration-300 ${
            isOpen ? "bg-[#e6f3e7] text-[#3d6b47]" : "bg-[#f5efea] text-[#a07060]"
          }`}
        >
          <div className={`h-1.5 w-1.5 rounded-full ${isOpen ? "animate-blink bg-[#5a8f63]" : "bg-[#c09080]"}`} />
          {isOpen ? "Open now" : "Closed"}
        </div>
        <div className="hidden whitespace-nowrap rounded-[20px] border border-[#ede8de] bg-white px-3 py-[5px] text-[11.5px] font-medium text-[#4a3f30] min-[481px]:block">
          Merchant Portal
        </div>
        <div className="flex h-[34px] w-[34px] shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#c8dfc9] text-[13px] font-medium text-[#3d6b47]">
          {initials}
        </div>
      </div>
    </header>
  );
}
