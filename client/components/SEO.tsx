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
        <link rel="canonical" href="https://live-board.vercel.app/" />
        <meta property="og:title" content={title} key="title" />
        <meta name="description" content={description}></meta>
        <meta name="twitter:title" content="Liveboard" />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:site" content="@AgarwalAmn" />
        <meta name="twitter:creator" content="@AgarwalAmn"></meta>
        <meta
          name="twitter:image"
          content="https://twitter.com/AgarwalAmn/photo"
        />
      </Head>
      {children}
    </>
  );
}
