
export const FormatProductData = (product) => {
  // ... (Your formatProductData function remains the same)
  return {
    id: product.id || '',
    name: product.name || 'Unknown',
    category: product.category || 'Misc',
    price: parseFloat(product.price) || 0,
    weight: parseFloat(product.weight) || 0,
    stock: parseFloat(product.stock) || 0,
    url: product.url?.replace(/\$\{process\.env\.PUBLIC_URL\}/g, process.env.PUBLIC_URL) || '',
    page: parseInt(product.page, 10) || 1,
    thumbnails: Array.isArray(product.thumbnails)
      ? product.thumbnails.map(thumbnail =>
          thumbnail.replace(/\$\{process\.env\.PUBLIC_URL\}/g, process.env.PUBLIC_URL)
        )
      : [],
    description: product.description || '',
    place: product.place || '',
    sizecolor: product.sizecolor || '',
    productDetails: product.product_details || '',
    shipping: product.shipping || '',
  };
}

