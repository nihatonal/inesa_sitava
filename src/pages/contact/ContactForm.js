import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { AiOutlinePhone } from "react-icons/ai";
import { SiTelegram, SiWhatsapp } from "react-icons/si";
import { useToast } from "../../hooks/use-toast";
import Spinner from "../../components/ui/Spinner";
import { useTranslation } from "react-i18next";
const ContactForm = () => {
  const { t } = useTranslation("contact");
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    message: "",
    contactMethod: "Телефон",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "phone"
            ? formatPhone(value)
            : value,
    }));
  };

  const handleContactMethod = (method) => {
    setFormData((prev) => ({ ...prev, contactMethod: method }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);


    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/forms/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // formData içindeki tüm alanları gönderiyoruz
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Ошибка при отправке формы");
      }

      // Başarılıysa
      toast({
        title: t("success"),
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        destination: "",
        message: "",
        contactMethod: "Телефон",
        agree: false,
      });

    } catch (err) {
      toast({
        title: "Ошибка",
        description: t("error"),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };


  const contactOptions = [
    { id: "phone", label: "Телефон", icon: <AiOutlinePhone size={20} className='' /> },
    { id: "telegram", label: "Telegram", icon: <SiTelegram size={20} className='text-[#1d98dc]' /> },
    { id: "whatsapp", label: "WhatsApp", icon: <SiWhatsapp size={20} className='text-[#27d061]' /> },
  ];

  const formatPhone = (value) => {
    // Sadece rakamları al
    let digits = value.replace(/\D/g, "");

    // Eğer +7 ile başlıyorsa, +7’yi koruyalım
    let prefix = "";
    if (digits.startsWith("7") || digits.startsWith("8")) {
      prefix = digits.startsWith("7") ? "+7" : "8";
      digits = digits.slice(1); // ilk rakamı kaldır
    } else if (digits.startsWith("9")) {
      // 9 ile başlıyorsa otomatik +7 ekle
      prefix = "+7";
    } else {
      prefix = "+7";
    }

    // Maksimum 10 hane (ülke kodu hariç)
    digits = digits.slice(0, 10);

    let result = prefix;

    if (digits.length > 0) result += ` (${digits.slice(0, 3)}`;
    if (digits.length >= 4) result += `) ${digits.slice(3, 6)}`;
    if (digits.length >= 7) result += `-${digits.slice(6, 8)}`;
    if (digits.length >= 9) result += `-${digits.slice(8, 10)}`;

    return result;
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="flex flex-col md:grid md:grid-cols-2 gap-4 scroll-mt-24 bg-white rounded-2xl p-8 shadow-lg"
      onSubmit={handleSubmit}
      id="contact-form"
    >
      {/* İsim Soyisim */}
      <div>
        <label className="block text-sm font-bold text-primary-dark mb-1">
          {t("nameLabel")}
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-input bg-transparent rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary outline-none transition"
          placeholder={t("namePlaceholder")}
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-bold text-primary-dark mb-1">
          {t("emailLabel")}
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-input bg-transparent rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary outline-none transition"
          placeholder={t("emailPlaceholder")}
        />
      </div>

      {/* Telefon */}
      <div>
        <label className="block text-sm font-bold text-primary-dark mb-1">
          {t("phoneLabel")}
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border border-input bg-transparent rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary outline-none transition"
          placeholder={t("phonePlaceholder")}
        />
      </div>

      {/* Destination */}
      <div>
        <label className="block text-sm font-bold text-primary-dark mb-1">
          {t("destinationLabel")}
        </label>
        <input
          type="text"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          className="w-full border border-input bg-transparent rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary outline-none transition"
          placeholder={t("destinationPlaceholder")}
        />
      </div>

      {/* İletişim Metodu */}
      <div className="col-span-2">
        <p className="text-sm font-bold text-primary-dark mb-2">
          {t("contactMethodTitle")}
        </p>
        <div className="flex gap-2 flex-wrap">
          {contactOptions.map((method) => (
            <button
              key={method.id}
              type="button"
              onClick={() => handleContactMethod(method.id)}
              className={`px-3 py-2 rounded-lg border text-sm font-medium flex items-center gap-1 transition
                ${formData.contactMethod === method.id
                  ? "bg-primary/30 text-primary-dark border-primary/50"
                  : "border-input text-primary-dark hover:bg-muted hover:text-primary-dark"
                }`}
            >
              {method.icon}
              <span className="hidden md:block">{t(`contactMethod.${method.id}`)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mesaj */}
      <div className="col-span-2">
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="5"
          className="w-full border border-input bg-transparent rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary outline-none transition resize-none"
          placeholder={t("messagePlaceholder")}
        />
      </div>

      {/* Onay Kutusu */}
      <label className="col-span-2 flex items-center gap-2 text-xs text-primary-dark">
        <input
          type="checkbox"
          name="agree"
          checked={formData.agree}
          onChange={handleChange}
          className="accent-primary/50 w-4 h-4"
          required
        />
        <span
          dangerouslySetInnerHTML={{
            __html: t("agreeText"),
          }}
        />
      </label>

      {/* Submit */}
      <button
        type="submit"
        className="col-span-2 ml-auto  mt-4  md:mt-0 w-48 bg-primary flex items-center justify-center text-muted rounded-full py-2 font-bold hover:bg-primary-dark transition"
      >
        {!loading ? t("submit") : <Spinner size={24} color="#fff" />}
      </button>
    </motion.form>
  );

};

export default ContactForm;
