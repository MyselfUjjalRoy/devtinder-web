import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="relative z-[100] w-full border-b border-white/[0.05] bg-[#050505]/60 backdrop-blur-xl">
      <div className="w-full px-8 h-20 flex items-center justify-between">
        <div className="flex-none">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.3)] group-hover:rotate-12 transition-transform">
              <span className="text-white text-xl font-black italic">DT</span>
            </div>
            <span className="text-2xl font-black text-white tracking-tighter uppercase italic">
              Dev<span className="text-indigo-500">Tinder</span>
            </span>
          </Link>
        </div>

        <div className="flex-none">
          {user && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="group flex items-center gap-3 p-1 pr-4 rounded-2xl border border-white/10 hover:border-indigo-500/50 transition-all bg-black/20"
              >
                <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10">
                  <img
                    alt="user photo"
                    src={
                      user.photoUrl ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[11px] font-black text-white/70 uppercase tracking-widest hidden sm:block">
                  {user.firstName}
                </span>
              </div>

              <ul
                tabIndex={0}
                className="menu dropdown-content mt-4 z-[1] p-2 shadow-2xl bg-[#0A0A0C] border border-white/10 rounded-2xl w-60 backdrop-blur-3xl"
              >
                <li className="menu-title px-4 py-2 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">
                  Master Menu
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="py-3 px-4 text-white font-bold rounded-xl hover:bg-white/5 transition-all"
                  >
                    Edit Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/connections"
                    className="py-3 px-4 text-white font-bold rounded-xl hover:bg-white/5 transition-all"
                  >
                    Connections
                  </Link>
                </li>
                <li>
                  <Link
                    to="/requests"
                    className="py-3 px-4 text-white font-bold rounded-xl hover:bg-white/5 transition-all"
                  >
                    Requests
                  </Link>
                </li>
                <div className="h-[1px] bg-white/5 my-2 mx-2"></div>
                <li>
                  <a
                    onClick={handleLogout}
                    className="py-3 px-4 text-red-500 font-black uppercase text-[10px] tracking-widest hover:bg-red-500/10 transition-all cursor-pointer"
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
