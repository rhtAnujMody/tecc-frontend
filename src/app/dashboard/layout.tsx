import SideBar from "../components/SideBar";
import Header from "../components/dashboard/Header";
import { SideBarProvider } from "../context/SideBarContext";
import { UserContextProvider } from "../context/UserContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserContextProvider>
      <SideBarProvider>
        <div className={`flex flex-1 overflow-hidden`}>
          <div className="flex basis-1/5">
            <SideBar />
          </div>

          <div className="flex w-full h-screen flex-col overflow-hidden">
            <Header />
            {children}
          </div>
        </div>
      </SideBarProvider>
    </UserContextProvider>
  );
}
