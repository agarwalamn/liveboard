import Analytics from 'analytics';
import googleAnalytics from '@analytics/google-analytics';

const analytics = Analytics({
  app: 'app-name',
  plugins: [
    googleAnalytics({
      trackingId: 'G-KTEJZCWD9Y',
    }),
  ],
});

/* export the instance for usage in your app */
export default analytics;
