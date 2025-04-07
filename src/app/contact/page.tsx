"use client";
import React, { useState } from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { MagicCard } from "@/components/ui/MagicCard";
import { Globe } from "../../components/magicui/globe";

import { IconBrandGithub, IconBrandX } from "@tabler/icons-react";

import { MdOutlineEmail } from "react-icons/md";
import { FaLinkedinIn } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

import { useTheme } from "next-themes";
import Button from "@/components/ui/Button";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const links = [
    {
      title: "Email",
      icon: (
        <MdOutlineEmail className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "mailto:anjushetty86@gmail.com",
    },
    {
      title: "LinkedIn",
      icon: (
        <FaLinkedinIn className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://www.linkedin.com/in/asr06/",
    },
    {
      title: "Twitter",
      icon: (
        <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
  ];

  const { theme } = useTheme();

  return (
    <section className="container max-w-6xl mx-auto py-10 max-lg:px-4 mt-15">
      <h1 className="mb-8 text-3xl font-bold text-center text-white dark:text-white">
        Contact Me
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* <MagicCard className="flex items-center justify-center">
          <h2 className="text-white text-2xl mb-4">My Resume</h2>
          <Button text="Download" />
          </MagicCard> */}

        <div className="lg:flex hidden flex-row gap-4 items-center justify-center max-md:order-2">
          {/* <div className="flex flex-col items-center justify-center border border-white/50 rounded-2xl gap-2 py-6 px-14 w-full">
            <h2 className="text-white text-xl text-center">Resume</h2>
            <p className="text-white/50 text-center">My experience and works</p>
            <Button text="Download" bg="black" />
          </div>
          <div className="flex flex-col items-center justify-center border border-white/50 rounded-2xl gap-2 py-6 px-14 w-full">
            <h2 className="text-white text-xl text-center">Cover Letter</h2>
            <p className="text-white/50 text-center">My experience and works</p>
            <Button text="Download" bg="black" />
          </div> */}
          <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg border border-white/30 bg-black px-40 md:pb-60">
            <span className="flex text-white text-center text-lg font-semibold leading-none">
            <IoLocationSharp className="text-white" />
              Bengaluru, India
            </span>
            <Globe className="top-32" />
            <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
          </div>
        </div>

        {/* Contact Form Card */}
        <MagicCard className="h-full max-md:order-1">
          {/* <h2 className="text-xl font-semibold mb-4 text-white dark:text-white">
            Send a Message
          </h2> */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-neutral-300 dark:text-neutral-300"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                placeholder="Enter your name"
                autoComplete="off"
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-neutral-700 bg-black text-white  focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all duration-200"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-neutral-300 dark:text-neutral-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                placeholder="example@email.com"
                autoComplete="off"
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-neutral-700 bg-black text-white focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all duration-200"
                required
              />
            </div>

            {/* Text */}
            <div>
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-neutral-300 dark:text-neutral-300"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                autoComplete="off"
                placeholder="Enter your text"
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 rounded-md border border-neutral-700 bg-black text-white focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all duration-200"
                required
              />
            </div>

            <Button text="Send" bg="white" className="w-full" />
          </form>
        </MagicCard>
      </div>

      <div className="fixed lg:bottom-6 lg:left-1/2 bottom-6 max-lg:right-0 transform -translate-x-1/2 z-50">
        <FloatingDock items={links} desktopClassName="bg-transparent" />
      </div>
    </section>
  );
};

export default Contact;
