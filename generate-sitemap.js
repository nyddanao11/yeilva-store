
const fs = require("fs");
const path = require("path");
const { SitemapStream, streamToPromise } = require("sitemap");

const baseUrl = "https://yeilvastore.com"; // Change this to your domain

// Define your static routes
const pages = [
  "",
  "login",
  "signup",
  "dealsofday",
  "needhelp",
];

async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname: baseUrl });

  pages.forEach((page) => {
    sitemap.write({ url: `/${page}`, changefreq: "weekly", priority: 0.8 });
  });

  sitemap.end();

  // Convert buffer to string before writing to file
  const sitemapData = await streamToPromise(sitemap).then((data) => data.toString());

  fs.writeFileSync(path.resolve(__dirname, "public/sitemap.xml"), sitemapData, "utf8");
  console.log("✅ Sitemap successfully created in /public/sitemap.xml");
}

generateSitemap();

