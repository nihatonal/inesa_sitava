import { CheckCircle } from "lucide-react";
import Container from './Container';
import { useTranslation } from "react-i18next";
import { Button } from "./ui/Button";
import { Link } from "react-router-dom";

const WithUs = () => {
    const { t } = useTranslation('home');
    return (
        <section className="w-full bg-background py-16 md:py-24 relative overflow-hidden">
            {/* Balon ikonları */}
            <Container>
                <div className="container mx-auto md:px-6 grid lg:grid-cols-2 gap-10 items-center">

                    {/* Left images */}
                    <div className=" grid grid-cols-2 gap-4">
                        <img
                            src={"/assets/thailand-coast.webp"}
                            className="col-span-2 md:col-span-1 md:row-span-2 rounded-tl-full rounded-tr-full rounded-bl-full rounded-br-0 
                            w-full h-72 md:h-full object-cover shadow-large"
                            alt=""
                        />
                        <img
                            src={"/assets/vietnam-ha-long-river.webp"}
                            className="w-64 h-64 rounded-tl-full rounded-tr-full rounded-bl-0 rounded-br-full object-cover shadow-large"
                            alt=""
                        />


                        <img
                            src={"/assets/turkey_card.webp"}
                            className="w-64 h-64 rounded-tl-full rounded-tr-0 rounded-bl-full rounded-br-full object-cover shadow-large"
                            alt=""
                        />
                    </div>

                    {/* Right text */}
                    <div className="relative">
                        <h3 className="text-secondary font-medium">{t("withus.tagline")}</h3>

                        <h2 className="font-heading text-4xl md:text-5xl font-bold text-secondary mt-2 md:leading-tight">
                            {t("withus.title")} <br />
                            <span className="text-primary">{t("withus.titleHighlight")}</span>
                        </h2>

                        <p className="relative z-10 text-secondary/70 mt-4 max-w-md">
                            {t("withus.description")}
                        </p>

                        <div className="relative z-10 mt-6 space-y-4">

                            {/* Feature */}
                            <div className="flex items-start gap-3">
                                <CheckCircle className="text-primary w-6 h-6" />
                                <div>
                                    <h4 className="font-bold text-secondary">{t("withus.features.exclusive.title")}</h4>
                                    <p className="text-secondary/80 text-sm">
                                        {t("withus.features.exclusive.text")}
                                    </p>
                                </div>
                            </div>

                            {/* Feature */}
                            <div className="flex items-start gap-3">
                                <CheckCircle className="text-primary w-6 h-6" />
                                <div>
                                    <h4 className="font-bold text-secondary">{t("withus.features.guide.title")}</h4>
                                    <p className="text-secondary/80 text-sm">
                                        {t("withus.features.guide.text")}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <Button asChild variant="link" className="mt-8">
                            <Link to="/aboutus" size="link" className="rounded-full px-8 py-3">
                                {t("withus.cta")}
                            </Link>
                        </Button>

                        {/* Right traveler image */}
                        <img
                            src={"/assets/inessa-transparent.png"}
                            className="absolute right-[-120px] top-[20px] w-96 hidden md:block"
                            alt=""
                        />
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default WithUs;
