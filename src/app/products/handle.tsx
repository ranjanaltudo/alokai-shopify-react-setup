'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

export default function ProductDetailPage() {
  const { handle } = useParams()
  const [product, setProduct] = useState<any>(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    fetch(`/api/shopify/product/${handle}`)
      .then(res => res.json())
      .then(setProduct)
      .catch(console.error)
  }, [handle])

  if (!product) return <p>Loading...</p>

  const addToCartUrl = `https://${process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN}/cart/${product.variantId}:${quantity}`
  const buyNowUrl = addToCartUrl + '?checkout[step]=payment_method'

  return (
    <main className="max-w-xl mx-auto p-4">
      <img
        src={product.image}
        alt={product.title}
        className="w-full object-cover rounded mb-4"
      />
      <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
      <p className="text-gray-600 mb-2">{product.currency} {product.price}</p>
      <p className="mb-4">{product.description}</p>

      <div className="mb-4">
        <label htmlFor="quantity" className="mr-2">Quantity:</label>
        <input
          id="quantity"
          type="number"
          min="1"
          value={quantity}
          onChange={e => setQuantity(parseInt(e.target.value))}
          className="border rounded px-2 py-1 w-20"
        />
      </div>

      <div className="flex gap-2">
        <a
          href={`${product.addToCartUrl.split(':')[0]}:${quantity}`}
          target="_blank"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Add to Cart
        </a>
        <a
          href={buyNowUrl}
          target="_blank"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Buy Now
        </a>
      </div>
    </main>
  )
}
