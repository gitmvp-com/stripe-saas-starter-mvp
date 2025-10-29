export const getURL = (path: string = '') => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ??
    process?.env?.NEXT_PUBLIC_VERCEL_URL ??
    'http://localhost:3000/';

  url = url.startsWith('http') ? url : `https://${url}`;
  url = url.endsWith('/') ? url : `${url}/`;
  path = path.startsWith('/') ? path.slice(1) : path;

  return path ? `${url}${path}` : url;
};