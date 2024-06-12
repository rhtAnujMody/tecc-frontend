"use client";
import Image from "next/image";
import React, { useState, useTransition } from "react";
import lady from "../../../public/landing-girl.svg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ReloadIcon } from "@radix-ui/react-icons";
import { signUpUser } from "../actions/auth_actions";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ApiError } from "@/types";
import { checkIsEmpty, setLocalData, validateEmail } from "@/lib/utils";
import { USERDATA } from "@/lib/constants";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();

  const showErrorToast = (desc: string) => {
    toast({
      title: "Error",
      description: desc,
      variant: "destructive",
      duration: 2000,
    });
  };

  const callAPI = () => {
    startTransition(async () => {
      if (
        checkIsEmpty(firstName) ||
        checkIsEmpty(lastName) ||
        checkIsEmpty(email) ||
        checkIsEmpty(password) ||
        checkIsEmpty(confirmPassword)
      ) {
        showErrorToast("All fields are mandatory");
        return;
      }

      if (!validateEmail(email)) {
        showErrorToast("Invalid Email");
        return;
      }

      if (password !== confirmPassword) {
        showErrorToast("Passwords and Confirm Password do not match");
        return;
      }

      if (password.length < 6 || confirmPassword.length < 6) {
        showErrorToast("Minimum password lenght should be 6 characters");
        return;
      }

      const response = await signUpUser(
        firstName,
        lastName,
        email,
        password,
        confirmPassword
      );
      if (response.ok) {
        router.push("/login");
        toast({
          title: "Success",
          description: "SignUp Success",
        });
      } else {
        console.log("error", response.error);
        toast({
          title: "Error",
          description:
            typeof response.error === "object"
              ? (response.error as ApiError).detail
              : response.error,
          variant: "destructive",
        });
      }
    });
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };
  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      <Image
        src={lady}
        alt="lady"
        fill={true}
        placeholder="empty"
        priority={false}
        style={{ objectFit: "cover" }}
      />
      <div className="w-screen h-screen bg-black/20 z-10" />
      <div className="w-fit min-w-[500px] h-auto bg-[#F2F2F2]/95 z-20 absolute rounded-lg items-center flex flex-1 px-10 py-5 flex-col">
        <span className="text-primary text-3xl font-semibold">Sign Up</span>
        <span className="text-text-primary mt-3">
          Please enter your details
        </span>
        <div className="mt-5 w-full">
          <Input
            label="First Name*"
            placeholder="Enter your first name"
            value={firstName}
            onChange={handleFirstNameChange}
          />
          <Input
            label="Last Name*"
            placeholder="Enter your last name"
            value={lastName}
            onChange={handleLastNameChange}
          />
          <Input
            label="Email*"
            placeholder="Enter your email id"
            value={email}
            onChange={handleEmailChange}
          />
          <Input
            label="Password*"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <Input
            label="Confirm Password*"
            placeholder="Enter confirm password"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        <Button className="w-full" disabled={isPending} onClick={callAPI}>
          {isPending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          Sign Up
        </Button>
        <span className="mt-5 text-text-primary text-sm">
          {"Already have account? "}
          <Link href={"/login"}>
            <span className="text-primary font-semibold">Sign In</span>
          </Link>
        </span>
      </div>
    </div>
  );
}
