import SideBar from "../components/SideBar";
import Header from "../components/dashboard/Header";
import { SWRProvider } from "../context/SWRProvider";
import { SideBarProvider } from "../context/SideBarContext";
import { UserContextProvider } from "../context/UserContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SWRProvider>
      <UserContextProvider>
        <SideBarProvider>
          <div className={`flex flex-1 overflow-hidden`}>
            <div className="basis-1/5 hidden sm:flex">
              <SideBar />
            </div>

            <div className="flex w-full h-screen flex-col overflow-hidden">
              <Header />
              {children}
            </div>
          </div>
        </SideBarProvider>
      </UserContextProvider>
    </SWRProvider>
  );
}
