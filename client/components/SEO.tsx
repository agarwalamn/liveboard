import React, { PropsWithChildren } from 'react';
import Head from 'next/head';

interface SEOProps {
  title: string;
  description: string;
}

export default function SEO({
  title = 'LiveBoard',
  description = 'live board sharing',
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
        <meta name="twitter:creator" content="@AgarwalAmn" key="twhandle" />

        {/* Open Graph */}
        <meta
          property="og:url"
          content="https://live-board.vercel.app"
          key="ogurl"
        />
        <meta property="og:image" content="/logo.svg" key="ogimage" />
        <meta property="og:site_name" content="LiveBoard" key="ogsitename" />
        <meta property="og:title" content={title} key="ogtitle" />
        <meta property="og:description" content={description} key="ogdesc" />
      </Head>
      {children}
    </>
  );
}
