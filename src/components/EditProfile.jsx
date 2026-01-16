import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "./../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

function EditProfile({ user }) {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");

  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const dispatch = useDispatch();

  const saveProfile = async () => {
    // 1. Prepare for request
    setError("");
    setShowErrorToast(false);
    setShowToast(false); // Ensure success toast is hidden if clicking again
    setIsSaving(true);

    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );

      // 2. RE-SYNC REDUX
      dispatch(addUser(res?.data?.data));

      // 3. ACTUAL SUCCESS: Show toast ONLY after successful response
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      // 4. ERROR HANDLING
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data ||
        "Connection lost. Please try again.";
      setError(errorMessage);
      setShowErrorToast(true);
      setTimeout(() => setShowErrorToast(false), 5000);
    } finally {
      setIsSaving(false);
    }
  };

  const inputStyle =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-base focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-white/10";
  const labelStyle =
    "text-[10px] font-bold text-indigo-400 uppercase tracking-widest ml-1 mb-1 block";

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden py-4 relative bg-[#030303]">
      {/* SUCCESS TOAST (Triggers only after API response) */}
      {showToast && (
        <div className="fixed top-28 left-0 right-0 flex justify-center z-[100000] pointer-events-none px-4">
          <div className="bg-[#111] border border-white/10 px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-4 animate-[toastSlideDown_0.3s_cubic-bezier(0.18,0.89,0.32,1.28)]">
            <div className="bg-green-500 p-1.5 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span className="text-sm font-bold text-white tracking-tight">
              Profile saved successfully
            </span>
          </div>
        </div>
      )}

      {/* ERROR TOAST */}
      {showErrorToast && (
        <div className="fixed top-28 left-0 right-0 flex justify-center z-[100001] pointer-events-none px-4">
          <div className="bg-[#1a0a0a] border border-red-500/30 px-6 py-3 rounded-2xl shadow-[0_0_30px_rgba(239,68,68,0.2)] flex items-center gap-4 animate-[toastSlideDown_0.3s_ease-out]">
            <div className="bg-red-500 p-1.5 rounded-full">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-red-400 leading-tight">
                Update Failed
              </span>
              <span className="text-[11px] text-white/70">{error}</span>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-4xl flex flex-col lg:flex-row items-center justify-center gap-12 px-6">
        <div className="w-full lg:w-1/2 flex flex-col z-10">
          <header className="mb-6">
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter">
              User{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
                Profile
              </span>
            </h2>
            <div className="h-1 w-12 bg-gradient-to-r from-indigo-600 to-purple-600 mt-2 rounded-full"></div>
          </header>

          <div className="space-y-4">
            {/* Form Inputs... */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelStyle}>First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={inputStyle}
                />
              </div>
              <div>
                <label className={labelStyle}>Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={inputStyle}
                />
              </div>
            </div>

            <div>
              <label className={labelStyle}>Photo URL</label>
              <input
                type="text"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className={inputStyle}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelStyle}>Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className={inputStyle}
                />
              </div>

              <div className="relative">
                <label className={labelStyle}>Gender Identity</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className={`${inputStyle} appearance-none cursor-pointer bg-gradient-to-br from-white/10 to-white/5`}
                >
                  <option value="" className="bg-[#111] text-gray-400">
                    Identify as...
                  </option>
                  <option
                    value="male"
                    className="bg-[#111] text-indigo-400 font-bold"
                  >
                    ♂ Male
                  </option>
                  <option
                    value="female"
                    className="bg-[#111] text-pink-400 font-bold"
                  >
                    ♀ Female
                  </option>
                  <option
                    value="other"
                    className="bg-[#111] text-teal-400 font-bold"
                  >
                    ⚧ Other
                  </option>
                </select>
                <div className="absolute right-4 bottom-3 pointer-events-none text-indigo-400">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className={labelStyle}>Bio / About</label>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className={`${inputStyle} h-24 resize-none`}
              />
            </div>
          </div>

          <button
            onClick={saveProfile}
            disabled={isSaving}
            className="mt-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black uppercase tracking-widest text-xs transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-indigo-500/20 disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {/* PREVIEW SECTION */}
        <div className="hidden lg:flex lg:w-1/2 justify-center items-center">
          <div className="relative scale-[0.65] xl:scale-[0.75] origin-center transition-transform duration-500 ease-out hover:scale-[0.78]">
            <div className="bg-[#111] rounded-[2.5rem] p-1 border border-white/5 shadow-2xl">
              <UserCard
                user={{ firstName, lastName, photoUrl, age, gender, about }}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes toastSlideDown {
          from { transform: translateY(-40px) scale(0.9); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default EditProfile;
