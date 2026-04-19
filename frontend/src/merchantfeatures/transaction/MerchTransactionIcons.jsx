import React from "react";

// ── Icons ──────────────────────────────────────────────────────────────────

const transactionSupportLogos = {

    MastercardIcon : () => (
        <svg className="ml-2 w-7 h-4" viewBox="0 0 28 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="9" r="9" fill="#EB001B" />
            <circle cx="18" cy="9" r="9" fill="#F79E1B" />
            <path
            d="M14 2.8a9 9 0 0 1 0 12.4A9 9 0 0 1 14 2.8z"
            fill="#FF5F00"
            />
        </svg>
    ),

    PaynowLogo : () => (
    <span className="ml-3 font-serif italic font-semibold text-xs sm:text-sm text-[#7B2FBE] tracking-tight">
        paynow
    </span>
    ),

    MatchaIcon : ({ purple = false }) => (
        <div
            className={`w-12 h-12 rounded-full ${purple ? "bg-[#EDE9F8]" : "bg-[#E6F4EA]"} flex items-center justify-center`}
        >
            <svg width="26" height="26" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Cup body */}
            <path d="M7 14h18l-2 10H9L7 14z" fill={purple ? "#9B6FD4" : "#4CAF50"} opacity="0.9" />
            {/* Cup handle */}
            <path d="M25 16h2a3 3 0 0 1 0 6h-2" stroke={purple ? "#9B6FD4" : "#4CAF50"} strokeWidth="1.8" fill="none" strokeLinecap="round" />
            {/* Saucer */}
            <ellipse cx="16" cy="24.5" rx="9" ry="1.5" fill={purple ? "#C4A8E8" : "#A5D6A7"} />
            {/* Steam */}
            <path d="M13 11 Q14 8 13 6" stroke={purple ? "#9B6FD4" : "#4CAF50"} strokeWidth="1.4" fill="none" strokeLinecap="round" />
            <path d="M16 10 Q17 7 16 5" stroke={purple ? "#9B6FD4" : "#4CAF50"} strokeWidth="1.4" fill="none" strokeLinecap="round" />
            <path d="M19 11 Q20 8 19 6" stroke={purple ? "#9B6FD4" : "#4CAF50"} strokeWidth="1.4" fill="none" strokeLinecap="round" />
            </svg>
        </div>
    )
}

export default transactionSupportLogos