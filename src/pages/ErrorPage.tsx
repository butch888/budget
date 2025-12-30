import { Link } from "react-router-dom";
import type { FC } from "react";

const ErrorPage: FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="mx-auto max-w-2xl text-center">
        {/* Анимированная иконка */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="flex h-32 w-32 animate-pulse items-center justify-center rounded-3xl border border-red-500/30 bg-gradient-to-r from-red-500/20 to-orange-500/20 shadow-2xl shadow-red-500/20">
              <svg className="h-16 w-16 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <div className="absolute -top-2 -right-2 h-6 w-6 animate-bounce rounded-full bg-red-500"></div>
            <div className="absolute -bottom-2 -left-2 h-4 w-4 animate-bounce rounded-full bg-orange-500 delay-75"></div>
          </div>
        </div>

        {/* Заголовок */}
        <h1 className="mb-6 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-7xl font-bold text-transparent md:text-8xl">
          404
        </h1>

        {/* Подзаголовок */}
        <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Page Not Found</h2>

        {/* Описание */}
        <p className="mx-auto mb-8 max-w-md text-xl leading-relaxed text-gray-400">
          Oops! The page you're looking for seems to have wandered off into the digital void.
        </p>

        {/* Дополнительная информация */}
        <div className="mb-8 flex justify-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-red-400"></div>
            Check the URL
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-orange-400"></div>
            Navigate from home
          </div>
        </div>

        {/* Кнопка возврата */}
        <Link
          to={"/"}
          className="inline-flex transform items-center gap-3 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 px-8 py-4 font-semibold text-white shadow-2xl shadow-cyan-500/20 transition-all duration-200 hover:scale-105 hover:from-emerald-500 hover:to-cyan-500 hover:shadow-cyan-500/30"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span>Back to Home</span>
        </Link>

        {/* Декоративные элементы */}
        <div className="mt-12 flex justify-center gap-4 opacity-50">
          <div className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"></div>
          <div className="h-2 w-2 animate-bounce rounded-full bg-emerald-400 delay-100"></div>
          <div className="h-2 w-2 animate-bounce rounded-full bg-purple-400 delay-200"></div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
