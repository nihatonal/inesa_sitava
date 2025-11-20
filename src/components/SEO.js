// components/SEO.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
const SEO = ({ title, description, jsonLD }) => {
    const location = useLocation();
    const canonical = `https://www.travel.ru${location.pathname}`;

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonical} />

            {jsonLD && (
                <script type="application/ld+json">
                    {JSON.stringify(jsonLD)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
