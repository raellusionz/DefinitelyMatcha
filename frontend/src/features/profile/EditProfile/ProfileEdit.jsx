import { useMemo, useState } from "react";
import getCustomerAccountDetail

const ProfileEditPage = () => {
  const [fullName, setFullName] = useState("Elena Rose");
  const [phone, setPhone] = useState("+1 (555) 924-1283");
  const [password, setPassword] = useState("••••••••••••");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const cust_id = 1

//   const loadProfile = async() => {
//     try{
//         const fetchProfile = await 

//     } catch(error)
//   }

  const strength = useMemo(() => {
    if (!password || password === "••••••••••••") {
      return {
        score: 0,
        label: "",
        color: "transparent",
        visible: false,
      };
    }

    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const colors = {
      1: "#dc2626",
      2: "#ea580c",
      3: "#16a34a",
      4: "#052e16",
    };

    const labels = {
      1: "Weak",
      2: "Fair",
      3: "Good",
      4: "Strong",
    };

    return {
      score,
      label: labels[score] || "",
      color: colors[score] || "transparent",
      visible: true,
    };
  }, [password]);

  const matchMessage = useMemo(() => {
    if (!confirmPassword) {
      return {
        text: "",
        color: "transparent",
      };
    }

    if (password === confirmPassword) {
      return {
        text: "Passwords match",
        color: "#16a34a",
      };
    }

    return {
      text: "Passwords do not match",
      color: "#dc2626",
    };
  }, [password, confirmPassword]);

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log({
      fullName,
      email: "elena.rose@ritual.com",
      phone,
      password,
      confirmPassword,
    });
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-12 font-body text-stone-900">

      <main className="mx-auto max-w-[600px] px-6 pt-12">
        {/* Profile Photo */}
        <section className="mb-12 flex flex-col items-center">
          <div className="group relative">
            <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-stone-100 shadow-sm">
              <img
                className="h-full w-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3RWnoMZKS359H64LEuXaf3trI1RBG6X8CHsHSesXFtbTPdkcQIT9QBMvT5Znu2k0_5HJjMRUuVHEycYgqzi4NomRk_Y4_E0oW2keZ5O9HIEe7CeY2BDwlhSxlbcTPvtf8nXC7ay_uPpjT54m4u_zp4_Y6VP4g-iYRHoNCNp9estvGXGjH_dT5FQcTLKz5w7j1Jxs-TTKLYO_zhr3-4iOpQJaWAjrTN76r4Iht3Gmdr6akqVFDAU5xitQx_fsNHuPFhNhF5Nz798U_"
                alt="Profile"
              />
            </div>

            <button
              type="button"
              className="absolute bottom-0 right-0 flex items-center justify-center rounded-full bg-green-950 p-2 text-white shadow-lg transition-colors duration-200 hover:bg-green-900"
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                edit
              </span>
            </button>
          </div>

          {/* <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-green-950">
            Ceremonial Member
          </p> */}
        </section>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="space-y-2">
            <label className="ml-1 block text-xs font-semibold uppercase tracking-widest text-green-950">
              Full Name
            </label>

            <input
              className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition-all duration-200 focus:border-green-950 focus:ring-2 focus:ring-green-950/10"
              placeholder="Enter your name"
              type="text"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
            />
          </div>

          {/* userlogin */}
          <div className="space-y-2 opacity-60">
            <label className="ml-1 block text-xs font-semibold uppercase tracking-widest text-green-950">
              User Login
            </label>

            <div className="flex w-full items-center justify-between rounded-lg border border-stone-300/40 bg-stone-100 px-4 py-3 text-stone-900">
              <span>elena.rose@ritual.com</span>
              <span className="material-symbols-outlined text-[18px]">
                lock
              </span>
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2 opacity-60">
            <label className="ml-1 block text-xs font-semibold uppercase tracking-widest text-green-950">
              Email Address
            </label>

            <div className="flex w-full items-center justify-between rounded-lg border border-stone-300/40 bg-stone-100 px-4 py-3 text-stone-900">
              <span>elena.rose@ritual.com</span>
              <span className="material-symbols-outlined text-[18px]">
                lock
              </span>
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="ml-1 block text-xs font-semibold uppercase tracking-widest text-green-950">
              Password
            </label>

            <div className="relative">
              <input
                className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 pr-24 text-stone-900 outline-none transition-all duration-200 focus:border-green-950 focus:ring-2 focus:ring-green-950/10"
                placeholder="Enter password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />

              <div className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-2">
                <button
                  className="text-xs font-semibold uppercase tracking-tight text-green-950/60 hover:text-green-950"
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {strength.visible && (
              <div className="space-y-1.5">
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4].map((segment) => (
                    <div
                      key={segment}
                      className="h-[3px] flex-1 rounded-full transition-colors duration-200"
                      style={{
                        background:
                          segment <= strength.score
                            ? strength.color
                            : "rgba(20, 83, 45, 0.1)",
                      }}
                    />
                  ))}
                </div>

                <p
                  className="ml-0.5 text-[10px] font-semibold uppercase tracking-widest"
                  style={{ color: strength.color }}
                >
                  {strength.label}
                </p>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="ml-1 block text-xs font-semibold uppercase tracking-widest text-green-950">
              Confirm Password
            </label>

            <div className="relative">
              <input
                className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 pr-24 text-stone-900 outline-none transition-all duration-200 focus:border-green-950 focus:ring-2 focus:ring-green-950/10"
                placeholder="Re-enter password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />

              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <button
                  className="text-xs font-semibold uppercase tracking-tight text-green-950/60 hover:text-green-950"
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((current) => !current)
                  }
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <p
              className="ml-0.5 min-h-[14px] text-[10px] font-semibold uppercase tracking-widest"
              style={{ color: matchMessage.color }}
            >
              {matchMessage.text}
            </p>
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <label className="ml-1 block text-xs font-semibold uppercase tracking-widest text-green-950">
              Phone Number
            </label>

            <input
              className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition-all duration-200 focus:border-green-950 focus:ring-2 focus:ring-green-950/10"
              placeholder="+1 (000) 000-0000"
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>

          {/* Preferences */}
          <div className="pt-3">
            <div className="rounded-xl border border-green-950/5 bg-stone-100 p-6">
              <h3 className="mb-4 font-serif text-2xl font-medium text-green-950">
                Tea Ritual Preferences
              </h3>

              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-green-950/5 px-3 py-1 text-[10px] font-semibold text-green-950">
                  CEREMONIAL GRADE
                </span>
                <span className="rounded-full bg-green-950/5 px-3 py-1 text-[10px] font-semibold text-green-950">
                  OAT MILK
                </span>
                <span className="rounded-full bg-green-950/5 px-3 py-1 text-[10px] font-semibold text-green-950">
                  NO SWEETENER
                </span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-12 pt-6">
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-950 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-900 active:translate-y-0"
            >
              <span>Save Changes</span>
              <span className="material-symbols-outlined">check_circle</span>
            </button>

            <button
              type="button"
              className="mt-4 w-full py-2 text-xs font-semibold uppercase tracking-widest text-green-950/60 transition-colors hover:text-red-700"
            >
              Deactivate Account
            </button>
          </div>
        </form>
      </main>

      {/* Mobile Bottom Progress */}
      <div className="fixed bottom-8 left-1/2 w-32 -translate-x-1/2 rounded-full bg-stone-200/80 px-4 py-1 shadow-sm backdrop-blur-md md:hidden">
        <div className="relative h-1 overflow-hidden rounded-full bg-green-950/10">
          <div className="absolute h-full w-3/4 rounded-full bg-green-950" />
        </div>
      </div>
    </div>
  );
}

export default ProfileEditPage