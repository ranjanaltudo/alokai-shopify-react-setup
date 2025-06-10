export async function GET(req: Request, { params }: { params: { handle: string } }) {
    const query = `
      query getProductByHandle($handle: String!) {
        productByHandle(handle: $handle) {
          id
          title
          description
          images(first: 1) {
            edges {
              node {
                url
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    `;
  
    const variables = { handle: params.handle };
  
    const res = await fetch(`https://${process.env.SHOPIFY_DOMAIN}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_TOKEN!,
      },
      body: JSON.stringify({ query, variables }),
    });
  
    const json = await res.json();
  
    const product = json.data.productByHandle;
    const variant = product.variants.edges[0].node;
    const variantId = variant.id.split('/').pop();
  
    return Response.json({
      title: product.title,
      description: product.description,
      image: product.images.edges[0]?.node.url || '',
      price: variant.price.amount,
      currency: variant.price.currencyCode,
      variantId,
      addToCartUrl: `https://${process.env.SHOPIFY_DOMAIN}/cart/${variantId}:1`,
    });
  }
  