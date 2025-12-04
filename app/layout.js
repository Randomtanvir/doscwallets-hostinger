import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "DOSCSWALLET : Digital Locker Services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" foxified="">
      <body className="bg-[#f6f7fa]" cz-shortcut-listen="true">
        {children}
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
