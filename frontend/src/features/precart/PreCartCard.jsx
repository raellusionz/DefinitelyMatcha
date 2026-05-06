function PreCartCard({ cart, onClick}) {
  return (
    <button
        type="button"
        onClick={onClick}
        className="group flex w-full items-center justify-between rounded-xl border border-[#c2c8c2]/30 bg-white p-4 text-left shadow-[0_2px_12px_rgba(45,71,57,0.02)] transition-all hover:border-[#c2c8c2]/60 hover:shadow-[0_4px_24px_rgba(45,71,57,0.05)] active:scale-[0.99]"
    >
        <div className="flex items-center gap-3">
            <div className="h-14 w-14 overflow-hidden rounded-lg border border-[#c2c8c2]/10 bg-[#f0eee9]">
                <img
                    className="h-full w-full object-cover"
                    src={cart.image || ''}
                    alt={cart.merchant_brand_name || 'Merchant image'}
                />
            </div>

            <div className="py-2 text-left">
                <h3 className="pb-2 font-['Noto_Serif'] text-[18px] font-bold leading-[1.6] text-[#173124]">
                    {cart.merchant_brand_name}
                </h3>

                <p className="font-['Plus_Jakarta_Sans'] text-[12px] font-semibold uppercase leading-none tracking-[0.05em] text-[#406840]">
                    {cart.cart_item_count} items
                </p>
            </div>
        </div>

        <span className="material-symbols-outlined text-[#727973] transition-colors group-hover:text-[#173124]">
            chevron_right
        </span>
    </button>
  );
}

export default PreCartCard