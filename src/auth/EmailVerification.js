import React from 'react';
import ReactDOM from 'react-dom';
import { auth } from '../config/firebase-config';
import { sendEmailVerification } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const EmailVerificationModal = () => {
  const user = auth.currentUser;
  const navigate = useNavigate();

  const emailVerificationHandler = async () => {
    try {
      await sendEmailVerification(user);
      toast.info('Email sent successfully');
      toast.success('Check Your Mailbox To Verify!');
      navigate('/');
    } catch (err) {
      toast.error('Something went wrong!');
      console.error(err);
    }
  };

  return (
    <>
      {ReactDOM.createPortal(
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-90 z-50">
          <div className="bg-white p-8 w-1/3 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              Click Verify To Verify You Email
            </h2>
            <div className="flex justify-end">
              <button
                onClick={() => navigate('/register')}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center mr-2"
              >
                Cancel
              </button>
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded inline-flex items-center"
                onClick={emailVerificationHandler}
              >
                Verify
              </button>
            </div>
          </div>
        </div>,
        document.getElementById('overlays')
      )}
    </>
  );
};

export default EmailVerificationModal;
