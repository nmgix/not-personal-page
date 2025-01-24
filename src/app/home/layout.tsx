import { UnexpectedErrorBoundary } from "@/components/Specialized/ErrorBoundary/ErrorBoundary";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_NAME} | Home`,
  description: "home page UwU"
};
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode | React.ReactNode[];
}>) {
  return (
    <>
      <UnexpectedErrorBoundary />
      {children}
    </>
  );
}
