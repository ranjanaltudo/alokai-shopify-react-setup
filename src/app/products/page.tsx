'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function ProductsPage() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('/api/shopify/products')
      .then(res => res.json())
      .then(setProducts)
      .catch(console.error)
  }, [])

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-2 gap-4">
      {products.map((product: any) => (
        <Link key={product.id} href={`/products/${product.handle}`}>
          <div className="border p-4 rounded shadow hover:shadow-md transition">
            <img
              src={product.image}
              alt={product.title}
              width ={400}
              height={300}
              className="w-full h-48 object-cover mb-2 rounded"
            />
            <h2 className="font-semibold text-lg">{product.title}</h2>
            <p className="text-gray-600 font-medium">
              {product.currency} {product.price}
            </p>
          </div>  
        </Link>
        ))}
      </div>
    </main>
  )
}
