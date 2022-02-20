import type { NextPage } from 'next';

import { Hero } from 'components/Hero';
import analytics from 'utils/Analytics';

const Home: NextPage = () => {
  analytics.page({
    title: 'Liveboard',
    href: `https://live-board.vercel.app/`,
    path: '/',
  });

  return <Hero />;
};

export default Home;
