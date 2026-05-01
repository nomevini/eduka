import localFont from "next/font/local"

import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Toaster } from "sonner"
import "./globals.css"

const geist = localFont({
  src: "../node_modules/next/dist/esm/next-devtools/server/font/geist-latin.woff2",
  variable: "--font-sans",
  display: "swap",
})

const geistMono = localFont({
  src: "../node_modules/next/dist/esm/next-devtools/server/font/geist-mono-latin.woff2",
  variable: "--font-mono",
  display: "swap",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "font-sans antialiased",
        geist.variable,
        geistMono.variable
      )}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
