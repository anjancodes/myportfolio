"use client"

import React from "react";
import Lottie from "lottie-react"
import hi from "../../public/lottie/hi.json"
import scroll from "../../public/lottie/scroll-down.json"
import { Particles } from "../components/magicui/particles"
import { Spotlight } from "../components/magicui/spotlight-new"




export default function Home() {

  return (
    <section className="relative min-h-screen w-full bg-black text-white flex flex-col items-center justify-center text-center px-4">
      {/* Particles Background */}
      <Particles className="absolute inset-0 z-0" quantity={80} ease={50} size={0.5} refresh />


      <Spotlight />
      {/* Content Container */}
      <div className="relative z-10 max-w-3xl">
        {/* Emoji/Greeting */}
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center px-6 py-3 border rounded-4xl bg-white/10">
            <div className="lg:w-12 lg:h-12 w-5 h-5">
              <Lottie animationData={hi} loop={true} style={{ transform: "rotate(-45deg)" }} />
            </div>
            <div className="ml-2">
              <p className="lg:text-lg text-sm">Hello! I'm Anjan :)</p>
            </div>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="lg:text-5xl text-xl leading-normal md:text-5xl font-bold mb-5 bg-gradient-to-r from-[#fff] to-[#999] bg-clip-text text-transparent">
          Crafting Seamless Experiences
          <br />
          With Code & Design
        </h1>

        {/* Subheadline */}
        <p className="lg:text-lg text-md text-gray-300 mb-8">
          Based In India, A Frontend Developer & Designer Who Loves Creating Beautiful And Functional Web Experiences.
        </p>
      </div>

      <div className="">
        <Lottie animationData={scroll} loop={true} />
      </div>

    </section>
  )
}

