import { stripe } from './config';

export async function getProducts() {
  try {
    const products = await stripe.products.list({
      active: true,
      expand: ['data.default_price']
    });

    const productsWithPrices = await Promise.all(
      products.data.map(async (product) => {
        const prices = await stripe.prices.list({
          product: product.id,
          active: true
        });

        return {
          id: product.id,
          name: product.name,
          description: product.description,
          prices: prices.data.map((price) => ({
            id: price.id,
            unit_amount: price.unit_amount,
            currency: price.currency,
            interval: price.recurring?.interval ?? null,
            interval_count: price.recurring?.interval_count ?? 1
          }))
        };
      })
    );

    return productsWithPrices;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}