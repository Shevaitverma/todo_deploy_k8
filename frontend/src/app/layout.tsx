import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Todo App - Manage Your Tasks",
  description: "A modern todo application built with Next.js, TypeScript, and Tailwind CSS",
  keywords: ["todo", "task management", "productivity", "next.js", "typescript"],
  authors: [{ name: "Todo App Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
