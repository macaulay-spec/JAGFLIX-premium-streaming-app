import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { AppProviders } from '@/providers/app-providers';
import { AppShell } from '@/components/layout/app-shell';

export const metadata: Metadata = {
  title: 'JagFlix — Premium Streaming',
  description: 'A cinematic, high-performance streaming experience powered by the official ZST Labs Movie API.',
  manifest: '/manifest.webmanifest',
  applicationName: 'JagFlix',
  appleWebApp: { capable: true, statusBarStyle: 'black-translucent', title: 'JagFlix' },
};

export const viewport: Viewport = {
  themeColor: '#05060a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AppProviders>
          <AppShell>{children}</AppShell>
        </AppProviders>
      </body>
    </html>
  );
}
