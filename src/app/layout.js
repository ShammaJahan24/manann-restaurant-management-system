
import "./globals.css";

export const metadata = {
  title: "Mannan Restaurant | Management System",
  description:
    "Restaurant management and point of sale system for Mannan Restaurant.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
