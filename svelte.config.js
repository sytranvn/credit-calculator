import adapter from 'svelte-adapter-static-sitemap' 
const dev = process.argv.includes('dev');
 
/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({ domain: process.env.DOMAIN }),
    paths: {
      base: dev ? '' : process.env.BASE_PATH,
    }
  }
};

export default config

