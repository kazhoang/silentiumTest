import * as htmlEntities from 'html-entities';

export function pluralize(
	count: number,
	singular: string,
	plural: string = singular + 's',
) {
	return `${count} ${count <= 1 ? singular : plural}`;
}

export function getApplicationName(url: string): string {
	const parsedUrl = new URL(url);
	const domain = parsedUrl.host;
	return domain.replace('www.', '');
}

export function capitalize(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

const urlRe =
	/(?:^|\s)((https?:\/\/|\/\/)[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;

export function formatTextHtml(text: string) {
	text = htmlEntities.decode(text);
	const matches = text.matchAll(urlRe);

	for (const match of matches) {
		const href = match[1];
		text = text.replace(
			href,
			`<a href="${href}" rel="nofollow noreferrer">${href}</a>`,
		);
	}

	return text;
}
