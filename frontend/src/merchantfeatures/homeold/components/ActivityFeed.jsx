// components/ActivityFeed.jsx
import { ACTIVITIES } from "../data/mockData";

const dotClasses = {
  order: "bg-[#5a8f63]",
  low: "bg-[#b89a5a]",
  login: "bg-[#a0b8d4]",
};


export default function ActivityFeed({ activities = ACTIVITIES, onViewAll }) {
  return (
    <section className="animate-fade-up-delayed-4">
      <div className="mb-[14px] flex items-center justify-between">
        <h2 className="font-['Cormorant_Garamond'] text-[clamp(18px,3vw,21px)] font-semibold text-[#2c2416]">
          Recent Activity
        </h2>
        <button
          type="button"
          onClick={onViewAll}
          className="cursor-pointer border-0 bg-transparent p-0 text-xs font-medium text-[#3d6b47] opacity-80 transition-opacity hover:opacity-100"
        >
          View all →
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border-[1.5px] border-[#ede8de] bg-white">
        {activities.map((a, i) => (
          <div
            className="flex items-center gap-[clamp(10px,2vw,14px)] border-b border-[#f0ebe0] px-[clamp(16px,3vw,22px)] py-[clamp(13px,2vw,16px)] transition-colors last:border-b-0 hover:bg-[#faf8f4]"
            key={`${a.label}-${a.time}-${i}`}
          >
            <div className={`h-[7px] w-[7px] shrink-0 rounded-full ${dotClasses[a.type] ?? "bg-[#a0b8d4]"}`} />

            <div className="min-w-0 flex-1">
              <div className="truncate text-[clamp(12.5px,2vw,13.5px)] leading-[1.4] text-[#4a3f30]">
                <strong className="font-medium text-[#2c2416]">{a.label}</strong> — {a.detail}
              </div>
              <div className="mt-0.5 text-[11px] text-[#b8b0a0]">{a.time}</div>
            </div>

            {a.amount && (
              <div className="shrink-0 font-['Cormorant_Garamond'] text-[clamp(14px,2.5vw,16px)] font-semibold text-[#3d6b47]">
                {a.amount}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
