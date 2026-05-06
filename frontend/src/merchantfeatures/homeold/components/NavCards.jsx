// components/NavCards.jsx
import { NAV_CARDS } from "../data/mockData";

const cardAccentClasses = {
  products: "after:bg-[#3d6b47] [&>div:first-child]:bg-[#eef5ee]",
  transactions: "after:bg-[#b89a5a] [&>div:first-child]:bg-[#faf5eb]",
};

/**
 * NavCards
 * Props:
 *   cards    {Array}    — optional override; defaults to NAV_CARDS from mockData
 *   onNavigate {function(id)} — called with the card id when tapped
 *   Each card: { id, icon, title, desc }
 */
export default function NavCards({ cards = NAV_CARDS, onNavigate }) {
  return (
    <div className="grid animate-fade-up-delayed-3 grid-cols-2 gap-[clamp(10px,2vw,16px)] max-[420px]:grid-cols-1">
      {cards.map((card) => (
        <div
          key={card.id}
          className={`group relative flex cursor-pointer flex-col gap-2.5 overflow-hidden rounded-[18px] border-[1.5px] border-[#ede8de] bg-white p-[clamp(20px,3vw,28px)] [-webkit-tap-highlight-color:transparent] transition-[transform,box-shadow,border-color] duration-[220ms] after:absolute after:-bottom-5 after:-right-5 after:h-20 after:w-20 after:rounded-full after:opacity-[0.04] after:transition-all after:duration-400 hover:-translate-y-[3px] hover:border-[#d4ccbe] hover:shadow-[0_12px_32px_rgba(44,36,22,0.1)] hover:after:h-[120px] hover:after:w-[120px] hover:after:opacity-[0.07] ${cardAccentClasses[card.id] ?? "after:bg-[#3d6b47] [&>div:first-child]:bg-[#eef5ee]"}`}
          role="button"
          tabIndex={0}
          onClick={() => onNavigate?.(card.id)}
          onKeyDown={(e) => e.key === "Enter" && onNavigate?.(card.id)}
        >
          <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[11px] text-[19px]">
            {card.icon}
          </div>
          <div className="font-['Cormorant_Garamond'] text-[clamp(19px,3vw,22px)] font-semibold text-[#2c2416]">
            {card.title}
          </div>
          <div className="text-[clamp(12px,1.8vw,13px)] font-light leading-[1.5] text-[#a09880]">
            {card.desc}
          </div>
          <div className="mt-auto self-end text-lg text-[#ccc5b5] transition-[transform,color] duration-200 group-hover:translate-x-[3px] group-hover:-translate-y-[3px] group-hover:text-[#5a8f63]">
            ↗
          </div>
        </div>
      ))}
    </div>
  );
}
