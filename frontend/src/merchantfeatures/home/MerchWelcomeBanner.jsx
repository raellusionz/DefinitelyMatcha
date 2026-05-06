// components/WelcomeBanner.jsx
import { getGreeting, formatDate} from './MerchHelpers'


function MerchWelcomeBanner({ name = "there" }) {
  return (
    <section className="animate-fade-up">
      <div className="mb-2.5 text-[11.5px] font-medium uppercase tracking-[0.13em] text-[#b89a5a]">
        ☀️ &nbsp;{formatDate()}
      </div>
      <h1 className="mb-[7px] font-['Cormorant_Garamond'] text-[clamp(32px,6vw,52px)] font-light leading-[1.08] text-[#2c2416]">
        {getGreeting()},<br />
        <em className="italic text-[#3d6b47]">{name}</em>
      </h1>
      <p className="text-[clamp(13px,2vw,15px)] font-light text-[#4a3f30] opacity-75">
        Here&apos;s what&apos;s happening with your store today.
      </p>
    </section>
  );
}

export default MerchWelcomeBanner
