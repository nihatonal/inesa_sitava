import React, { useEffect, useState } from 'react'
import Hero from '../../components/Hero'
import NewsCards from '../../components/NewsCards'
import NewsletterBanner from '../../components/NewsletterBanner'
import PopularDestinations from '../../components/PopularDestinations'
import RecommendedPlaces from '../../components/RecommendedPlaces'
import Skeleton from '../../components/Skeleton'
import Stats from '../../components/Stats'
import TestimonialSlider from '../../components/TestimonialSlider'
import WithUs from '../../components/WithUs'

const Home = () => {
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        // Simülasyon: sayfa yükleniyor
        const timer = setTimeout(() => {
            setIsLoaded(true)
        }, 800) // 0.8 saniye sonra content render
        return () => clearTimeout(timer)
    }, [])

    if (!isLoaded) {
        // Skeleton placeholder göster
        return (
            <div className="space-y-8 pb-12">
                <Skeleton height="h-screen" /> {/* Hero */}
                <Skeleton height="h-72" /> {/* Container */}
            </div>
        )
    }


    return (
        <div>
            <Hero />
            <PopularDestinations />
            <WithUs />
            <RecommendedPlaces />
            <TestimonialSlider />
            <NewsCards />

        </div>
    )
}

export default Home