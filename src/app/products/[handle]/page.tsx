// app/product/[handle]/page.tsx
import { notFound } from 'next/navigation';

export default async function ProductDetail({ params }: { params: { handle: string } }) {
  const query = `
    query GetProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        title
        description
        images(first: 1) {
          edges {
            node {
              url
              altText
            }
          }
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  `;

  const res = await fetch(`https://${process.env.SHOPIFY_DOMAIN}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_TOKEN!,
    },
    body: JSON.stringify({
      query,
      variables: { handle: params.handle },
    }),
  });

  const { data } = await res.json();

  if (!data || !data.productByHandle) {
    return notFound(); // show 404 page if product not found
  }

  const product = data.productByHandle;
  const image = product.images.edges[0]?.node;

  return (
    <main className="p-4">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      {image && <img src={image.url} alt={image.altText || product.title} className="w-full h-64 object-cover rounded mb-4" />}
      <p className="mb-2 text-gray-700">{product.description}</p>
      <p className="text-lg font-semibold">
        {product.priceRange.minVariantPrice.currencyCode} {product.priceRange.minVariantPrice.amount}
      </p>
    </main>
  );
}
