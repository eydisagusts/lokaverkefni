import Image from "next/image";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='bg-[#E0E39A]'>
        <header className="bg-[#C16757]">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Image 
                src="/images/lilbits.png" 
                alt="Logo" 
                width={160} 
                height={160}
                className="ml-6"
              />
              <ul className="flex flex-row text-center space-x-10 ml-44 text-xl text-black ">
                <li><p>Home</p></li>
                <li><p>Pick Dish Screen</p></li>
                <li><p>Select Drink</p></li>
                <li><p>Order Screen</p></li>
                <li><p>Receipt Screen</p></li>
              </ul>
              <div>
                <button 
                type="button"
                className="border-2 shadow-md bg-gray-200 px-10 py-2 ml-36 text-black rounded-full hover:bg-gray-400 hover:border-gray-400">
                  Order
                </button>
              </div>
            </div>
          </div>
        </header>
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">
            {children}
          </main>
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