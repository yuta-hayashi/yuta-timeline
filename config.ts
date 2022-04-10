export const config = {
  siteRood:
    process.env.NODE_ENV === 'production'
      ? 'https://yuta.run'
      : 'http://localhost:3000',
}
