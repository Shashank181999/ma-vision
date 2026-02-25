"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import SmoothScroll from "@/components/SmoothScroll";

export default function AboutPage() {
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
        <About />
      </main>
      <Footer />
    </>
  );
}
