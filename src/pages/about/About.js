import React from "react";
import SectionHero from "../../components/SectionHero";
import Container from "../../components/Container";
import { useTranslation } from "react-i18next";

import AboutIntro from "./components/AboutIntro";
import AboutFeatures from "./components/AboutFeatures";
import AboutTimeline from './components/AboutTimeline';
import AboutMissionVision from './components/AboutMissionVision'
import AboutGallery from './components/AboutGallery'
import AboutCTA from './components/AboutCTA'
import Stats from "./components/Stats";

export default function About() {
    const { t } = useTranslation("home");

    return (
        <section className="w-full bg-muted">
            <SectionHero
                title={t("about.title")}
                subtitle={t("about.text")}
                image="/assets/turkey_card.webp"
                nav={[
                    { label: "Главная", to: "/" },
                    { label: "О нас" }
                ]}
            />
            <Container className="py-16 md:py-24">
                {/* <Container className="py-16 md:py-24">
                <AboutIntro />
            </Container> */}

                <AboutFeatures />
                <AboutTimeline />
                <AboutMissionVision />
                <AboutGallery />
                <Stats />
                <AboutCTA />
            </Container>
        </section >
    );
}
