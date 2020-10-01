export default (env = {}) => ({
  HOST: env.HOST,
  GITHUB_CLIENT_ID: env.GITHUB_CLIENT_ID,
  STRIPE_PUBLIC_KEY: env.STRIPE_PUBLIC_KEY,
});
