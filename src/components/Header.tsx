import type { FC } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AiOutlineEuro } from "react-icons/ai";
import { LuLogOut } from "react-icons/lu";
import { useAuth } from "../hooks/useAuth";
import { useAppDispatch } from "../store/hooks";
import { logout } from "../store/user/userSlice";
import { removeTokenFromLocalStorage } from "../helpers/localstarage.helper";
import { toast } from "react-toastify";

const Header: FC = () => {
  const dispath = useAppDispatch();
  const isAuth = useAuth();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispath(logout());
    removeTokenFromLocalStorage("token");
    toast.success("You logged out.");
    navigate("/");
  };

  return (
    <header className="flex items-center border-b border-slate-700/50 bg-slate-800/80 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
      {/* Логотип */}
      <Link to="/" className="group flex items-center gap-3 transition-transform duration-200 hover:scale-105">
        <div className="rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 p-2 shadow-lg shadow-cyan-500/20">
          <AiOutlineEuro size={32} className="text-white" />
        </div>
        <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-xl font-bold text-transparent">
          CashFlow
        </span>
      </Link>

      {/* Навигация */}
      {isAuth && (
        <nav className="mr-8 ml-auto">
          <ul className="flex items-center gap-8">
            <li>
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-xl px-4 py-2 font-medium transition-all duration-300 ${
                    isActive
                      ? "border border-cyan-500/30 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-cyan-300 shadow-lg shadow-cyan-500/10"
                      : "border border-transparent text-white/60 hover:bg-slate-700/50 hover:text-white"
                  }`
                }
              >
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/transactions"}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-xl px-4 py-2 font-medium transition-all duration-300 ${
                    isActive
                      ? "border border-cyan-500/30 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-cyan-300 shadow-lg shadow-cyan-500/10"
                      : "border border-transparent text-white/60 hover:bg-slate-700/50 hover:text-white"
                  }`
                }
              >
                <span>Transactions</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/categories"}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-xl px-4 py-2 font-medium transition-all duration-300 ${
                    isActive
                      ? "border border-cyan-500/30 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-cyan-300 shadow-lg shadow-cyan-500/10"
                      : "border border-transparent text-white/60 hover:bg-slate-700/50 hover:text-white"
                  }`
                }
              >
                <span>Categories</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      )}

      {/* Кнопки авторизации */}
      {isAuth ? (
        <button
          className="flex items-center gap-3 rounded-xl border border-red-500/30 bg-gradient-to-r from-red-500/10 to-orange-500/10 px-6 py-3 font-medium text-red-300 shadow-lg shadow-red-500/10 transition-all duration-300 hover:scale-105 hover:border-red-400/40 hover:from-red-500/20 hover:to-orange-500/20 hover:text-red-200 hover:shadow-red-500/20"
          onClick={logoutHandler}
        >
          <span>Log Out</span>
          <LuLogOut size={18} className="transition-transform duration-300 hover:rotate-90" />
        </button>
      ) : (
        <Link
          className="ml-auto flex transform items-center gap-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-3 font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-105 hover:from-emerald-400 hover:to-cyan-400 hover:shadow-cyan-500/30"
          to={"auth"}
        >
          <span>Log in / Sign In</span>
        </Link>
      )}
    </header>
  );
};

export default Header;
