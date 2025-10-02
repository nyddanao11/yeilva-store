export const FormatCartData = (product) => {
    // 1. Get the raw thumbnail data from the product object
    const rawThumbnailData = product.thumbnails;

    // 2. Normalize the input data (handling the common single-string-in-an-array issue)
    const rawStringOrArray = Array.isArray(rawThumbnailData) && rawThumbnailData.length === 1
        ? rawThumbnailData[0] // Extract the single long string
        : rawThumbnailData; // Use the array or whatever else it is

    let allCleanThumbnails = [];

    if (typeof rawStringOrArray === 'string') {
        // If it's a single string (e.g., "url1 url2 url3")
        allCleanThumbnails = rawStringOrArray
            .split(/\s+/) // Split by one or more spaces
            .map(t => typeof t === 'string' ? t.replace(/"/g, '').trim() : '')
            .filter(Boolean); // Remove empty strings
    } else if (Array.isArray(rawStringOrArray)) {
        // Fallback for a correctly formatted PG array (e.g., ["url1", "url2"])
        allCleanThumbnails = rawStringOrArray
            .map(t => typeof t === 'string' ? t.replace(/"/g, '').trim() : '')
            .filter(Boolean);
    }

    // 3. Separate the main URL from the thumbnails
    const mainUrl = allCleanThumbnails.length > 0 ? allCleanThumbnails[0] : '';
    // The rest of the array becomes the secondary thumbnails
    const secondaryThumbnails = allCleanThumbnails.slice(1);

    // 4. Return the formatted object
    return {
        id: product.id || '',
        name: product.name || 'Unknown',
        category: product.category || 'Misc',
        quantity: parseFloat(product.quantity) || 0,
        price: parseFloat(product.price) || 0,
        weight: parseFloat(product.weight) || 0,
        stock: parseFloat(product.stock) || 0,
        discount: parseFloat(product.discount) || 0,
        page: parseInt(product.page, 10) || 1,

        // Now uses the cleaned main URL
        url: product.url?.replace(/\$\{process\.env\.PUBLIC_URL\}/g, process.env.PUBLIC_URL) || '',
        
        // This array now contains only the secondary images, avoiding duplication with `url`
        thumbnails: secondaryThumbnails, 

         thumbnails: Array.isArray(secondaryThumbnails)
      ?secondaryThumbnails.map(thumbnail =>
          thumbnail.replace(/\$\{process\.env\.PUBLIC_URL\}/g, process.env.PUBLIC_URL)
        )
      : [],

        description: product.description || '',
        place: product.place || '',
        sizecolor: product.sizecolor || '',
        shipping: product.shipping || '',
        productDetails: product.productDetails || product.product_details || '', 
    };
};