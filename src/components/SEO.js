import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

export default function SEO({ title, description, image, jsonLD }) {
    const location = useLocation();
    const canonical = `https://www.sitava.ru${location.pathname}`;

    const metaTitle = title || "Sitava-Travel";
    const metaDesc = description || "Sitava-Travel — путешествия и туры";

    return (
        <Helmet>
            <title>{metaTitle}</title>
            <meta name="description" content={metaDesc} />
            <link rel="canonical" href={canonical} />

            {/* Open Graph */}
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={metaDesc} />
            <meta property="og:url" content={canonical} />
            <meta property="og:type" content="website" />
            {image && <meta property="og:image" content={image} />}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={metaTitle} />
            <meta name="twitter:description" content={metaDesc} />
            {image && <meta name="twitter:image" content={image} />}

            {jsonLD && (
                <script type="application/ld+json">
                    {JSON.stringify(jsonLD, null, 2)}
                </script>
            )}
        </Helmet>
    );
}
