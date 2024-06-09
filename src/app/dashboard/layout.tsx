import { cookies } from "next/headers";
import SideBar from "../components/SideBar";
import { SideBarProvider } from "../context/SideBarContext";
import Header from "../components/dashboard/Header";
import { UserContextProvider } from "../context/UserContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userData =
    cookies().get("userData") &&
    JSON.parse(cookies().get("userData")?.value ?? "");

  return (
    <UserContextProvider>
      <SideBarProvider>
        <div className={`flex flex-1 overflow-hidden`}>
          <div className="flex basis-1/5">
            <SideBar />
          </div>

          <div className="flex h-screen flex-col overflow-hidden">
            <Header />
            {children}
          </div>
        </div>
      </SideBarProvider>
    </UserContextProvider>
  );
}
