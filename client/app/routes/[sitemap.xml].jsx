export const loader = () => {
  // handle "GET" request
  // separating xml content from Response to keep clean code.
  const content = `
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
      <loc>https://www.raavananstore.com/</loc>
      <priority>1.0</priority>
      </url>
      <url>
      <loc>https://www.raavananstore.com/about/</loc>
      <priority>1.0</priority>
      </url>
      <url>
      <loc>https://www.raavananstore.com/contact/</loc>
      <priority>1.0</priority>
      </url>
      <url>
      <loc>https://www.raavananstore.com/terms/</loc>
      <priority>1.0</priority>
      </url>
      
      </urlset>
      `;
  // Return the response with the content, a status 200 message, and the appropriate headers for an XML page
  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'xml-version': '1.0',
      encoding: 'UTF-8',
    },
  });
};
