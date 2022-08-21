import Document, { Head, Html, Main, NextScript } from 'next/document';

// import Script from 'next/script'
import { NEXT_PUBLIC_GOOGLE_ANALYTICS } from '@/constants/envValues';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/favicons/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicons/favicon-16x16.png"
          />
          <link rel="manifest" href="/favicons/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/favicons/safari-pinned-tab.svg"
            color="#5bbad5"
          />
          <meta name="msapplication-TileColor" content="#000000" />
          <meta name="theme-color" content="#000000" />
          <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
          <link rel="alternate" type="application/atom+xml" href="/atom.xml" />

          {/* Global site tag (gtag.js) - Google Analytics */}
          {NEXT_PUBLIC_GOOGLE_ANALYTICS && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
              ></script>
              <script
                dangerouslySetInnerHTML={{
                  __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${NEXT_PUBLIC_GOOGLE_ANALYTICS}');
`,
                }}
              />
            </>
          )}
          {/* <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${NEXT_PUBLIC_GOOGLE_ANALYTICS}');
            `}
          </Script> */}
        </Head>
        <body className="overflow-x-hidden bg-white text-black antialiased transition-colors dark:bg-gray-900 dark:text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
