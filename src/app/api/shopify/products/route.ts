export async function GET() {
  const query = `
{
  products(first: 10,sortKey: TITLE) {
    edges {
      node {
        id
        title
        handle
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
  }
}
  `;

  try {
    const res = await fetch(`https://${process.env.SHOPIFY_DOMAIN}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_TOKEN!,
      },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) {
      const text = await res.text();
      return new Response(`Shopify API Error: ${text}`, { status: 500 });
    }

    const json = await res.json();
   console.log(JSON.stringify(json, null, 2));
   return Response.json(
    json.data.products.edges.map((p: any) => {
      const product = p.node;
      return {
        id: product.id,
        title: product.title,
        handle: product.handle, // ✅ Add this
        image: product.images.edges[0]?.node.url || null,
        price: product.priceRange.minVariantPrice.amount,
        currency: product.priceRange.minVariantPrice.currencyCode
      };
    })
  );
  } catch (err) {
    return new Response(`Internal Server Error: ${err}`, { status: 500 });
  }
}
