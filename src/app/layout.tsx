"use client";
import Image from "next/image";
import "./globals.css";
import { usePathname } from "next/navigation";
import { OrderProvider } from "./OrderContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path ? "text-white font-bold" : "text-black";

  //Ef skjárinn er sm eða md þá á bara að sýna active page header
  const getActiveText = () => {
    switch (pathname) {
      case "/":
        return "Home";
      case "/pickdish":
        return "Pick Dish Screen";
      case "/pickdrink":
        return "Select Drink";
      case "/orderscreen":
        return "Order Screen";
      case "/receiptscreen":
        return "Receipt Screen";
      default:
        return "";
    }
  };

  return (
    <html lang="en">
      <body className="bg-[#E0E39A]">
        <OrderProvider>
          <header className="bg-[#C16757]">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-between lg:justify-between sm:justify-start">
                <Image
                  src="/images/lilbits.png"
                  alt="Logo"
                  width={160}
                  height={160}
                  className="ml-4 md:ml-20"
                />

                <ul className="hidden lg:flex flex-row text-center space-x-10 ml-44 text-xl">
                  <li>
                    <p className={`${isActive("/")}`}>Home</p>
                  </li>
                  <li>
                    <p className={`${isActive("/pickdish")}`}>
                      Pick Dish Screen
                    </p>
                  </li>
                  <li>
                    <p className={`${isActive("/pickdrink")}`}>Select Drink</p>
                  </li>
                  <li>
                    <p className={`${isActive("/orderscreen")}`}>
                      Order Screen
                    </p>
                  </li>
                  <li>
                    <p className={`${isActive("/receiptscreen")}`}>
                      Receipt Screen
                    </p>
                  </li>
                </ul>
                <div className="lg:hidden flex justify-end right-10 w-full text-xl absolute top-16 sm:justify-center sm:pl-10 sm:text-2xl">
                  <p className="text-white font-bold">{getActiveText()}</p>
                </div>
              </div>
            </div>
          </header>
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow mb-36">{children}</main>
            <footer className="mt-auto bg-[#C16757] text-gray-100 text-center p-6">
              <p className="text-1xl py-8">
                &copy; 2024 LIL&apos;BITS. All rights reserved.
              </p>
            </footer>
          </div>
        </OrderProvider>
      </body>
    </html>
  );
}
