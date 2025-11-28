import "./globals.css";
import { LanguageProvider } from "./components/LanguageProvider";
import { ThemeProvider } from "./components/ThemeProvider";
import MotionStyles from "../app/components/MotionStyles";
import FluidBackdrop from "./components/FluidBackdrop";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <MotionStyles />
            <FluidBackdrop />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
