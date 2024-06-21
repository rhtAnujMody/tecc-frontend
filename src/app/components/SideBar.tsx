"use client";
import { Button } from "@/components/ui/button";
import { cn, deleteLocalData, getInitials } from "@/lib/utils";
import { ExitIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "../../../public/logo.svg";
import { handleLogoutAction } from "../actions/logout_actions";
import { useSidebar } from "../context/SideBarContext";
import { useUserContext } from "../context/UserContext";

export default function SideBar() {
  const router = useRouter();
  const { data, updateSideBar } = useSidebar();
  const { user: userData } = useUserContext();

  const handleLogout = async () => {
    const isLogout = await handleLogoutAction();
    if (isLogout) {
      deleteLocalData();
      router.replace("/");
    }
  };

  return (
    <div className="flex h-screen flex-col border-r">
      <Image
        src={logo}
        alt="logo"
        width={100}
        height={40}
        priority={false}
        className="mx-10 mt-5 w-auto h-auto"
      />
      <div className=" h-full mt-5 flex flex-1 flex-col">
        <div className="flex basis-[90%] border-b ">
          <div className="flex flex-col mx-6 w-full gap-2">
            {data.map((value, index) => (
              <div
                onClick={() => {
                  updateSideBar(
                    data.map((data, pos) => {
                      if (index === pos) {
                        return {
                          ...data,
                          isSelected: true,
                        };
                      }

                      return { ...data, isSelected: false };
                    }),
                    index
                  );
                }}
                className={cn(
                  "flex w-full px-4 py-2 rounded-md cursor-pointer gap-2",
                  value.isSelected && "bg-[#92D3FF]"
                )}
                key={value.header}
              >
                <Image
                  src={value.icon}
                  alt="icon"
                  width={20}
                  height={20}
                  style={{
                    width: "auto",
                    height: "auto",
                    filter: `invert(100%) sepia(100%) saturate(10000%) hue-rotate(200deg) ${
                      value.isSelected ? "grayscale(0%)" : "grayscale(80%)"
                    }`,
                  }}
                />
                <span
                  className={cn(
                    "text-lg font-semibold text-text-primary",
                    value.isSelected && "text-primary"
                  )}
                >
                  {value.header}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-1 h-fit items-center px-5  justify-between">
          <div className="flex gap-2">
            <div className="w-14 h-14 border rounded-full flex justify-center items-center text-text-primary font-normal">
            {userData?.profile_pic ? (
                <Image
                  src={userData?.profile_pic}
                  width={70}
                  height={70}
                  alt="profileIcon"
                  placeholder="empty"
                  className="rounded-full"
                />
              ) : (
                // If profilePicUrl is undefined or null, show initials
                getInitials(userData?.first_name ?? "", userData?.last_name ?? "")
              )}
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-text-primary font-semibold text-base">
                {userData && userData.first_name + " " + userData.last_name}
              </span>
              <span className="text-text-primary font-normal text-sm">
                {userData && userData.email}
              </span>
            </div>
          </div>
          <Button variant="ghost" onClick={handleLogout}>
            <ExitIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
