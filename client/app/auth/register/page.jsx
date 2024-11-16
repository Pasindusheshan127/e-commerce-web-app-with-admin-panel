"use client";
import CommonForm from "@/components/common/CommonForm";
import { registerFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { registerUser } from "@/redux/features/auth-slice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);

  const dispatch = useDispatch();

  const router = useRouter();

  const { toast } = useToast();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.massage,
          description: "Friday, February 10, 2023 at 5:57 PM",
        });
        router.push("/auth/login");
      }
    });
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
            <p className="font-medium text-primary hover:underline-offset-0 *:">
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
