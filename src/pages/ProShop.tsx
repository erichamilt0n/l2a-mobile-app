import React from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function ProShop() {
  const products: Product[] = [
    {
      id: "1",
      name: "Sim Pistol",
      price: 499.99,
      image: "driver.jpg",
      category: "Firearms",
    },
    {
      id: "2",
      name: "Premium Ammunition",
      price: 49.99,
      image: "balls.jpg",
      category: "Accessories",
    },
    {
      id: "3",
      name: "Lodge2A Hat",
      price: 24.99,
      image: "glove.jpg",
      category: "Accessories",
    },
    {
      id: "4",
      name: "Trijicon Rental",
      price: 79.99,
      image: "polo.jpg",
      category: "Optics",
    },
    {
      id: "6",
      name: "Holosun Optic",
      price: 299.99,
      image: "wedges.jpg",
      category: "Optics",
    },
  ];

  return (
    <div className="min-h-screen pb-20 tablet:pb-0">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Pro Shop
          </h1>
          <p className="text-gray-400">
            Browse our collection of premium equipment
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
          <button className="px-4 py-2 bg-[#333e48] text-white rounded-lg hover:bg-[#4a5761] transition-colors">
            All Products
          </button>
          <button className="px-4 py-2 bg-dark-200 text-gray-400 rounded-lg hover:bg-[#4a5761] hover:text-white transition-colors">
            Firearms
          </button>
          <button className="px-4 py-2 bg-dark-200 text-gray-400 rounded-lg hover:bg-[#4a5761] hover:text-white transition-colors">
            Accessories
          </button>
          <button className="px-4 py-2 bg-dark-200 text-gray-400 rounded-lg hover:bg-[#4a5761] hover:text-white transition-colors">
            Optics
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-dark-100 rounded-xl overflow-hidden"
            >
              <div className="h-48 bg-dark-200 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-400">{product.category}</p>
                  </div>
                  <span className="text-lg font-bold text-white">
                    ${product.price}
                  </span>
                </div>
                <button className="w-full mt-4 py-2 px-4 bg-[#333e48] text-white rounded-lg hover:bg-[#4a5761] transition-colors flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Shopping Cart Preview */}
        <div className="fixed bottom-6 right-6">
          <button className="p-4 bg-[#333e48] text-white rounded-full shadow-lg hover:bg-[#4a5761] transition-colors">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
