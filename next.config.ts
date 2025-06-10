const nextConfig = {
  env: {
    SHOPIFY_DOMAIN: process.env.SHOPIFY_DOMAIN,
    SHOPIFY_STOREFRONT_TOKEN: process.env.SHOPIFY_STOREFRONT_TOKEN,
  },
  images: {
    domains: ['cdn.shopify.com'],
  },
};

export default nextConfig;