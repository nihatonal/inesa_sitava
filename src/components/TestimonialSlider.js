import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Container from "./Container";
import { useTranslation } from "react-i18next";
import { Quote } from "lucide-react";
/*
  Kullanılan renkler (tailwind.config içinde bu isimlerin tanımlı olduğunu varsayalım):
  primary.DEFAULT -> #009FBA
  secondary.dark  -> #041E28
  accent.DEFAULT  -> #FFB85D
  background.DEFAULT -> #ebf5fa
  background.bullet   -> #c3e6eb
*/

const reviews = [
    {
        id: 1,
        name: "Ангелина Роуз",
        role: "Путешественник",
        text:
            "Солнечные панели украшают крышу, используя возобновляемую энергию для питания дома и даже отдавая излишки в сеть. Высокопроизводительная теплоизоляция и тройные стеклопакеты делают дом теплым и уютным.",
        rating: 4.5,
        avatar: "/assets/inessa.jpeg",
    },
    {
        id: 2,
        name: "Андрю Саймон",
        role: "Путешественник",
        text:
            "Дом идеально сочетает устойчивость и роскошь — с тех пор как я открыл EcoLand Residence, я знал, что хочу там жить. Сообщество и окружающая среда создают уникальное ощущение дома.",
        rating: 4.0,
        avatar: "/assets/inessa.jpeg",
    },
    {
        id: 3,
        name: "Мария До",
        role: "Путешественник",
        text:
            "В доме современная архитектура с чистыми линиями и просторными окнами, что наполняет интерьеры естественным светом. Отличный баланс дизайна и функциональности.",
        rating: 5.0,
        avatar: "/assets/inessa.jpeg",
    },
    {
        id: 4,
        name: "Иван Петров",
        role: "Путешественник",
        text:
            "Высокое качество материалов и продуманная планировка — всё это делает пребывание в доме особенно приятным. Я рекомендую это место тем, кто ценит комфорт и энергоэффективность.",
        rating: 4.5,
        avatar: "/assets/inessa.jpeg",
    },
    {
        id: 5,
        name: "Елена Смирнова",
        role: "Путешественник",
        text:
            "Приятная атмосфера, экологичные решения и стильный интерьер — идеальное сочетание для современного дома. Мне особенно понравились большие окна и светлые пространства.",
        rating: 3.5,
        avatar: "/assets/inessa.jpeg",
    },
];

const Star = ({ filled }) => {
    // filled: 0 = empty, 0.5 = half, 1 = full
    if (filled >= 1) {
        return (
            <svg className="w-4 h-4 inline-block" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.177c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.286 3.974c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.176 0L5.33 17.066c-.785.57-1.84-.197-1.54-1.118l1.286-3.974a1 1 0 00-.364-1.118L1.332 8.401c-.783-.57-.38-1.81.588-1.81h4.177a1 1 0 00.95-.69l1.286-3.974z"></path>
            </svg>
        );
    } else if (filled === 0.5) {
        return (
            <svg className="w-4 h-4 inline-block" viewBox="0 0 20 20" aria-hidden="true">
                <defs>
                    <linearGradient id="half">
                        <stop offset="50%" stopColor="currentColor" />
                        <stop offset="50%" stopColor="transparent" stopOpacity="1" />
                    </linearGradient>
                </defs>
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.177c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.286 3.974c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.176 0L5.33 17.066c-.785.57-1.84-.197-1.54-1.118l1.286-3.974a1 1 0 00-.364-1.118L1.332 8.401c-.783-.57-.38-1.81.588-1.81h4.177a1 1 0 00.95-.69l1.286-3.974z"
                    fill="url(#half)"
                    stroke="currentColor"
                    strokeWidth="0"
                />
            </svg>
        );
    } else {
        return (
            <svg className="w-4 h-4 inline-block" viewBox="0 0 20 20" fill="none" stroke="currentColor" aria-hidden="true">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.177c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.286 3.974c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.176 0L5.33 17.066c-.785.57-1.84-.197-1.54-1.118l1.286-3.974a1 1 0 00-.364-1.118L1.332 8.401c-.783-.57-.38-1.81.588-1.81h4.177a1 1 0 00.95-.69l1.286-3.974z" />
            </svg>
        );
    }
};

const Stars = ({ rating }) => {
    // produce array of 5 elements: 1, 0.5, or 0
    const res = [];
    let remaining = rating;
    for (let i = 0; i < 5; i++) {
        if (remaining >= 1) {
            res.push(1);
        } else if (remaining >= 0.5) {
            res.push(0.5);
        } else {
            res.push(0);
        }
        remaining -= 1;
        if (remaining < 0) remaining = 0;
    }
    return (
        <div className="inline-flex items-center gap-1 text-accent">
            {res.map((f, idx) => (
                <Star key={idx} filled={f} />
            ))}
        </div>
    );
};

const TestimonialSlider = () => {
    const { t } = useTranslation("home");
    const [activeIndex, setActiveIndex] = useState(1);
    return (
        <section className="py-16 md:py-24 bg-white">
            <Container className="  ">
                {/* Title */}
                <div className="text-center mb-10">
                    <p className="text-secondary font-medium  px-12 md:px-0 leading-tight">{t("testimonials.tagline")}</p>
                    <h2 className="font-heading text-3xl md:text-5xl font-bold text-secondary mt-2 leading-tight">{t("testimonials.title")}</h2>

                </div>

                {/* Swiper */}
                <Swiper
                    modules={[Pagination]}
                    centeredSlides={true}
                    slidesPerView={1}
                    initialSlide={1}
                    spaceBetween={24}
                    pagination={{
                        clickable: true,
                        bulletClass: "swiper-pagination-bullet custom-bullet",
                        bulletActiveClass: "swiper-pagination-bullet-active custom-bullet-active",
                    }}
                    breakpoints={{
                        768: { slidesPerView: 2, spaceBetween: 20 },
                        1024: { slidesPerView: 3, spaceBetween: 30 },
                    }}
                    onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                    className="testimonial-swiper"
                >
                    {reviews.map((r, idx) => (
                        <SwiperSlide key={r.id}>
                            <div
                                className="relative bg-background rounded-2xl p-6 sm:p-8 shadow-md border border-white/40 h-full flex flex-col justify-between overflow-visible"
                                aria-hidden={false}
                            >
                                {/* header */}
                                <div className="flex items-center gap-4">
                                    <img
                                        src={r.avatar}
                                        alt={r.name}
                                        className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                                    />
                                    <div>
                                        <h3 className="font-semibold text-secondary-dark">{r.name}</h3>
                                        <p className="text-sm text-secondary-dark/60">{r.role}</p>
                                    </div>
                                    <div className="ml-auto">
                                        <Stars rating={r.rating} />
                                    </div>
                                </div>

                                {/* text */}
                                <p className="mt-4 text-secondary-dark/70 leading-relaxed min-h-[84px]">
                                    “{r.text}”
                                </p>


                                {/* big circular quote at bottom-center */}
                                <div className="absolute left-1/2 -translate-x-1/2 -bottom-14">
                                    <div className={`${activeIndex === idx ? "bg-primary" : "bg-muted"} w-14 h-14 rounded-full  flex items-center justify-center shadow-lg -translate-y-1/2`}>
                                        <Quote className={`h-6 w-6 ${activeIndex === idx ? "text-muted" : "text-primary"}`} />
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Container>

            {/* Custom CSS for slide scaling/offset + bullets */}
            <style>{`
        /* bullets */
        .swiper-pagination{
            margin-top:60px;
        }
        .custom-bullet {
          width: 10px;
          height: 10px;
          background: #c3e6eb !important; /* background.bullet */
          opacity: 1;
          border-radius: 9999px;
          margin: 0 6px !important;
        }
        .custom-bullet-active {
          background: #009FBA !important; /* primary */
          transform: scale(1.3);
        }

        /* center slide bigger and lifted; side slides slightly lower */
        .testimonial-swiper :global(.swiper-slide) {
          transition: transform 300ms ease, box-shadow 300ms ease;
          transform-origin: center center;
        }

        /* default (non-active) slides: slightly lower */
        .testimonial-swiper :global(.swiper-slide) {
          transform: translateY(18px) scale(0.95);
          opacity: 0.95;
        }

        /* active slide: raised and bigger */
        .testimonial-swiper :global(.swiper-slide-active) {
          transform: translateY(0px) scale(1.02);
          z-index: 10;
          opacity: 1;
          box-shadow: 0 12px 30px rgba(4, 30, 40, 0.08);
        }

        /* second neighboring slides - give them a bit more offset on wide screens */
        @media (min-width: 1024px) {
          /* make visible three slides and emphasize center */
          .testimonial-swiper :global(.swiper-slide-prev),
          .testimonial-swiper :global(.swiper-slide-next) {
            transform: translateY(22px) scale(0.96);
            opacity: 0.95;
          }
        }

        /* ensure big quote circle overlaps card bottom and centered */
        .testimonial-swiper :global(.swiper-slide) .w-14 {
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
        }

        /* Improve responsiveness of text */
        @media (max-width: 640px) {
          .testimonial-swiper :global(.swiper-slide-active) {
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
        </section>
    );
};

export default TestimonialSlider;
