'use client';

import { useState } from 'react';
import cn from 'classnames';
import { CheckCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import { getStripe } from '@/utils/stripe/client';
import { toast } from '@/components/ui/Toasts/use-toast';

type Product = {
  id: string;
  name: string;
  description: string | null;
  prices: Price[];
};

type Price = {
  id: string;
  unit_amount: number | null;
  currency: string;
  interval: string | null;
  interval_count: number;
};

interface Props {
  products: Product[];
}

export default function Pricing({ products }: Props) {
  const [billingInterval, setBillingInterval] = useState<'month' | 'year'>('month');
  const [priceIdLoading, setPriceIdLoading] = useState<string>();

  const handleStripeCheckout = async (priceId: string) => {
    setPriceIdLoading(priceId);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ priceId })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId: data.sessionId });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setPriceIdLoading(undefined);
    }
  };

  if (!products.length) {
    return (
      <div className="text-center py-12">
        <p className="text-zinc-400 text-lg">
          No pricing plans available. Please create products in your{' '}
          <a
            href="https://dashboard.stripe.com/test/products"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline hover:text-zinc-300"
          >
            Stripe Dashboard
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Billing Interval Toggle */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex rounded-lg border border-zinc-800 p-1">
          <button
            onClick={() => setBillingInterval('month')}
            className={cn(
              'px-6 py-2 rounded-md font-medium transition',
              billingInterval === 'month'
                ? 'bg-white text-black'
                : 'text-zinc-400 hover:text-white'
            )}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingInterval('year')}
            className={cn(
              'px-6 py-2 rounded-md font-medium transition',
              billingInterval === 'year'
                ? 'bg-white text-black'
                : 'text-zinc-400 hover:text-white'
            )}
          >
            Yearly
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {products.map((product) => {
          const price = product.prices.find(
            (p) => p.interval === billingInterval
          );

          if (!price) return null;

          const priceString = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: price.currency,
            minimumFractionDigits: 0
          }).format((price.unit_amount || 0) / 100);

          return (
            <div
              key={product.id}
              className="border border-zinc-800 rounded-lg p-8 bg-zinc-900 hover:border-zinc-700 transition"
            >
              <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
              <p className="text-zinc-400 mb-6 min-h-[3rem]">
                {product.description}
              </p>
              <div className="mb-6">
                <span className="text-5xl font-bold">{priceString}</span>
                <span className="text-zinc-400 ml-2">/{billingInterval}</span>
              </div>
              <Button
                variant="slim"
                type="button"
                onClick={() => handleStripeCheckout(price.id)}
                loading={priceIdLoading === price.id}
                className="w-full mb-6"
              >
                Subscribe
              </Button>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-zinc-300">Full access to all features</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-zinc-300">Priority support</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-zinc-300">Cancel anytime</span>
                </li>
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}