import type { Metadata } from "next";
import "./globals.css";
import CartProvider from "../componets/CartProvider";

export const metadata: Metadata = {
  title: "Legacy Scents",
  description: "Premium Fragrance Decants",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
