import Pricing from '@/components/ui/Pricing/Pricing';
import { getProducts } from '@/utils/stripe/products';

export default async function PricingPage() {
  const products = await getProducts();

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-zinc-400">
          Choose the plan that fits your needs
        </p>
      </div>
      <Pricing products={products ?? []} />
    </div>
  );
}