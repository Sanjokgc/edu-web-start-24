
import React from "react";
import { SignIn as ClerkSignIn } from "@clerk/clerk-react";

const SignIn = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-education-blue">EduLearn</h1>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>
        <div className="mt-8">
          <ClerkSignIn 
            path="/sign-in"
            routing="path"
            signUpUrl="/sign-up"
            redirectUrl="/"
            appearance={{
              elements: {
                rootBox: "mx-auto w-full",
                card: "shadow-lg rounded-lg p-6"
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
