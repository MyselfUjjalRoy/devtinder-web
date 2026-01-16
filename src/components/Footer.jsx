const Footer = () => {
  return (
    <footer className="w-full bg-[#050505] border-t border-white/5 py-6 px-10 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></div>
            <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.4em]">
              DevTinder_Protocol
            </span>
          </div>
        </div>

        <div className="flex gap-8">
          <a className="text-[9px] font-black text-white/20 hover:text-white transition-all cursor-pointer uppercase tracking-widest">
            Github
          </a>
          <a className="text-[9px] font-black text-white/20 hover:text-white transition-all cursor-pointer uppercase tracking-widest">
            Legal
          </a>
        </div>

        <p className="text-[9px] font-bold text-white/10 uppercase tracking-widest">
          © {new Date().getFullYear()} DEVTINDER_CORE
        </p>
      </div>
    </footer>
  );
};

export default Footer;
