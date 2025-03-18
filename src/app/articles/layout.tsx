import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_NAME} | Articles`,
  description: "my whole bunch of articles~!!"
};
export default function RootLayout({
  children,
  articlemodal
}: Readonly<{
  children: React.ReactNode | React.ReactNode[];
  articlemodal: React.ReactNode;
}>) {
  return (
    <>
      {children}
      {articlemodal}
    </>
  );
}
