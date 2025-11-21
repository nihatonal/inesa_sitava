import React from 'react'
import CountryDetail from '../../components/CountryDetail'
import { useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
const CountryDetails = () => {
    const { cid } = useParams();
    const { t } = useTranslation('destinations');
    const country = Object.values(
        t("countries", { returnObjects: true })
    ).filter((item) => item.slug === cid)[0];


    return (
        <>

            <CountryDetail
                name={country.name}
                motto={country.motto}
                description={country.description}
                weather={country.weather}
                beaches={country.beaches}
                highlights={country.highlights}
                heroImage={country.heroImage}
            />
        </>
    )
}

export default CountryDetails