/**
 * Type declarations for
 *    import config from '~/config/environment'
 */
declare const config: {
  environment: string;
  modulePrefix: string;
  podModulePrefix: string;
  locationType: 'history' | 'hash' | 'none';
  rootURL: string;
  APP: {
    name: string;
    version: string;
    POST_STREAM_URL: string;
  };
};

export default config;
