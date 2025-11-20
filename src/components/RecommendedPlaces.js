import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Container from './Container';
import { Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import { useTranslation } from "react-i18next";
import { useEffect, useState } from 'react';
import { fetchTrekkingPackages } from '../hooks/useRecommended';
import { urlFor } from '../lib/sanityClient';
export default function RecommendedPlaces() {
    const { t } = useTranslation("home");
    const [places, setPlaces] = useState([])
    // const places = [
    //     {
    //         title: 'Ghorepani Poon Hill Trek',
    //         location: '@Bhutan, Pokhara',
    //         price: '$569.00/Person',
    //         days: '5 Days',
    //         img: '/assets/egypt_card.webp',
    //     },
    //     {
    //         title: 'Langtang Valley Trekking',
    //         location: '@Bhutan, India, Pokhara',
    //         price: '$600.00/Person',
    //         days: '6 Days',
    //         img: '/assets/maldives_card.webp',
    //     },
    //     {
    //         title: 'Short Trek - Pokhara',
    //         location: '@Bhutan, India, Tibet',
    //         price: '$250.00/Person',
    //         days: '6 Days',
    //         img: '/assets/hero_maldives__.webp',
    //     },
    //     {
    //         title: 'Island Peak Climbing',
    //         location: '@Nepal, Pokhara, Tibet',
    //         price: '$569.00/Person',
    //         days: '3 Days',
    //         img: '/assets/maldives_card.webp',
    //     },
    // ];

    useEffect(() => {
        fetchTrekkingPackages()
            .then((data) => {
                setPlaces(data)
                // setLoading(false)
            })
            .catch((err) => {
                console.error(err)
                // setLoading(false)
            })
    }, [])

    function getRussianDayWord(days) {
        days = Math.abs(days) % 100; // 11-14 durumları için
        const lastDigit = days % 10;

        if (days > 10 && days < 15) {
            return 'дней';
        }
        if (lastDigit === 1) {
            return ' день';
        }
        if (lastDigit >= 2 && lastDigit <= 4) {
            return ' дня';
        }
        return ' дней';
    }

    return (
        <div className="w-full bg-muted ">
            <Container className="py-16 text-center">
                <div className='flex flex-col items-center'>
                    <p className="text-secondary font-medium mb-1">{t("recommendedPlaces.tagline")}</p>
                    <h2 className="font-heading text-4xl md:text-5xl font-bold text-secondary mb-4 md:leading-tight">
                        {t("recommendedPlaces.title")}
                    </h2>
                    <p className="text-secondary/70 mb-10">
                        {t("recommendedPlaces.description")}
                    </p>

                </div>
                <div className='px-16 lg:px-0'>
                    <Swiper
                        modules={[Pagination]}
                        spaceBetween={20}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                            1280: { slidesPerView: 4 },
                        }}
                        className="pb-12"
                    >
                        {places.map((place, index) => (
                            <SwiperSlide key={index} >
                                <div className="relative bg-white group rounded-2xl cursor-pointer 
                                min-h-[350px] flex flex-col gap-2">

                                    <div className='overflow-hidden h-48 rounded-tr-xl rounded-tl-xl'>
                                        <img
                                            src={urlFor(place.img).width(400).height(300).url()}
                                            alt={place.title}
                                            className="w-full h-48 object-cover rounded-tr-xl rounded-tl-xl group-hover:scale-[1.1] transition duration-500"
                                        />
                                    </div>

                                    <div className='flex flex-col justify-between'>
                                        <div className="text-left px-3 space-y-1">
                                            <h3 className="text-lg font-semibold text-secondary ">{place.title}</h3>
                                            <p className="text-sm text-secondary/70">{place.location}</p>
                                            <div className="text-left flex items-center">
                                                <p className="text-primary font-bold text-lg">{place.price}$</p>
                                                <span>&nbsp; / &nbsp;</span>
                                                <span className="text-secondary/70 text-sm">{place.days} {getRussianDayWord(place.days)} </span>
                                            </div>
                                        </div>

                                        <button className="absolute bottom-3 right-3 px-4 py-2 rounded-xl bg-primary text-white text-sm hover:bg-primary-dark transition">
                                            Book Now
                                        </button>

                                    </div>

                                </div>
                            </SwiperSlide>

                        ))}
                    </Swiper>
                </div>

            </Container >
        </div>
    );
}
