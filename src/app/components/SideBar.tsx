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

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

  const handleMainItemClick = (index: number) => {
    const newData = data.map((item, pos) => {
      if (index === pos) {
        return { ...item, isSelected: true };
      }
      return {
        ...item,
        isSelected: false,
        subItems:
          item.subItems?.map((subItem) => ({
            ...subItem,
            isSelected: false,
          })) || null,
      };
    });
    updateSideBar(newData, index);
  };

  const handleSubItemClick = (mainIndex: number, subIndex: number) => {
    const newData = data.map((item, pos) => {
      if (mainIndex === pos) {
        return {
          ...item,
          isSelected: true,
          subItems:
            item.subItems?.map((subItem, subPos) => {
              return {
                ...subItem,
                isSelected: subPos === subIndex,
              };
            }) || null,
        };
      }
      return {
        ...item,
        isSelected: false,
        subItems:
          item.subItems?.map((subItem) => ({
            ...subItem,
            isSelected: false,
          })) || null,
      };
    });
    updateSideBar(newData, mainIndex * 10 + subIndex);
  };

  return (
    <div className="flex h-screen flex-col border-r w-full flex-1">
      <Image
        src={logo}
        alt="logo"
        width={100}
        height={40}
        priority={false}
        className="mx-10 mt-5 self-center"
      />
      <div className=" h-full mt-5 flex flex-1 flex-col">
        <div className="flex basis-[90%] border-b ">
          <div className="flex flex-col mx-6 w-full gap-2">
            {data.map((item, mainIndex) => (
              <div key={item.header}>
                {item.subItems !== null ? (
                  <Accordion
                    type="single"
                    collapsible
                    defaultValue={`item-${mainIndex}`}
                  >
                    <AccordionItem value={`item-${mainIndex}`}>
                      <AccordionTrigger className="py-2 px-4">
                        <div className="flex w-full rounded-md cursor-pointer gap-2">
                          <Image
                            src={item.icon}
                            alt="icon"
                            width={20}
                            height={20}
                            style={{
                              width: "auto",
                              height: "auto",
                              filter:
                                "invert(100%) sepia(100%) saturate(10000%) hue-rotate(200deg) grayscale(80%)",
                            }}
                          />
                          <span className="text-lg font-semibold text-text-primary">
                            {item.header}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="ml-4 pb-0">
                        {item.subItems.map((subItem, subIndex) => (
                          <div
                            key={subItem.header}
                            onClick={() =>
                              handleSubItemClick(mainIndex, subIndex)
                            }
                            className={cn(
                              "flex w-full px-3 py-2 rounded-md cursor-pointer gap-2",
                              subItem.isSelected && "bg-[#92D3FF]"
                            )}
                          >
                            <Image
                              src={subItem.icon}
                              alt="icon"
                              width={15}
                              height={15}
                              style={{
                                width: "auto",
                                height: "auto",
                                filter: `invert(100%) sepia(100%) saturate(10000%) hue-rotate(200deg) ${
                                  subItem.isSelected
                                    ? "grayscale(0%)"
                                    : "grayscale(80%)"
                                }`,
                              }}
                            />
                            <span
                              className={cn(
                                "text-lg font-medium text-text-primary",
                                subItem.isSelected && "text-primary"
                              )}
                            >
                              {subItem.header}
                            </span>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ) : (
                  <div
                    onClick={() => handleMainItemClick(mainIndex)}
                    className={cn(
                      "flex w-full px-4 py-2 rounded-md cursor-pointer gap-2",
                      item.isSelected && "bg-[#92D3FF]"
                    )}
                  >
                    <Image
                      src={item.icon}
                      alt="icon"
                      width={20}
                      height={20}
                      style={{
                        width: "auto",
                        height: "auto",
                        filter: `invert(100%) sepia(100%) saturate(10000%) hue-rotate(200deg) ${
                          item.isSelected ? "grayscale(0%)" : "grayscale(80%)"
                        }`,
                      }}
                    />
                    <span
                      className={cn(
                        "text-lg font-semibold text-text-primary",
                        item.isSelected && "text-primary"
                      )}
                    >
                      {item.header}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-1 h-fit items-center px-5  justify-between">
          <div className="flex gap-2">
            <div className="w-14 h-14 border rounded-full flex justify-center items-center text-text-primary font-normal relative">
              {userData?.profile_pic ? (
                <Image
                  src={userData?.profile_pic}
                  width={40}
                  height={40}
                  alt="profileIcon"
                  placeholder="empty"
                  className="rounded-full"
                />
              ) : (
                // If profilePicUrl is undefined or null, show initials
                getInitials(
                  userData?.first_name ?? "",
                  userData?.last_name ?? ""
                )
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
