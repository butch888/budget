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
    <header className="flex items-center border-b border-slate-700/50 bg-slate-800/80 p-3 sm:p-4 md:p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
      {/* Логотип */}
      <Link to="/" className="group flex items-center gap-2 sm:gap-3 transition-transform duration-200 hover:scale-105">
        <div className="rounded-xl sm:rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 p-1.5 sm:p-2 shadow-lg shadow-cyan-500/20">
          <AiOutlineEuro size={24} className="text-white sm:w-8 sm:h-8" />
        </div>
        <span className="hidden bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-lg sm:text-xl font-bold text-transparent sm:block">
          CashFlow
        </span>
      </Link>

      {/* Навигация */}
      {isAuth && (
        <nav className="mr-2 ml-auto sm:mr-4 md:mr-8">
          <ul className="flex items-center gap-1 sm:gap-2 md:gap-4 lg:gap-8">
            <li>
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  `flex items-center gap-1 sm:gap-2 rounded-lg sm:rounded-xl px-1.5 sm:px-2 md:px-4 py-1.5 sm:py-2 text-sm sm:text-base font-medium transition-all duration-300 ${
                    isActive
                      ? "border border-cyan-500/30 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-cyan-300 shadow-lg shadow-cyan-500/10"
                      : "border border-transparent text-white/60 hover:bg-slate-700/50 hover:text-white"
                  }`
                }
              >
                <span className="hidden md:block">Home</span>
                <svg className="h-4 w-4 sm:h-5 sm:w-5 md:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/transactions"}
                className={({ isActive }) =>
                  `flex items-center gap-1 sm:gap-2 rounded-lg sm:rounded-xl px-1.5 sm:px-2 md:px-4 py-1.5 sm:py-2 text-sm sm:text-base font-medium transition-all duration-300 ${
                    isActive
                      ? "border border-cyan-500/30 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-cyan-300 shadow-lg shadow-cyan-500/10"
                      : "border border-transparent text-white/60 hover:bg-slate-700/50 hover:text-white"
                  }`
                }
              >
                <span className="hidden md:block">Transactions</span>
                <svg className="h-4 w-4 sm:h-5 sm:w-5 md:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/categories"}
                className={({ isActive }) =>
                  `flex items-center gap-1 sm:gap-2 rounded-lg sm:rounded-xl px-1.5 sm:px-2 md:px-4 py-1.5 sm:py-2 text-sm sm:text-base font-medium transition-all duration-300 ${
                    isActive
                      ? "border border-cyan-500/30 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-cyan-300 shadow-lg shadow-cyan-500/10"
                      : "border border-transparent text-white/60 hover:bg-slate-700/50 hover:text-white"
                  }`
                }
              >
                <span className="hidden md:block">Categories</span>
                <svg className="h-4 w-4 sm:h-5 sm:w-5 md:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
              </NavLink>
            </li>
          </ul>
        </nav>
      )}

      {/* Кнопки авторизации */}
      {isAuth ? (
        <button
          className="flex items-center gap-2 sm:gap-3 rounded-lg sm:rounded-xl border border-red-500/30 bg-gradient-to-r from-red-500/10 to-orange-500/10 px-2 sm:px-3 md:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium text-red-300 shadow-lg shadow-red-500/10 transition-all duration-300 hover:scale-105 hover:border-red-400/40 hover:from-red-500/20 hover:to-orange-500/20 hover:text-red-200 hover:shadow-red-500/20"
          onClick={logoutHandler}
        >
          <span className="hidden md:block">Log Out</span>
          <LuLogOut size={16} className="transition-transform duration-300 hover:rotate-90 sm:w-[18px] sm:h-[18px]" />
        </button>
      ) : (
        <Link
          className="ml-auto flex transform items-center gap-2 sm:gap-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-2 sm:px-3 md:px-8 py-2 sm:py-3 text-sm sm:text-base font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-105 hover:from-emerald-400 hover:to-cyan-400 hover:shadow-cyan-500/30"
          to={"auth"}
        >
          <span className="hidden md:block">Log in / Sign In</span>
          <span className="md:hidden">Login</span>
        </Link>
      )}
    </header>
  );
};

export default Header;
