import { Metadata } from 'next';
import { Toaster } from '@/components/ui/Toasts/toaster';
import { PropsWithChildren, Suspense } from 'react';
import '@/styles/main.css';

const title = 'Stripe SaaS Starter MVP';
const description = 'A minimal Stripe-powered SaaS starter with pricing and checkout.';

export const metadata: Metadata = {
  title: title,
  description: description,
  openGraph: {
    title: title,
    description: description
  }
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <nav className="border-b border-zinc-800">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <h1 className="text-xl font-bold">💳 Stripe SaaS Starter</h1>
          </div>
        </nav>
        <main className="min-h-[calc(100dvh-4rem)]">
          {children}
        </main>
        <footer className="border-t border-zinc-800 py-8">
          <div className="max-w-6xl mx-auto px-4 text-center text-zinc-500">
            <p>Powered by Next.js, Stripe, and Tailwind CSS</p>
          </div>
        </footer>
        <Suspense>
          <Toaster />
        </Suspense>
      </body>
    </html>
  );
}