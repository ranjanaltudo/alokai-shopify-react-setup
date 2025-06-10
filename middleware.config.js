module.exports = {
  integrations: {
    shopify: {
      location: '@vue-storefront/shopify-api/server',
      configuration: {
        apiUrl: 'https://altudodemostore.myshopify.com/api/2023-01/graphql.json',
        storefrontToken: 'cd26e31586cc42eb45b430c6ab89e86a',
        domain: 'altudodemostore.myshopify.com',
        currency: 'USD',
        country: 'US'
      }
    }
  }
}

