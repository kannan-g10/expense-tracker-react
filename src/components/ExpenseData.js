import React, { useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';

import {
  deleteExpense,
  fetchExpenses,
  setEditValues,
} from '../redux/features/expenseSlice';
import { auth } from '../config/firebase-config';

const ExpenseData = () => {
  const {
    expenses,
    loading,
    description: updatingDescription,
  } = useSelector(state => state.expenseSlice);

  const dispatch = useDispatch();

  const handleEdit = id => {
    const editingExpense = expenses.find(expense => expense.id === id);
    if (editingExpense) {
      dispatch(
        setEditValues({
          id,
          description: editingExpense.description,
          amount: editingExpense.amount,
          category: editingExpense.category,
        })
      );
    }
  };

  const handleDelete = id => {
    dispatch(deleteExpense({ userId: auth.currentUser.uid, id }));
  };

  useEffect(() => {
    dispatch(fetchExpenses(auth.currentUser.uid));
  }, [updatingDescription]);

  if (loading) {
    return (
      <p className="text-center pb-20 text-violet-500 text-xl">Loading...</p>
    );
  }

  // Render expenses after they are fetched
  return (
    <div className="w-full md:w-2/3 mx-auto">
      {/* Table Header */}
      <div className="flex justify-between bg-[brown] text-white text-xl font-bold px-10 py-3">
        <div className="w-1/4">Description</div>
        <div className="w-1/4">Amount</div>
        <div className="w-1/4">Category</div>
        <div className="w-1/4"></div>
      </div>
      {/* Table Row */}
      {!expenses?.length > 0 ? (
        <div className="text-center text-3xl py-10 font-bold text-red-400">
          No Expenses To Display!
        </div>
      ) : (
        <div className="pb-10">
          {expenses?.map((spend, index) => {
            if (spend == null) return null;
            const key = spend.id || index;
            return (
              <div key={key}>
                <div className="flex justify-between items-center text-lg my-2 text-slate-800 font-semibold px-10 py-4 bg-[#e9c7c7]">
                  <div className="w-1/4">{spend.description}</div>
                  <div className="w-1/4">{spend.amount}</div>
                  <div className="w-1/4">{spend.category}</div>
                  <div className="w-1/4 flex gap-x-3">
                    <button
                      className="bg-green-500 hover:bg-green-500/70 rounded-lg px-5 py-2 text-white"
                      onClick={() => handleEdit(spend.id)}
                    >
                      <FaEdit size={20} />
                    </button>
                    <button
                      className="bg-rose-500 hover:bg-rose-500/70 rounded-lg px-5 py-2 text-white"
                      onClick={() => handleDelete(spend.id)}
                    >
                      <RiDeleteBin6Fill size={20} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ExpenseData;
