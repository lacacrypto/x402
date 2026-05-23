import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'x402 Payment Demo',
  description: 'Thanh toán bằng USDC trên Base',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
