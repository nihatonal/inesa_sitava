import React, { useEffect, useState } from 'react'
import CountryDetail from '../../components/CountryDetail'
import { Link, useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { fetchRelatedBlogs } from '../../hooks/useRecommended';
import dayjs from "../../lib/dayjsConfig.js";
import SectionHero from '../../components/SectionHero';
import Container from '../../components/Container';
import SEO from '../../components/SEO';
const CountryDetails = () => {
    const { cid } = useParams();

    const { t } = useTranslation('destinations');
    const { t: tcommon } = useTranslation('common');

    const [related, setRelated] = useState([]);
    const country = Object.values(
        t("countries", { returnObjects: true })
    ).filter((item) => item.slug === cid)[0];

    //fetchRelatedBlogs
    useEffect(() => {
        fetchRelatedBlogs({
            categories: [],
            destination: { slug: cid } || null,
            excludeId: null,
        })
            .then((data) => {
                setRelated(data);


            })
            .catch((err) => {
                console.error(err);
            });
    }, [cid]);

    // === JSON-LD ===
    const jsonLD = {
        "@context": "https://schema.org",
        "@type": "TouristDestination",

        "name": country.name,
        "description": country.description,
        "slogan": country.motto,
        "image": `https://www.sitava-travel.com${country.heroImage}`,
        "url": `https://www.sitava-travel.com/destinations/${country.slug}`,

        "climate": {
            "@type": "Climate",
            "weather": country.weather?.temp,
            "bestTimeToVisit": country.weather?.bestTime,
            "season": country.weather?.season
        },

        "hasPart": country.beaches.map((b, i) => ({
            "@type": "TouristAttraction",
            "name": b.name,
            "description": b.desc,
            "position": i + 1,
            "url": `https://www.sitava-travel.com/destinations/${country.slug}#${b.name.toLowerCase().replace(/\s+/g, "-")}`
        })),

        "offers": {
            "@type": "OfferCatalog",
            "name": `Почему выбрать ${country.name}`,
            "itemListElement": country.highlights.map((h, i) => ({
                "@type": "Offer",
                "name": h.title,
                "description": h.text,
                "position": i + 1
            }))
        },

        "geo": {
            "@type": "Place",
            "name": country.name
        },

        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://www.sitava-travel.com/destinations/${country.slug}`
        }
    };
    return (
        <>
            <SEO
                title={`${country.name} — Направление | Sitava Travel`}
                description={country.description}
                jsonLD={jsonLD}
            />
            {/* Hero */}
            <SectionHero
                title={country.name}
                subtitle={country.motto}
                image={country.heroImage}
                nav={[
                    { label: tcommon("countryDetail.navigation.home"), to: "/" },
                    { label: tcommon("countryDetail.navigation.countries"), to: "/destinations" },
                    { label: country.name } // son item: link yok
                ]}
            />

            <CountryDetail
                name={country.name}
                motto={country.motto}
                description={country.description}
                weather={country.weather}
                beaches={country.beaches}
                highlights={country.highlights}
                heroImage={country.heroImage}
            />
            <Container>
                {/* RELATED */}
                {related.length > 0 && (
                    <div className="mt-16 pb-12">
                        <h3 className="text-2xl font-bold mb-6">Похожие статьи</h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {related.map((r) => (
                                <Link
                                    key={r._id}
                                    to={`/blogs/${r.slug}`}
                                    className="bg-white rounded-xl shadow overflow-hidden hover:shadow-lg transition"
                                >
                                    <img
                                        src={r.imageUrl}
                                        alt={r.imageAlt}
                                        className="h-40 w-full object-cover"
                                    />
                                    <div className="p-4">
                                        <h4 className="font-semibold text-sm">{r.title}</h4>
                                        <p className="text-xs text-secondary/60 mt-1">
                                            {dayjs(r.publishedAt).format("D MMM YYYY")}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </Container>



        </>
    )
}

export default CountryDetails