import React from "react";
import SignUpForm from "@/components/Auth/SignUpForm";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const SignUpPage = () => {
  return (
    <>
      <Breadcrumb pageName="Sign Up" />
      <div className="flex justify-center items-center h-screen">
        <SignUpForm />
      </div>
    </>
  );
};

export default SignUpPage;