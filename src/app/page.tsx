import Footer from "./components/Footer";
import Header from "./components/Header";
import AboutRevealAcademy from "./components/landing/AboutRevealAcademy";
import CoursesWeOffer from "./components/landing/CoursesWeOffer";
import Welcome from "./components/landing/Welcome";

export default function Home() {
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
