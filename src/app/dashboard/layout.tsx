import SideBar from "../components/SideBar";
import { SideBarProvider } from "../context/SideBarContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SideBarProvider>
      <div className={`flex flex-1  min-h-screen `}>
        <div className="flex basis-1/5">
          <SideBar />
        </div>

        <div>{children}</div>
      </div>
    </SideBarProvider>
  );
}
