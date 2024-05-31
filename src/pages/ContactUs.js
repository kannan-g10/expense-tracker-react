import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import GoBack from '../components/GoBack';

const ContactUs = () => {
  const navigate = useNavigate();
  const handleForm = e => {
    e.preventDefault();
    toast.success('Thank You! We will get back to you soon..');
    navigate('/');
  };

  return (
    <div className="bg-pink-100 dark:bg-[#021F34] h-screen w-full">
      <GoBack />
      <h1 className="text-3xl font-bold p-10 text-[brown] dark:text-cyan-500 text-center">
        Contact Us
      </h1>
      <form
        className="flex flex-col justify-center mx-auto rounded-2xl bg-yellow-200 dark:bg-[#19376D] w-full md:w-1/3 lg:w-1/3 p-10"
        onSubmit={handleForm}
      >
        <input
          type="text"
          placeholder="Full Name"
          required
          className="px-6 py-3 m-3 ring-2 ring-transparent focus:ring-indigo-600 outline-none dark:bg-blue-300 dark:placeholder:text-white"
        />
        <input
          type="email"
          required
          placeholder="Email"
          className="px-6 py-3 m-3 ring-2 ring-transparent focus:ring-indigo-600 outline-none dark:bg-blue-300 dark:placeholder:text-white"
        />
        <input
          type="description"
          required
          placeholder="Subject"
          className="px-6 py-3 m-3 ring-2 ring-transparent focus:ring-indigo-600 outline-none dark:bg-blue-300 dark:placeholder:text-white"
        />
        <textarea
          placeholder="Message.."
          required
          cols={25}
          rows={10}
          className="m-3 px-4 py-2 ring-transparent ring-2 focus:ring-indigo-600 outline-none dark:bg-blue-300 dark:placeholder:text-white"
        />
        <button
          type="submit"
          className="bg-indigo-500 text-lg px-5 py-2 m-3 rounded-md text-white font-bold hover:bg-fuchsia-500 duration-300"
        >
          Submit
        </button>
      </form>
      <p className="text-center m-5 dark:text-cyan-200">
        All Rights Reserved &copy; 2024 @ Kannan G
      </p>
    </div>
  );
};

export default ContactUs;
