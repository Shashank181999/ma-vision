"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Leadership from "@/components/Leadership";
import Expertise from "@/components/Expertise";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import SmoothScroll from "@/components/SmoothScroll";

// Dynamic import for Hero
const HeroPremium = dynamic(() => import("@/components/HeroPremium"), {
  ssr: false,
  loading: () => (
    <div style={{ minHeight: "100vh", background: "#0a0a0c" }} />
  ),
});

export default function Home() {
  return (
    <>
      <PageLoader />
            <SmoothScroll />
      <Navbar />
      <main>
        <section id="home">
          <HeroPremium />
        </section>
        <About />
        <Leadership />
        <Expertise />
        <Services />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
