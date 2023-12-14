const WORDS_PER_MINUTE = 350;
const regex = /\w+/g;

export const readingTime = ({
	body,
	description,
}: {
	body: string;
	description: string;
}) => {
	const bodyWordCount = body.match(regex)?.length ?? 0;
	const descriptionWordCount = description.match(regex)?.length ?? 0;
	const totalWordCount = bodyWordCount + descriptionWordCount;

	return Math.ceil(totalWordCount / WORDS_PER_MINUTE);
};
