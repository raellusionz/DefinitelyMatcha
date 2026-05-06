export default function SuggestionCard() {
  return (
    <div className="mt-8 flex flex-col items-center gap-6 rounded-xl border border-[#406840]/10 bg-[#beecb9]/20 p-6 md:flex-row">
      <div className="flex-grow">
        <h4 className="mb-2 font-['Noto_Serif'] text-[24px] font-medium leading-[1.4] text-[#173124]">
          Enhance Your Ritual
        </h4>

        <p className="font-['Plus_Jakarta_Sans'] text-[16px] font-normal leading-[1.6] tracking-[0.01em] text-[#446c44]">
          Add a handmade Chawan to your Kyoto order and receive free shipping on
          both carts.
        </p>
      </div>

      <button className="rounded-full border border-[#406840] px-6 py-3 font-['Plus_Jakarta_Sans'] text-[12px] font-semibold uppercase leading-none tracking-[0.05em] text-[#406840] transition-colors hover:bg-[#406840]/5">
        View Bowls
      </button>
    </div>
  );
}