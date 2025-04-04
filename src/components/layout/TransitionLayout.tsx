"use client"
import PageTransition from "../ui/PageTransition";
import { ReactNode } from "react";

interface TransitionLayoutProps {
  children: ReactNode;
}

const TransitionLayout: React.FC<TransitionLayoutProps> = ({ children }) => {
  return <PageTransition>{children}</PageTransition>;
};

export default TransitionLayout;
