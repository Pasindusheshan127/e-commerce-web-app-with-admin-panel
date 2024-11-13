"use client";
import CommonForm from "@/components/common/CommonForm";
import { registerFormControls } from "@/config";
import Link from "next/link";
import { useState } from "react";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: send form data to the server for registration
    console.log(formData);
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <div className="mt-2 flex items-center justify-center">
          <span className="mr-2">Already have an account?</span>
          <Link href="/auth/login">
            <p className="font-medium text-primary hover:underline-offset-0">
              Login
            </p>
          </Link>
        </div>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Register;
