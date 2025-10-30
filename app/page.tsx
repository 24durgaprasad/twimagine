"use client";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import TwitterCard from "@/components/ui/tweet-card";
import Navbar from "@/components/navbar";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { Button } from "@/components/ui/button";
import { FaRegCopy } from "react-icons/fa6";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";

export default function Home() {
  const [outline, setOutline] = useState("");
  const [outlineInput, setOutlineInput] = useState("");
  const [loading, setloading] = useState(false);

  const resultref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (loading || outline) {
      resultref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [loading, outline]);

  async function fetchData() {
    setloading(true);
    console.log(outlineInput);
    const { data } = await axios.post("/api/generate", {
      outline: outlineInput,
    });

    setOutline(data.response);
    console.log(data.response);
    setOutlineInput("");
  }

  const tweetData = {
    username: "Raju",
    name: "Raju",
    profileImage: "/akshay1.webp",
    tweet: outline,
    organization: "Lakshmi chit fund",
  };

  const placeholders = [
    "Day 1 of #100DaysOfCode — learned HTML basics and built my first webpage",
    "Day 7 of #100DaysOfCode — practiced JavaScript loops and built a mini calculator",
    "Day 15 — learned React useState and made a simple counter app",
    "Day 20 — feeling stuck but still showing up to code daily",
    "Day 30 — built my first full-stack project using MERN stack",
    "Day 45 — learned about APIs and built a weather app",
  ];

  function copydata() {
    navigator.clipboard.writeText(outline);
    toast("copied sucessfully");
  }
  return (
    <div className="flex w-full min-h-screen flex-col justify-start items-center">
      <div className="w-full p-4 sm:p-8 text-center">
        <Navbar />
        <ToastContainer />

        <div className="flex flex-col justify-center items-center px-4 py-24 sm:py-32">
          <h2 className="mb-10 sm:mb-20 text-3xl font-bold text-center sm:text-5xl dark:text-white text-black">
            Where your ideas become X-ready
          </h2>
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={(e) => setOutlineInput(e.target.value)}
            onSubmit={fetchData}
          />
        </div>

        <div
          className="w-full max-w-4xl mx-auto px-4 py-16"
          ref={resultref}
        >
          {outline ? (
            <div className="md:flex md:items-start md:justify-center md:gap-8">
              <div className="w-full max-w-xl mx-auto">
                <TwitterCard {...tweetData} />
              </div>
              <div className="btns flex flex-row md:flex-col gap-4 mt-6 md:mt-0 items-center justify-center">
                <Button
                  className="active:bg-green-500 w-30  md:w-auto"
                  onClick={() => {
                    copydata();
                  }}
                >
                  <FaRegCopy/> Copy
                </Button>

                <Link
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    outline
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full md:w-auto"
                >
                  <Button className="w-30">Post on X</Button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              {loading && (
                <h1 className="text-2xl font-extrabold">LOADING..</h1>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}