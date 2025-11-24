import React from "react";
import { motion } from "framer-motion";
import { MapPin, Sun, Waves, Info } from "lucide-react";
import { Button } from "./ui/Button";
import { useTranslation } from "react-i18next";
import Container from "./Container";
export default function CountryDetail({
  description,
  weather,
  beaches,
  highlights,

}) {
  const { t } = useTranslation('common');
  return (
    <section className="w-full bg-background text-secondary">
      <Container className="px-6 md:px-4 py-12">
        {/* Description */}
        <p className="text-secondary/80  leading-relaxed text-lg">
          {description}
        </p>

        {/* Weather Section */}
        <div className="mt-12 bg-white rounded-3xl shadow-large p-6 grid md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <Sun className="text-primary w-8 h-8" />
            <div>
              <h3 className="font-bold text-secondary text-lg">{t("countryDetail.weatherSection.avgWeather")}</h3>
              <p className="text-secondary/70 text-sm">{weather.temp}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Info className="text-primary w-8 h-8" />
            <div>
              <h3 className="font-bold text-secondary text-lg">{t("countryDetail.weatherSection.bestSeason")}</h3>
              <p className="text-secondary/70 text-sm">{weather.bestTime}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Waves className="text-primary w-8 h-8" />
            <div>
              <h3 className="font-bold text-secondary text-lg">{t("countryDetail.weatherSection.seasons")}</h3>
              <p className="text-secondary/70 text-sm">{weather.season}</p>
            </div>
          </div>
        </div>

        {/* Beaches */}
        <h2 className="text-3xl font-heading font-bold mt-16">{t("countryDetail.beachesSection.title")}</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {beaches.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-large p-5"
            >
              <MapPin className="text-primary w-6 h-6 mb-2" />
              <h4 className="font-bold text-secondary">{b.name}</h4>
              <p className="text-secondary/70 text-sm mt-1">{b.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Highlights */}
        <h2 className="text-3xl font-heading font-bold mt-16">{t("countryDetail.highlightsSection.title")}</h2>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {highlights.map((h, i) => (
            <div key={i} className="bg-background-card rounded-xl shadow-large p-6">
              <h4 className="font-bold text-secondary text-xl">{h.title}</h4>
              <p className="text-secondary/70 mt-2 text-sm">{h.text}</p>
            </div>
          ))}
        </div>

        <Button className="mt-12">{t("countryDetail.buttons.viewTours")}</Button>
      </Container>
    </section>
  );
}
