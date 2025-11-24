import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ru"; // Rusça kullanıyorsan

dayjs.extend(relativeTime);
dayjs.locale("ru"); // İstersen "en", "tr", vs.

export default dayjs;
