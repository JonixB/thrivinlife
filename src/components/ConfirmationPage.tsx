import React from 'react';

const ConfirmationPage: React.FC = () => {
  return (
    <div className="m-auto bg-white rounded-lg shadow-xl p-8 max-w-lg w-full">
      <h1 className="text-2xl font-semibold text-gray-800 text-center">Please Check Your Email</h1>
      <p className="mt-4 text-gray-600 text-center">
        We've sent a confirmation email to the address you provided. Please click the link in that email to proceed with setting up your profile. If you don't see the email, check your spam folder or try to log in again to resend the confirmation email.
      </p>
    </div>
  );
};

export default ConfirmationPage;
