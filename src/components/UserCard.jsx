const UserCard = ({ user }) => {
  if (!user) return null;
  const { firstName, lastName, photoUrl, age, gender, about } = user;

  const defaultImage =
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop";

  return (
    /* Increased Width to 440px and Height to 75vh */
    <div className="relative w-[340px] sm:w-[440px] h-[75vh] min-h-[600px] bg-[#050505] rounded-[3.5rem] shadow-[0_0_60px_-12px_rgba(79,70,229,0.4)] border border-white/10 overflow-hidden group transition-all duration-500 hover:shadow-indigo-500/30 hover:-translate-y-2">
      <div className="absolute inset-0 z-0">
        <img
          src={photoUrl || defaultImage}
          alt="profile"
          className="w-full h-full object-cover block transition-transform duration-[2000ms] ease-out group-hover:scale-110"
          onError={(e) => {
            e.target.src = defaultImage;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10"></div>
      </div>

      {/* Shine Effect Overlay */}
      <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute -inset-[100%] bg-gradient-to-tr from-transparent via-white/5 to-transparent rotate-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1500ms] ease-in-out"></div>
      </div>

      <div className="absolute bottom-0 left-0 w-full p-8 sm:p-10 z-30 flex flex-col gap-5">
        {(age || gender) && (
          <div className="flex gap-3 items-center transform transition-transform duration-500 group-hover:translate-x-1">
            {age && (
              <span className="backdrop-blur-2xl bg-indigo-600/90 text-white text-[11px] font-black px-5 py-2 rounded-2xl uppercase tracking-tighter shadow-lg">
                {age} Years
              </span>
            )}
            {gender && (
              <span className="backdrop-blur-2xl bg-white/10 border border-white/20 text-white text-[11px] font-black px-5 py-2 rounded-2xl uppercase tracking-widest">
                {gender}
              </span>
            )}
          </div>
        )}

        <div className="flex flex-col transform transition-all duration-500 group-hover:translate-y-[-4px]">
          <h2 className="text-5xl sm:text-6xl font-black text-white tracking-tighter uppercase leading-none drop-shadow-2xl">
            {firstName}
          </h2>
          {lastName && (
            <span className="text-indigo-400 font-black text-base uppercase tracking-[0.4em] mt-2 opacity-90">
              {lastName}
            </span>
          )}
        </div>

        {about && (
          <div className="max-h-24 overflow-hidden border-l-2 border-indigo-500/50 pl-4">
            <p className="text-white/70 text-sm leading-relaxed font-medium italic">
              "{about}"
            </p>
          </div>
        )}

        <div className="flex gap-4 mt-4">
          <button className="flex-1 h-16 rounded-[1.5rem] bg-red-500/10 border border-red-500/20 text-red-500 text-[11px] font-black uppercase tracking-widest transition-all duration-300 hover:bg-red-500 hover:text-white hover:shadow-red-500/40 active:scale-95 flex items-center justify-center gap-2 group/ignore">
            Ignore
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <button className="relative flex-[2] h-16 rounded-[1.5rem] bg-indigo-600 text-white text-[12px] font-black uppercase tracking-[0.3em] transition-all duration-300 hover:bg-white hover:text-indigo-600 active:scale-95 group/btn overflow-hidden">
            <span className="relative z-10 flex items-center justify-center gap-3">
              Connect
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
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* Decorative Border */}
      <div className="absolute inset-0 border border-white/5 rounded-[3.5rem] pointer-events-none z-40 group-hover:border-indigo-500/20 transition-colors"></div>
    </div>
  );
};

export default UserCard;