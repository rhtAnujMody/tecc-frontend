import Image from "next/image";

import AppButton from "./components/AppButton";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CoursesWeOffer from "./components/landing/CoursesWeOffer";
import AboutRevealAcademy from "./components/landing/AboutRevealAcademy";
import Welcome from "./components/landing/Welcome";

export default function Home() {
  return (
    <main className="flex relative flex-col  bg-white">
      <Header />
      <Welcome />
      <AboutRevealAcademy />
      <CoursesWeOffer />
      <Footer />
    </main>
  );
}
