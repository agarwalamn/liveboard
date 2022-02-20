import React, { PropsWithChildren } from 'react';
import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
}

const DEFAULT_SEO_CONFIG = {
  title: 'LiveBoard',
  description: 'live board sharing',
  site: 'https://live-board.vercel.app',
  image:
    'https://raw.githubusercontent.com/agarwalamn/liveboard/main/client/public/logo_square.png',
  twitter_handle: '@AgarwalAmn',
};

export default function SEO({
  title = DEFAULT_SEO_CONFIG.title,
  description = DEFAULT_SEO_CONFIG.description,
  children,
}: PropsWithChildren<SEOProps>) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/logo.svg" />
        <meta name="description" content={description}></meta>

        {/* Twitter */}
        <meta name="twitter:card" content="summary" key="twcard" />
        <meta name="twitter:site" content={DEFAULT_SEO_CONFIG.site} />
        <meta
          name="twitter:creator"
          content={DEFAULT_SEO_CONFIG.twitter_handle}
          key="twhandle"
        />
        <meta name="twitter:title" content={title} key="twtitle" />
        <meta
          name="twitter:description"
          content={description}
          key="twdescription"
        />
        <meta
          property="twitter:image"
          content={DEFAULT_SEO_CONFIG.image}
          key="twimage"
        />
        {/* Open Graph */}
        <meta property="og:url" content={DEFAULT_SEO_CONFIG.site} key="ogurl" />
        <meta
          property="og:image"
          content={DEFAULT_SEO_CONFIG.image}
          key="ogimage"
        />
        <meta
          property="og:site_name"
          content={DEFAULT_SEO_CONFIG.title}
          key="ogsitename"
        />
        <meta property="og:title" content={title} key="ogtitle" />
        <meta property="og:description" content={description} key="ogdesc" />
      </Head>
      {children}
    </>
  );
}
