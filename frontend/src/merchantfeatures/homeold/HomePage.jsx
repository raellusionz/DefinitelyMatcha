// HomePage.jsx  ← your main entry point
import { useState } from "react";

import WelcomeBanner from "./components/WelcomeBanner";
import StoreStatusCard from "./components/StoreStatusCard";
import CloseStoreModal from "./components/CloseStoreModal";
import StatsRow from "./components/StatsRow";
import NavCards from "./components/NavCards";
import ActivityFeed from "./components/ActivityFeed";

import "./styles/global.css";

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  // Toggle: closing needs confirmation, opening is instant
  const handleToggle = () => (isOpen ? setShowConfirm(true) : setIsOpen(true));
  const handleConfirmClose = () => {
    setShowConfirm(false);
    setIsOpen(false);
  };
  const handleCancelClose = () => setShowConfirm(false);

  // Navigation handler — swap out with your router e.g. navigate("/products")
  const handleNavigate = (id) => console.log("Navigate to:", id);

  return (
  <div className="relative h-[100dvh] overflow-hidden bg-[#faf8f2] font-['DM_Sans']">
    <div className="pointer-events-none fixed -right-[140px] -top-[140px] z-0 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,#c8dfc945_0%,transparent_70%)]" />
    <div className="pointer-events-none fixed -bottom-[100px] -left-[100px] z-0 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,#b89a5a12_0%,transparent_70%)]" />

    {showConfirm && (
      <CloseStoreModal
        onCancel={handleCancelClose}
        onConfirm={handleConfirmClose}
      />
    )}

    <div className="h-[calc(100dvh-80px)] overflow-y-auto">

      <main className="relative z-[1] px-[clamp(16px,4vw,40px)] py-[clamp(20px,4vw,40px)]">
        <div className="mx-auto flex max-w-[860px] flex-col gap-[clamp(18px,3vw,26px)]">
          <WelcomeBanner name="Amirah" />
          <StoreStatusCard isOpen={isOpen} onToggle={handleToggle} />
          <StatsRow />
          <NavCards onNavigate={handleNavigate} />
          <ActivityFeed />
        </div>
      </main>
    </div>
  </div>
);
}
