'use client';
import Image from "next/image";
import "./globals.css";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Helper function to check if the menu item should be highlighted
  const isActive = (path: string) =>
    pathname === path ? "text-white font-bold" : "text-black";

  return (
    <html lang="en">
      <body className="bg-[#E0E39A]">
        <header className="bg-[#C16757]">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Image
                src="/images/lilbits.png"
                alt="Logo"
                width={160}
                height={160}
                className="ml-16"
              />
              <ul className="flex flex-row text-center space-x-10 ml-44 text-xl">
                <li>
                  <p className={`${isActive("/")}`}>Home</p>
                </li>
                <li>
                  <p className={`${isActive("/menu/pickdish")}`}>Pick Dish Screen</p>
                </li>
                <li>
                  <p className={`${isActive("/menu/pickdrink")}`}>Select Drink</p>
                </li>
                <li>
                  <p className={`${isActive("/orderscreen")}`}>Order Screen</p>
                </li>
                <li>
                  <p className={`${isActive("/receiptscreen")}`}>
                    Receipt Screen
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </header>
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">{children}</main>
          <footer className="mt-auto">
            <p className="text-center bg-[#C16757] p-6 text-xl py-8 text-gray-100">
              &copy; 2021 Lilbits. All rights reserved.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
