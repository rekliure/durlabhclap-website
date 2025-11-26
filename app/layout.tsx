import "./globals.css";
import { LanguageProvider } from "./components/LanguageProvider";
import BackgroundFX from "./components/BackgroundFX";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <BackgroundFX />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
