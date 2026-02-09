import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "../contexts/AuthContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Speedex - Lightning Fast Delivery",
  description: "Track your deliveries with lightning-fast speed",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <main className="pb-20">{children}</main>
          <Navigation />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
