"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import AboutPreview from "@/components/AboutPreview";
import DrivenByVision from "@/components/DrivenByVision";
import Leadership from "@/components/Leadership";
import Expertise from "@/components/Expertise";
import Services from "@/components/Services";
import Stride from "@/components/Stride";
import Projects from "@/components/Projects";
import BusinessInquiries from "@/components/BusinessInquiries";
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
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <>
      <PageLoader />
            <SmoothScroll />
      <Navbar />
      <main>
        <section id="home">
          <HeroPremium />
        </section>
        <AboutPreview />
        <Leadership />
        <Expertise />
        <Stride />
        <Services />
        <Projects />
        <DrivenByVision />
        <BusinessInquiries />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
