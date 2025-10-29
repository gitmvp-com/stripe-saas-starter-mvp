import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function SuccessPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
      <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
      <p className="text-xl text-zinc-400 mb-8">
        Thank you for your subscription. You're all set!
      </p>
      <p className="text-zinc-500 mb-8">
        In a production app, this is where you'd redirect users to their dashboard.
      </p>
      <Link
        href="/"
        className="inline-block bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-zinc-200 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}