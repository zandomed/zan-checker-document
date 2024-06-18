export default () => ({
  env: Bun.env.NODE_ENV || 'development',
  port: Bun.env.PORT || 3000,
})
