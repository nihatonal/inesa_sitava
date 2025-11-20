// hooks/useTrekking.ts

import { sanityClient } from "../lib/sanityClient"


export const fetchTrekkingPackages = async () => {
    const query = `
    *[_type == "trekking"]{
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
