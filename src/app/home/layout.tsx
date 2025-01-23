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
      <div className='not-so-secret-window'>
        <button />
      </div>
      <div className='page'>{children}</div>
    </>
  );
}
