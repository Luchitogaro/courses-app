export const getCourseDuration = (minutes) => {
	const m = minutes % 60;
	const h = (minutes - m) / 60;
	const hhmm =
		(h < 10 ? '0' : '') +
		h.toString() +
		':' +
		(m < 10 ? '0' : '') +
		m.toString();
	return hhmm + (minutes >= 160 ? ' hours' : ' hour');
};
