import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Papagaj glas – demo",
  description: "Profesionalni demo: upload/snimanje glasa, konverzija preko Hugging Face Space-a.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sr">
      <body>{children}</body>
    </html>
  );
}
