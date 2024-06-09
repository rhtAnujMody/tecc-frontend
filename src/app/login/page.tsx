"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ApiError, UserData } from "@/types";
import { ReloadIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import lady from "../../../public/landing-girl.svg";
import { signInUser } from "../actions/auth_actions";
import { setLocalData } from "@/lib/utils";
import { USERDATA } from "@/lib/constants";

export default function Login() {
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState<string>("test30@mailinator.com");
  const [password, setPassword] = useState<string>("Qwerty1@");
  const router = useRouter();
  const { toast } = useToast();

  const callAPI = () => {
    startTransition(async () => {
      if (email && password) {
        const response = await signInUser(email, password);
        if (response.ok) {
          router.replace("/dashboard");
          toast({
            title: "Success",
            description: "Login Success",
          });
        } else {
          setLocalData(
            USERDATA,
            JSON.stringify({
              first_name: "Anuj",
              last_name: "Mody",
              email: "anuj@gmail.com",
              credits: 20,
              username: "AnujMody",
            } as UserData)
          );
          router.replace("/dashboard");
          // toast({
          //   title: "Error",
          //   description:
          //     typeof response.error === "object"
          //       ? (response.error as ApiError).detail
          //       : response.error,
          //   variant: "destructive",
          // });
        }
      }
    });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
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
      ></Image>
      <div className="w-screen h-screen bg-black/20 z-10" />
      <div className="w-fit min-w-[500px] h-auto bg-[#F2F2F2]/95 z-20 absolute rounded-lg items-center flex flex-1 px-10 py-5 flex-col">
        <span className="text-primary text-3xl font-semibold">Login</span>
        <span className="text-text-primary mt-3">
          Welcome back! Please enter your details.
        </span>
        <div className="mt-5 w-full">
          <Input
            label="Email Id"
            placeholder="Enter your email"
            onChange={handleEmailChange}
            value={email || ""}
          />
          <Input
            label="Password"
            placeholder="Enter your passoword"
            onChange={handlePasswordChange}
            type="password"
            value={password || ""}
          />
          <Button
            className="w-full"
            type="submit"
            disabled={isPending}
            onClick={callAPI}
          >
            {isPending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </Button>
        </div>

        <span className="mt-5 text-text-primary text-sm">
          {"Don't have account? "}
          <Link href={"/signup"}>
            <span className="text-primary font-semibold">Sign Up</span>
          </Link>
        </span>
      </div>
    </div>
  );
}
