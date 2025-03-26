"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const Logo: React.FC = () => {
  return (
    <Link href="/" className="group relative flex items-center">
      <Image src="/Logo.svg" alt="Logo" width={35} height={35} priority />
    </Link>
  );
};

export default Logo;
