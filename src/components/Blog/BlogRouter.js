import React from'react';
import FacelessProfitBlogPost from './FacelessProfitBlogPost';
import AIPoweredContentMarketingBlog from './AIPoweredContentMarketingBlog';
import ContentMachineBlogPost from './ContentMachineBlogPost';
import ZeroToHeroBlogPost from './ZeroToHeroBlogPost';
import AiContentVaultBlogPost from './AiContentVaultBlogPost';
import { useParams } from 'react-router-dom';

export default function BlogRouter({ addToCart, youMayLikeProducts }) {
  const { slug } = useParams();

  if (slug === 'the-21-faceless-profit-model-for-global-income') {
    return <FacelessProfitBlogPost addToCart={addToCart} youMayLikeProducts={youMayLikeProducts} />;
  }
  if (slug === 'ai-powered-content-marketing') {
    return <AIPoweredContentMarketingBlog addToCart={addToCart} youMayLikeProducts={youMayLikeProducts} />;
  }
  if (slug === 'build-your-content-machine') {
    return <ContentMachineBlogPost addToCart={addToCart} youMayLikeProducts={youMayLikeProducts} />;
  }
   if (slug === 'zero-to-content-hero') {
    return <ZeroToHeroBlogPost addToCart={addToCart} youMayLikeProducts={youMayLikeProducts} />;
  }
  if (slug === 'ai-content-vault') {
    return <AiContentVaultBlogPost addToCart={addToCart} youMayLikeProducts={youMayLikeProducts} />;
  }
  return <div>Blog post not found.</div>;
}