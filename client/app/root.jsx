// import { Outlet , Links, Scripts, ScrollRestoration , Meta, LiveReload} from '@remix-run/react';

// // import slideshow from  'react-slideshow-image/dist/styles.css';
// // import FooterStyles from '~/old-app/components/NewFooter/NewFooter.css';

// export const links = ()=> ([
//   { rel: "stylesheet", href: slideshow },
//   { rel: "stylesheet", href: FooterStyles },
// ])

// export default function Root() {
//   return (
//     <html lang="en">
//       <head>
//         <meta charSet="utf-8" />
//         <link rel="icon" href="favicon.ico" />
//         <meta
//           name="viewport"
//           content="minimum-scale=1, initial-scale=1, width=device-width"
//         />
//         <meta name="theme-color" content="#000000" />
//         <meta
//           name="description"
//           content="இராவணன் அங்காடி, Raavanan Store"
//           data-react-helmet="true"
//         />
//         <meta
//           name="keywords"
//           content="இராவணன் அங்காடி, Raavanan Store, Raavanan Angaadi, இராவணன்,அங்காடி, "
//         />
//         <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />

//         <link rel="manifest" href="manifest.json" />

//         <link
//           rel="stylesheet"
//           href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
//         />
//         <link
//           href="https://fonts.googleapis.com/css2?family=Catamaran:wght@400;500;700&display=swap"
//           rel="stylesheet"
//         />
//         <link
//           rel="stylesheet"
//           href="https://fonts.googleapis.com/icon?family=Material+Icons"
//         />
//         <title>இராவணன் அங்காடி</title>
//         {/*  <Meta/> */}
//         <Links />
//       </head>
//       <body>

//           <Scripts />
//           <ScrollRestoration/>
//           <LiveReload/>
//       </body>
//     </html>
//   );
// }

import * as React from 'react';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { withEmotionCache } from '@emotion/react';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/material';
import { light as theme } from '~/mui/theme';
import ClientStyleContext from '~/mui/ClientStyleContext';

import Nav from '~/components/nav';
import Footer from '~/components/footer';

import IndexStyles from '~/styles.css';

export const links = () => [
  { rel: 'stylesheet', href: IndexStyles },
];
export const loader = async () => {
  const res = await fetch(`${process.env.API_URL}/api/category/`);
  const category = await res.json();
  return {
    category
  };
};

const Document = withEmotionCache(({ children, title }, emotionCache) => {
  const clientStyleData = React.useContext(ClientStyleContext);

  // Only executed on client
  useEnhancedEffect(() => {
    // re-link sheet container
    emotionCache.sheet.container = document.head;
    // re-inject tags
    const tags = emotionCache.sheet.tags;
    emotionCache.sheet.flush();
    tags.forEach((tag) => {
      // eslint-disable-next-line no-underscore-dangle
      emotionCache.sheet._insertTag(tag);
    });
    // reset cache to reapply global styles
    clientStyleData.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content={theme.palette.primary.main} />
        {/* {title ? <title>{title}</title> : null} */}
        <Meta />
        <Links />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap"
        />
        <meta
          name="emotion-insertion-point"
          content="emotion-insertion-point"
        />
        <meta
          name="description"
          content="இராவணன் அங்காடி, Raavanan Store"
          data-react-helmet="true"
        />
        <meta
          name="keywords"
          content="இராவணன் அங்காடி, Raavanan Store, Raavanan Angaadi, இராவணன்,அங்காடி, "
        />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />

        <link rel="manifest" href="manifest.json" />
        <link
          href="https://fonts.googleapis.com/css2?family=Catamaran:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <title>இராவணன் அங்காடி</title>
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
});

// https://remix.run/api/conventions#default-export
// https://remix.run/api/conventions#route-filenames
export default function App() {
  return (
    <Document>
      <Nav />
      <Outlet />
      <Footer />
    </Document>
  );
}
