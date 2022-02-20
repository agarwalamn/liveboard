import type { NextPage } from 'next';
import React from 'react';
import { NextRouter, useRouter } from 'next/router';

import { Playground } from 'components/Playground/Playground';
import analytics from 'utils/Analytics';

const PlaygroundPage: NextPage = () => {
  const router = useRouter();
  const { roomId, username } = router.query;

  analytics.page({
    title: 'Liveboard',
    href: `https://live-board.vercel.app/`,
    roomId,
    username,
  });

  return <Playground />;
};

// Handles the case when option is anything other than the custom/global and redirects back to home
export async function getServerSideProps({ query }: NextRouter) {
  const { roomId, username } = query;

  if (!roomId && !username) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default PlaygroundPage;
