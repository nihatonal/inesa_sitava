import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: '60hm63ft',
  dataset: 'production',
  apiVersion: '2025-11-20',
  useCdn: true,
  token: process.env.REACT_APP_SANITY_WRITE_TOKEN   // 🔥 Önemli
});

const builder = imageUrlBuilder(sanityClient);
export const urlFor = (source) => builder.image(source);
