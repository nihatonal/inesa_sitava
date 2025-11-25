// hooks/useTrekking.ts

import { sanityClient } from "../lib/sanityClient"


export const fetchTrekkingPackages = async () => {
  const query = `
    *[_type == "recommended"&& published == true]{
      _id,
      title,
      slug,
      location,
      recommendedLocations,
      price,
      days,
      difficulty,
      img
    } | order(publishedAt desc)
  `
  const result = await sanityClient.fetch(query)
  return result
}


export const fetchBlogCategories = async () => {
  const query = `
    *[_type == "blogcategory"]{
      
      title,
      "slug": slug.current,

    } | order(publishedAt desc)
  `
  return await sanityClient.fetch(query)
}
export const fetchBlogDestinations = async () => {
  const query = `
    *[_type == "blogdestination"]{
      
      title,
      "slug": slug.current,

    } | order(publishedAt desc)
  `
  return await sanityClient.fetch(query)
}

// 🟢 Tüm yayınlanmış blogları çek
export const fetchPublishedBlogs = async (lang) => {
  const query = `
    *[_type == "blog" && lang == $lang && published == true]{
      _id,
      title,
      "slug": slug.current,
      excerpt,
      "imageUrl": image.asset->url,
      "imageAlt": image.alt,
      categories[]->{
        title,
        "slug": slug.current
      },
      destination->{
        title,
        "slug": slug.current
      },
      "author":author.name,
      publishedAt,
      readingTime,
      views
    } | order(publishedAt desc)
  `
  return await sanityClient.fetch(query, { lang })
}


// 🟢 Tek blog çek (slug ile)
// fetchSingleBlog
export const fetchSingleBlog = async (slug, lang) => {
  const query = `
    *[_type == "blog" && lang == $lang && slug.current == $slug][0]{
      _id,
      title,
      excerpt,
      "slug": slug.current,
      body[],
      "imageUrl": image.asset->url,
      "imageAlt": image.alt,
      publishedAt,
      readingTime,
      views,
      "author":author.name,
      categories[]->{
        title,
        "slug": slug.current
      },
      destination->{
        title,
        "slug": slug.current
      }
    }
  `;
  return await sanityClient.fetch(query, { slug, lang });
};

// fetchRelatedBlogs
export const fetchRelatedBlogs = async ({ categories, destination, excludeId, lang }) => {
  const catSlugs = categories?.map((c) => c.slug) || [];
  const destSlug = destination?.slug || null;

  const query = `
    *[_type == "blog" 
      && lang == $lang 
      && published == true 
      && _id != $excludeId 
      && (
        count(categories[@->slug.current in $catSlugs]) > 0 ||
        destination->slug.current == $destSlug
      )
    ]{
      _id,
      title,
      "slug": slug.current,
      "imageUrl": image.asset->url,
      "imageAlt": image.alt,
      publishedAt
    } | order(publishedAt desc)[0...6]
  `;

  return await sanityClient.fetch(query, {
    lang,
    excludeId,
    catSlugs,
    destSlug
  });
};


// 🟢 View sayısını artır (blog görüntülendiğinde)
export const incrementBlogView = async (slug: string) => {
  try {
    await sanityClient
      .patch({
        query: `*[_type == "blog" && slug.current == $slug][0]`,
        params: { slug },
      })
      .setIfMissing({ views: 0 })
      .inc({ views: 1 })
      .commit();
  } catch (err) {
    console.error("View increment error:", err);
  }
};
export const shouldIncreaseView = (
  slug: string,
  cooldownMs = 300_000,             // ⏱ 5 dakika
  expireMs = 7 * 24 * 60 * 60 * 1000 // 🧹 7 günde otomatik temizleme
) => {
  if (typeof window === "undefined") return false;

  const key = `viewed-${slug}`;
  const saved = localStorage.getItem(key);
  const now = Date.now();

  if (saved) {
    const { last, created } = JSON.parse(saved);

    // 🔥 Expire süresi dolduysa tamamen sil
    if (now - created > expireMs) {
      localStorage.removeItem(key);
    } else {
      // 🕒 5 dakika cooldown kontrolü
      if (now - last < cooldownMs) {
        return false;
      }
    }
  }

  // Yeni değer yaz
  localStorage.setItem(
    key,
    JSON.stringify({ last: now, created: now })
  );

  return true;
};


export const fetchBlogViews = async (slug) => {
  return await sanityClient.fetch(
    `*[_type == "blog" && slug.current == $slug][0].views`,
    { slug }
  );
};
