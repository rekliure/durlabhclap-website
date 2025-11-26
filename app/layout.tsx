import "./globals.css";
import { LanguageProvider } from "./components/LanguageProvider";
import { ThemeProvider } from "./components/ThemeProvider";
import MotionStyles from "../app/components/MotionStyles";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <MotionStyles />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
