import { TriggerProvider } from "@trigger.dev/react";
import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Copy Prettifier",
  description: "Improve your landing page copy with AI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <TriggerProvider
          publicApiKey={process.env.NEXT_PUBLIC_CLIENT_TRIGGER_API_KEY ?? ""}
          apiUrl={process.env.NEXT_PUBLIC_TRIGGER_API_URL}
        >
          <Toaster position="bottom-right" />
          {children}
        </TriggerProvider>
      </body>
    </html>
  );
}
