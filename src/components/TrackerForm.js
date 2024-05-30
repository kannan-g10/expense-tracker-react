import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearEditValues,
  fetchExpenses,
  postExpenses,
  updateExpense,
} from '../redux/features/expenseSlice';
import { auth } from '../config/firebase-config';
import { toast } from 'react-toastify';

const TrackerForm = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const {
    description: updateDescription,
    amount: updateAmount,
    category: updateCategory,
    updateId,
    isEditing,
  } = useSelector(state => state.expenseSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    setDescription(updateDescription);
    setAmount(updateAmount);
    setCategory(updateCategory);

    dispatch(fetchExpenses(auth.currentUser.uid));
  }, [updateAmount]);

  const handleSubmit = async () => {
    if (description == '' || amount == '' || category == '') {
      toast.error('Fill All The Fields!');
      return;
    }

    if (isEditing) {
      dispatch(
        updateExpense({
          userId: auth.currentUser.uid,
          id: updateId,
          newExpense: { description, amount, category },
        })
      );
      dispatch(clearEditValues());
    } else {
      dispatch(
        postExpenses({
          userId: auth.currentUser.uid,
          data: { description, amount, category },
        })
      );
    }

    setAmount('');
    setCategory('');
    setDescription('');
  };

  return (
    <div className="text-center">
      <div>
        <h1 className="text-5xl font-bold text-[#4A0906] dark:text-[#30D5C8]">
          Track Your Expenses
        </h1>
      </div>
      <div className="bg-[#fad3c6] dark:bg-[#053F5E] shadow-xl w-full md:w-1/3 lg:w-1/4 mx-auto m-10 p-10 flex flex-col justify-start rounded-lg">
        <input
          type="text"
          placeholder="Description"
          className="px-6 py-3 m-3 outline-none bg-[#fce4dd] dark:bg-[#115173] placeholder:text-slate-500 dark:placeholder:text-cyan-100/40 dark:text-cyan-200"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          className="px-6 py-3 m-3 outline-none bg-[#fce4dd] dark:bg-[#115173] placeholder:text-slate-500 dark:placeholder:text-cyan-100/40 dark:text-cyan-200 remove-arrow "
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
        <select
          className="bg-[#fce4dd] dark:bg-[#115173] dark:border-none mx-3 my-3 text-lg px-5 py-3 border outline-none dark:text-cyan-200"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option className="text-white dark:text-cyan-100/40">
            --Select category--
          </option>
          <option value="Movie" className="dark:text-cyan-100 dark:bg-cyan-700">
            Movie
          </option>
          <option
            value="Electricity"
            className="dark:text-cyan-100 dark:bg-cyan-700"
          >
            Electricity
          </option>
          <option value="Food" className="dark:text-cyan-100 dark:bg-cyan-700">
            Food
          </option>
          <option
            value="Petrol"
            className="dark:text-cyan-100 dark:bg-cyan-700"
          >
            Petrol
          </option>
        </select>
        <button
          className="px-2 py-3 m-3 rounded-md text-white font-bold text-xl bg-[#4A0906] hover:bg-[#691c18] dark:bg-cyan-500 dark:hover:bg-cyan-500/80"
          onClick={handleSubmit}
        >
          {!isEditing ? 'Add Expense' : 'Update Expense'}
        </button>
      </div>
    </div>
  );
};

export default TrackerForm;
