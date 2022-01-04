import type { NextPage } from 'next';
import React from 'react';
import { NextRouter, useRouter } from 'next/router';

import { Playground } from 'components/Playground/Playground';

const PlaygroundPage: NextPage = () => {
  //   const router = useRouter();
  //   const {
  //     query: { option = HeroOption.Global },
  //   } = router;

  //   if (router.isFallback) {
  //     return <div>We are loading page for you</div>;
  //   }

  return <Playground />;
};

// Handles the case when option is anything other than the custom/global and redirects back to home
// export async function getServerSideProps({ query }: NextRouter) {
//   const { option } = query;

//   if (option !== HeroOption.Global && option !== HeroOption.Custom) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// }

export default PlaygroundPage;
