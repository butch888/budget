/* eslint-disable react-hooks/exhaustive-deps */
import { FaTrash, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Form, useLoaderData } from "react-router-dom";
import type { IResponseTransactionLoader, ITransaction } from "../types/types";
import { useEffect, useState } from "react";
import { instance } from "../api/axios.api";
import ReactPaginate from "react-paginate";
import { formatToUSDT } from "../helpers/currencyHelper";

interface ITransactionsTable {
  limit: number;
}

const TransactionTable = ({ limit = 7 }: ITransactionsTable) => {
  const { transactions } = useLoaderData() as IResponseTransactionLoader;

  const [data, setData] = useState<ITransaction[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchTransactions = async (page: number) => {
    const response = await instance.get(`/transactions/pagination?page=${page}&limit=${limit}`);
    setData(response.data);
    setTotalPages(Math.ceil(transactions.length / limit));
  };

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected + 1);
  };

  useEffect(() => {
    fetchTransactions(currentPage);
  }, [currentPage, transactions]);

  return (
    <>
      {/* Пагинация */}
      {totalPages > 1 && (
        <ReactPaginate
          className="mt-4 flex items-center justify-end gap-2"
          pageCount={totalPages}
          activeClassName="bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-lg shadow-cyan-500/20"
          pageLinkClassName="text-white text-sm py-2 px-3 rounded-lg bg-slate-700/50 border border-slate-600/50 hover:bg-slate-600/50 transition-all duration-200"
          previousClassName="text-white py-2 px-3 rounded-lg bg-slate-700/50 border border-slate-600/50 hover:bg-slate-600/50 transition-all duration-200"
          nextClassName="text-white py-2 px-3 rounded-lg bg-slate-700/50 border border-slate-600/50 hover:bg-slate-600/50 transition-all duration-200"
          disabledClassName="text-slate-600 cursor-not-allowed hover:bg-slate-700/50"
          disabledLinkClassName="cursor-not-allowed"
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          onPageChange={handlePageChange}
          previousLabel={<FaChevronLeft className="h-3 w-3" />}
          nextLabel={<FaChevronRight className="h-3 w-3" />}
        />
      )}

      {/* Таблица */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/50 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/50">
                <td className="p-4 text-sm font-semibold tracking-wider text-gray-300 uppercase">#</td>
                <td className="p-4 text-sm font-semibold tracking-wider text-gray-300 uppercase">Title</td>
                <td className="p-4 text-sm font-semibold tracking-wider text-gray-300 uppercase">Amount</td>
                <td className="p-4 text-sm font-semibold tracking-wider text-gray-300 uppercase">Category</td>
                <td className="p-4 text-sm font-semibold tracking-wider text-gray-300 uppercase">Date</td>
                <td className="p-4 text-center text-sm font-semibold tracking-wider text-gray-300 uppercase">Action</td>
              </tr>
            </thead>
            <tbody>
              {data?.length > 0 ? (
                data.map((transaction, index) => (
                  <tr
                    key={transaction.id}
                    className="group border-b border-slate-700/30 transition-colors duration-150 hover:bg-slate-700/30"
                  >
                    <td className="p-4 font-medium text-gray-300">{(currentPage - 1) * limit + index + 1}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-2 w-2 rounded-full ${
                            transaction.type === "income" ? "bg-emerald-400" : "bg-red-400"
                          }`}
                        ></div>
                        <span className="font-medium text-white">{transaction.title}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 font-semibold ${
                          transaction.type === "income"
                            ? "border border-emerald-500/30 bg-emerald-500/20 text-emerald-300"
                            : "border border-red-500/30 bg-red-500/20 text-red-300"
                        }`}
                      >
                        {transaction.type === "income" ? (
                          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                        ) : (
                          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        )}
                        {transaction.type === "income"
                          ? `${formatToUSDT.format(transaction.amount)}`
                          : `${formatToUSDT.format(transaction.amount)}`}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-2 rounded-full border border-slate-600/50 bg-slate-700/50 px-3 py-1 text-sm text-gray-300">
                        {transaction.category?.title || "Other"}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-400">
                      {new Date(transaction.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center">
                        <Form method="DELETE" action="/transactions">
                          <input type="hidden" name="id" value={transaction.id} />
                          <button
                            className="group/delete transform rounded-xl border border-red-500/20 bg-red-500/10 p-2 text-red-300 transition-all duration-200 hover:scale-110 hover:border-red-500/30 hover:bg-red-500/20 hover:text-red-200"
                            title="Delete transaction"
                          >
                            <FaTrash className="h-3 w-3 transition-transform duration-200 group-hover/delete:scale-110" />
                          </button>
                        </Form>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center">
                    <div className="flex flex-col items-center justify-center gap-3 text-gray-400">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-700/50">
                        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold">No transactions found</h3>
                      <p>Start by adding your first transaction</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Информация о пагинации */}
      {data?.length > 0 && (
        <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
          <div>
            Showing {(currentPage - 1) * limit + 1} to {Math.min(currentPage * limit, transactions.length)} of{" "}
            {transactions.length} transactions
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-emerald-400"></div>
              <span>Income</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-red-400"></div>
              <span>Expense</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TransactionTable;
