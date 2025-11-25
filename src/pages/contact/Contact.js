import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { Mail, Phone, MapPin, Instagram, Facebook, MessageCircle } from "lucide-react";
import Container from "../../components/Container";
import ContactForm from "./ContactForm";
import SectionHero from "../../components/SectionHero";

export default function Contact() {
    const { t } = useTranslation("contact");
    const { t: tcommon } = useTranslation("common");


    return (
        <section className="w-full bg-muted ">
            <SectionHero
                title={tcommon("pages.contact.title")}
                subtitle={tcommon("pages.contact.subtitle")}
                image="/assets/contacts.webp"
                nav={[
                    { label: tcommon("nav.home"), to: "/" },
                    { label: tcommon("nav.contact") }
                ]}
            />
            <Container className="py-16 md:py-24">
                <div className="grid lg:grid-cols-2 gap-10">

                    {/* LEFT FORM */}
                    <ContactForm />

                    {/* RIGHT SIDE CONTACT INFO */}
                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-2xl shadow-large border border-secondary/20">
                            <h3 className="text-2xl font-bold text-secondary mb-4">
                                {t("contactInfo")}
                            </h3>

                            <address className="not-italic space-y-4">
                                <div className="flex items-start gap-3">
                                    <MapPin className="text-primary w-6 h-6" />
                                    <p className="text-secondary/80">{t("contactInfo.address")}</p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Phone className="text-primary w-6 h-6" />
                                    <a href="tel:+0000000000" className="text-secondary/80 hover:text-primary">
                                        +00 000 000 00 00
                                    </a>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Mail className="text-primary w-6 h-6" />
                                    <a
                                        href="mailto:info@travelcompany.com"
                                        className="text-secondary/80 hover:text-primary"
                                    >
                                        info@travelcompany.com
                                    </a>
                                </div>
                            </address>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-large border border-secondary/20">
                            <h3 className="text-2xl font-bold text-secondary mb-4">
                                {t("social")}
                            </h3>

                            <div className="flex gap-4">
                                <a href="#" className="p-3 rounded-full bg-background-bullet hover:bg-primary/20 transition">
                                    <Instagram className="w-6 h-6 text-secondary" />
                                </a>
                                <a href="#" className="p-3 rounded-full bg-background-bullet hover:bg-primary/20 transition">
                                    <Facebook className="w-6 h-6 text-secondary" />
                                </a>
                                <a href="#" className="p-3 rounded-full bg-background-bullet hover:bg-primary/20 transition">
                                    <MessageCircle className="w-6 h-6 text-secondary" />
                                </a>
                            </div>
                        </div>
                        {/* Support 24/7 Box — NEW */}
                        <div className="bg-secondary-light text-muted p-8 rounded-2xl shadow-large border border-secondary/20">
                            <h3 className="text-2xl font-bold mb-4">
                                {t("support.title")}
                            </h3>

                            <p className="leading-relaxed">
                                {t("support.text")}
                            </p>

                        </div>
                    </div>

                </div>
            </Container>
        </section>
    );
}
