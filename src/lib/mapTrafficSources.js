// utils/mapTrafficSources.js
export function mapTrafficSources(sources = []) {
    const colorMap = {
        organic: "#FF4717",      // chartDeepOrange
        direct: "#4BD1F5",       // chartLightBlue
        referral: "#83D687",     // chartLightGreen
        social: "#E556B1",       // chartPink
        other: "#8D41AB",        // chartPurple
    };

    // Kategorileri tanımla
    const categorized = {
        organic: 0,
        direct: 0,
        referral: 0,
        social: 0,
        other: 0,
    };

    // Kaynakları uygun kategoriye ata
    sources.forEach(item => {
        const source = item.source.toLowerCase();

        if (source.includes("google") || source.includes("yandex") || source.includes("bing")) {
            categorized.organic += item.sessions;
        } else if (source.includes("direct")) {
            categorized.direct += item.sessions;
        } else if (source.includes("referral")) {
            categorized.referral += item.sessions;
        } else if (
            source.includes("facebook") ||
            source.includes("instagram") ||
            source.includes("vk") ||
            source.includes("tiktok") ||
            source.includes("telegram")
        ) {
            categorized.social += item.sessions;
        } else {
            categorized.other += item.sessions;
        }
    });

    // Chart’a uygun formata dönüştür
    return Object.entries(categorized)
        .filter(([_, value]) => value > 0)
        .map(([key, value]) => ({
            name: key.charAt(0).toUpperCase() + key.slice(1),
            value,
            color: colorMap[key],
        }));
}
