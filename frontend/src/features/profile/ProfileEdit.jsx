import { useMemo, useState, useEffect } from "react";
import accountService from "../../api/accountService";
import { useUser } from "../../context/userContext";

const countryOptions = [
  { label: "SG +65", value: "+65" },
  { label: "MY +60", value: "+60" },
  { label: "ID +62", value: "+62" },
  { label: "TH +66", value: "+66" },
  { label: "PH +63", value: "+63" },
  { label: "US/CA +1", value: "+1" },
];

const countryCodes = countryOptions.map((country) => country.value);

const splitPhoneNumber = (savedNumber = "") => {
  const matchedCountryCode = countryCodes.find((code) =>
    savedNumber.startsWith(code)
  );

  if (matchedCountryCode) {
    return {
      countryCode: matchedCountryCode,
      phoneNumber: savedNumber.slice(matchedCountryCode.length),
    };
  }

  return {
    countryCode: "+65",
    phoneNumber: savedNumber,
  };
};

const ProfileEditPage = () => {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [countryState, setCountryState] = useState("+65");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(true);  // Loading state for handling fetch delays
  const [error, setError] = useState(null); 
  const { userId: cust_id } = useUser();

  //const cust_id = 1

  const loadProfile = async() => {
    try{
      console.log(cust_id)
      const fetchProfile = await accountService.getCustomerAccountDetailsPg(cust_id)
      const fetchedProfileData = fetchProfile.data.singleCustomerInfo
      const { countryCode, phoneNumber } = splitPhoneNumber(
        fetchedProfileData.cust_number
      );
      setCountryState(countryCode);
      setPhone(phoneNumber || "");
      setFullName(fetchedProfileData.cust_name)
      setUserName(fetchedProfileData.user_name);
      setEmail(fetchedProfileData.cust_email);

      console.log(fetchedProfileData)

    } catch(error) {
      console.error(error);
      setError("Failed to fetch profile data");
    }finally{
      setLoading(false);
    }
      
  }

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const fullPhoneNumber = `${countryState}${phone}`;
    try{
      const response = await accountService.updateCustomerAccountPg(
        cust_id,
        fullName,
        fullPhoneNumber,
        confirmPassword
      );

      console.log(response.data);
      alert("Profile updated successfully");
    } catch (error) {
      console.error(error);
      setError("Failed to update profile");
    }
    
  };
  
  useEffect(() => {
    if (!cust_id) return;
    loadProfile()
  }, [cust_id])

  if (loading) return (
      <div className="flex flex-col items-center
          justify-center h-48 gap-3">
        <div className="w-9 h-9 rounded-full
          border-[2.5px] border-transparent
          border-t-gray-900 border-b-gray-200
          animate-spin" />
        <p className="text-sm text-gray-400">
          Loading Profile...
        </p>
      </div>
  );
  if (error) {
    return (
      <div className="min-h-screen bg-stone-50 font-body text-stone-900">
        <main className="mx-auto max-w-xl px-6 pt-12">
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        </main>
      </div>
    );
  }

  return (
    
    <div className="min-h-screen bg-stone-50 mt-2 pb-24 font-body text-stone-900">
      <style>
      {`
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }

        .font-body {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .font-serif {
          font-family: 'Noto Serif', serif;
        }
      `}
    </style>

      
      <main className="mx-auto w-full max-w-xl px-6 pt-6">
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
              <span>{userName}</span>
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
              <span>{email}</span>
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

            <div className="flex gap-2">
              <select
                className="w-[130px] rounded-lg border border-stone-300 bg-white px-3 py-3 text-stone-900 outline-none transition-all duration-200 focus:border-green-950 focus:ring-2 focus:ring-green-950/10"
                value={countryState}
                onChange={(event) => setCountryState(event.target.value)}
              >
                <option value="+65">SG +65</option>
                <option value="+60">MY +60</option>
                <option value="+62">ID +62</option>
                <option value="+66">TH +66</option>
                <option value="+63">PH +63</option>
                <option value="+1">US/CA +1</option>
              </select>

              <input
                className="flex-1 rounded-lg border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition-all duration-200 focus:border-green-950 focus:ring-2 focus:ring-green-950/10"
                placeholder="81234567"
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
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

            
          </div>
        </form>
      </main>

      
    </div>
  );
}

export default ProfileEditPage



// {/* Preferences */}
//           <div className="pt-3">
//             <div className="rounded-xl border border-green-950/5 bg-stone-100 p-6">
//               <h3 className="mb-4 font-serif text-2xl font-medium text-green-950">
//                 Tea Ritual Preferences
//               </h3>

//               <div className="flex flex-wrap gap-2">
//                 <span className="rounded-full bg-green-950/5 px-3 py-1 text-[10px] font-semibold text-green-950">
//                   CEREMONIAL GRADE
//                 </span>
//                 <span className="rounded-full bg-green-950/5 px-3 py-1 text-[10px] font-semibold text-green-950">
//                   OAT MILK
//                 </span>
//                 <span className="rounded-full bg-green-950/5 px-3 py-1 text-[10px] font-semibold text-green-950">
//                   NO SWEETENER
//                 </span>
//               </div>
//             </div>
//           </div>

{/* <button
              type="button"
              className="mt-4 w-full py-2 text-xs font-semibold uppercase tracking-widest text-green-950/60 transition-colors hover:text-red-700"
            >
              Deactivate Account
            </button> */}