"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { checkIsEmpty, validateEmail, validateEmployeeId } from "@/lib/utils";
import { ApiError } from "@/types";
import { ReloadIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useTransition, useRef } from "react";
import lady from "../../../public/landing-girl.svg";
import EditIcon from "../../../public/EditIcon.svg"
import { signUpUser } from "../actions/auth_actions";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photoSrc, setPhotoSrc] = useState(EditIcon);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileType = file.type;
      if (!fileType.startsWith("image/")) {
        showErrorToast("Please select a valid image file.");
        return;
      }

      const newPhotoSrc = URL.createObjectURL(file);

      setPhotoSrc(newPhotoSrc);
      setPhotoFile(file);
    }
  };

  const openFileExplorer = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const showErrorToast = (desc: string) => {
    toast({
      title: "Error",
      description: desc,
      variant: "destructive",
      duration: 2000,
    });
  };

  const callAPI = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      if (
        checkIsEmpty(firstName) ||
        checkIsEmpty(lastName) ||
        checkIsEmpty(email) ||
        checkIsEmpty(employeeId) ||
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

      // if (!validateEmployeeId(employeeId)) {
      //   showErrorToast("Invalid Employee ID");
      //   return;
      // }

      if (password !== confirmPassword) {
        showErrorToast("Passwords and Confirm Password do not match");
        return;
      }

      if (password.length < 6 || confirmPassword.length < 6) {
        showErrorToast("Minimum password lenght should be 6 characters");
        return;
      }

      const formData = new FormData();
      formData.append("email", email);
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("password", password);
      formData.append("re_password", confirmPassword);
      formData.append("username", `${firstName}${lastName}`);
      formData.append("employee_id", employeeId);
      if (photoFile) {
        formData.append("profile_pic", photoFile);
      }

      const response = await signUpUser(formData);
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
  const handleEmployeeIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmployeeId(e.target.value);
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
        <div className="flex justify-center items-center mt-5 cursor-pointer bg-white rounded-full">
          <Image
            src={photoSrc}
            width={70}
            height={70}
            alt="profileIcon"
            placeholder="empty"
            onClick={openFileExplorer}
            style={{ borderRadius: "100%", objectFit: "scale-down" }}
          />
          <input
            id="fileInput"
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handlePhotoChange}
          />
        </div>
        <div className="mt-5 w-full">
          <div className="flex gap-4">
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
          </div>
          <div className="flex gap-4">
            <Input
              label="Employee Id*"
              placeholder="Enter your employee id"
              value={employeeId}
              onChange={handleEmployeeIdChange}
            />
            <Input
              label="Email*"
              placeholder="Enter your email id"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="flex gap-4">
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
