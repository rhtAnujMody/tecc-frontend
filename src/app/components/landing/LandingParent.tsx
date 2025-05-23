"use client";

import { loginInUser } from "@/app/actions/auth_actions";
import { toast } from "@/components/ui/use-toast";
import { TOKEN, USERDATA } from "@/lib/constants";
import { setLocalData } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import Footer from "../Footer";
import Header from "../Header";
import AboutRevealAcademy from "./AboutRevealAcademy";
import CoursesWeOffer from "./CoursesWeOffer";
import Welcome from "./Welcome";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const accessToken = useMemo(
    () => searchParams.get("access_token"),
    [searchParams]
  );

  useEffect(() => {
    if (accessToken) {
      callAPI(accessToken);
    }
  }, [accessToken]);

  const callAPI = async (access_token: string) => {
    try {
      const response = await loginInUser(access_token);
      if (response && response.ok) {
        console.log("Login success");
        setLocalData(TOKEN, access_token);
        setLocalData(USERDATA, JSON.stringify(response.data?.user));
        router.replace("/dashboard");
      } else {
        toast({
          title: "Error",
          description: "User not found",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log("Error in loginInUser", error);

      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
  };
  return (
    <main className="flex relative flex-col bg-white overflow-hidden w-screen">
      <Header />
      <Welcome />
      <AboutRevealAcademy />
      <CoursesWeOffer />
      <Footer />
    </main>
  );
}
