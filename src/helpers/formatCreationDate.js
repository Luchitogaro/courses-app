import { format } from 'date-fns';

export const formatDate = (date) => {
	const dF = date.split('/');
	return format(new Date(dF[2], +dF[1] - 1, dF[0]), 'dd.MM.yyyy');
};

export const todayDate = () => {
	return format(new Date(), 'dd/MM/yyyy');
};
