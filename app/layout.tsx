import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="bg-gray-950 text-white min-h-screen">{children}</body>
    </html>
  );
}
