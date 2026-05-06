// components/StatsRow.jsx
import { STATS } from "../data/mockData";

const changeClasses = {
  up: "text-[#5a8f63]",
  down: "text-[#c07060]",
};

/**
 * StatsRow
 * Props:
 *   stats {Array} — optional override; defaults to STATS from mockData
 *   Each item: { icon, value, name, change, dir }
 */
export default function StatsRow({ stats = STATS }) {
  return (
    <div className="grid animate-fade-up-delayed-2 grid-cols-3 gap-[clamp(10px,2vw,16px)] max-[480px]:grid-cols-2 max-[480px]:[&>*:last-child]:col-span-full">
      {stats.map((s) => (
        <div
          className="rounded-2xl border-[1.5px] border-[#ede8de] bg-white px-[clamp(14px,3vw,22px)] py-[clamp(16px,3vw,22px)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(44,36,22,0.09)]"
          key={s.name}
        >
          <span className="mb-2.5 block text-lg">{s.icon}</span>
          <div className="mb-[3px] font-['Cormorant_Garamond'] text-[clamp(26px,4vw,32px)] font-semibold leading-none text-[#2c2416]">
            {s.value}
          </div>
          <div className="text-xs text-[#a09880]">{s.name}</div>
          <div className={`mt-[5px] text-[11px] font-medium ${changeClasses[s.dir] ?? "text-[#5a8f63]"}`}>
            {s.change}
          </div>
        </div>
      ))}
    </div>
  );
}
