import React, { useEffect, useState } from 'react';
import { MdOutlineDownloading } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { stringify } from 'csv-stringify';
import { toast } from 'react-toastify';

const Expenses = () => {
  const { expenses } = useSelector(state => state.expenseSlice);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(0);
    if (expenses?.length > 0) {
      expenses.forEach(item => {
        setTotal(prev => prev + Number(item.amount));
      });
    }
  }, [expenses]);

  const generateCSV = () => {
    const dataWithoutId = expenses.map(({ id, ...rest }) => rest);
    stringify(dataWithoutId, (err, output) => {
      if (err) {
        console.error(err);
        return;
      }

      const blob = new Blob([output], { type: 'text/csv' });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Expenses.csv';

      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    });
  };

  const proMembership = () => {
    toast.info('Thanks for buying Membership!');
  };

  return (
    <div className="w-full md:w-1/3 lg:w-1/2 mx-auto">
      <div className="text-xl p-10 rounded font-semibold flex justify-center items-center gap-x-10">
        <h3 className="text-[#4A0906] m-3 italic">
          Total Amount :
          <span className="text-violet-500 font-sans px-2">
            {total.toFixed(2)}
          </span>
          INR
        </h3>
        <h3
          className="hover:text-[#4A0906] text-white flex gap-x-3 ring-4 ring-indigo-600 rounded-full bg-indigo-500 hover:bg-indigo-200 px-3 py-2 cursor-pointer"
          onClick={generateCSV}
        >
          Download
          <MdOutlineDownloading
            size={30}
            className="motion-safe:animate-bounce"
          />
        </h3>
        <button
          className="text-[gold] ring-4 ring-emerald-500 px-3 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 p-2 cursor-pointer"
          onClick={proMembership}
        >
          Buy Premium
        </button>
      </div>
    </div>
  );
};

export default Expenses;
