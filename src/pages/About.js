import React from 'react';

const About = () => {
  return (
    <div className="text-center bg-rose-100 dark:bg-[#021F34] dark:text-green-50 p-10">
      <h1 className="text-5xl font-bold pb-10 text-[brown] dark:text-cyan-500">
        About Us
      </h1>
      <h1 className="text-3xl font-bold pt-1 pb-10 text-[brown] dark:text-cyan-500">
        Welcome to Our Expense Tracker App
      </h1>
      <p className="italic text-xl text-wrap w-2/3 mx-auto text-slate-600 dark:text-cyan-100">
        we understand the importance of managing your finances effectively. Our
        Expense Tracker App is designed to simplify the process of tracking your
        expenses, helping you stay organized and in control of your financial
        health.
      </p>
      <h1 className="text-2xl font-bold p-10 text-[brown] dark:text-cyan-500">
        Our Mission
      </h1>
      <p className="italic text-xl w-2/3 mx-auto text-wrap text-slate-600 dark:text-cyan-100">
        Our mission is to empower individuals and families to make informed
        financial decisions by providing them with a user-friendly tool to track
        their expenses. We believe that by gaining insight into your spending
        habits, you can better allocate your resources, save for the future, and
        achieve your financial goals.
      </p>
      <h1 className="text-3xl font-bold p-10 text-[brown] dark:text-cyan-500">
        Key Features
      </h1>
      <ul className="text-start w-1/2 md:w-1/3 mx-auto italic text-xl text-wrap text-slate-600 dark:text-cyan-100">
        <li className="list-disc mx-28">Simple and Intuitive Interface</li>
        <li className="list-disc mx-28">Expense Categories</li>
        <li className="list-disc mx-28">Budget Tracking</li>
        <li className="list-disc mx-28">Insightful Reports</li>
        <li className="list-disc mx-28">Secure and Private</li>
      </ul>
      <h1 className="text-3xl font-bold p-10 text-[brown] dark:text-cyan-500">
        Get Started
      </h1>
      <p className="italic text-xl w-2/3 mx-auto text-wrap text-slate-600 dark:text-cyan-100">
        Ready to take control of your finances? Sign up for an account and start
        tracking your expenses today! Whether you're saving for a vacation,
        planning for retirement, or simply trying to manage your day-to-day
        expenses, our Expense Tracker App is here to help you achieve your
        financial goals
      </p>
    </div>
  );
};

export default About;
