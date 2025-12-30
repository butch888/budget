import type { FC } from "react";
import { Form } from "react-router-dom";

interface ICategoryModal {
  type: "POST" | "PATCH";
  id?: number;
  setVisibleModal: (visible: boolean) => void;
}

const CategoryModal: FC<ICategoryModal> = ({ type, id, setVisibleModal }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div
        className="mx-auto w-full max-w-md rounded-3xl border border-slate-700/50 bg-slate-800/90 shadow-2xl shadow-black/40 backdrop-blur-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Form action="/categories" method={type} onSubmit={() => setVisibleModal(false)} className="p-6">
          {/* Заголовок */}
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500">
              {type === "PATCH" ? (
                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{type === "PATCH" ? "Edit Category" : "New Category"}</h2>
              <p className="text-sm text-gray-400">
                {type === "PATCH" ? "Update your category name" : "Create a new spending category"}
              </p>
            </div>
          </div>

          {/* Поле ввода */}
          <div className="mb-6">
            <label htmlFor="title" className="mb-3 block text-sm font-medium text-gray-300">
              Category Name
            </label>
            <input
              type="text"
              className="w-full rounded-xl border border-slate-600 bg-slate-700/50 px-4 py-3 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-200 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/50 focus:outline-none"
              name="title"
              placeholder="Enter category name..."
              autoFocus
              required
            />
            <input type="hidden" name="id" value={id} />
          </div>

          {/* Кнопки */}
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 transform rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 px-4 py-3 font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:scale-105 hover:from-emerald-500 hover:to-cyan-500 hover:shadow-cyan-500/30"
            >
              {type === "PATCH" ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Save Changes
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create Category
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setVisibleModal(false)}
              className="flex-1 rounded-xl border border-slate-600 bg-slate-700 px-4 py-3 font-semibold text-gray-200 transition-all duration-200 hover:scale-105 hover:bg-slate-600"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </span>
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CategoryModal;
