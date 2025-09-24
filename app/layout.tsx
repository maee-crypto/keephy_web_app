import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Slide, ToastContainer } from 'react-toastify';

import Providers from './providers';
import ErrorBoundary from '../components/ErrorBoundary';
import { setupGlobalErrorHandling } from '../utils/routeChecker';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800']
});

export const metadata: Metadata = {
  title: 'Keephy',
  description: 'NFC Feedback Solutions'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Setup global error handling
  if (typeof window !== 'undefined') {
    setupGlobalErrorHandling();
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className}`}>
        <div className="bg-gray-100">
          <ErrorBoundary>
            <Providers>
              {children}
              <ToastContainer
                theme="dark"
                position="top-center"
                hideProgressBar
                autoClose={2000}
                transition={Slide}
              />
            </Providers>
          </ErrorBoundary>
        </div>
      </body>
    </html>
  );
}
