import { useSelector } from "react-redux";

const NavBar = () => {
  const user = useSelector((store) => store.user);

  return (
    <div className="navbar bg-base-300 shadow-sm px-4">
      {/* Left Side: Logo */}
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">🧑‍💻DevTinder</a>
      </div>

      {/* Right Side: Only shows if user exists */}
      <div className="flex-none">
        {user && (
          <div className="flex items-center gap-4">
            <div className="form-control font-medium">
              Welcome, {user.firstName}
            </div>

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full border border-base-content/20">
                  <img
                    alt="user photo"
                    src={
                      user.photoUrl ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a>Profile</a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
