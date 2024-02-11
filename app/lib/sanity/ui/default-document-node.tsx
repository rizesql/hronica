import { type SanityDocument } from "sanity";
import { Iframe } from "sanity-plugin-iframe-pane";
import { type DefaultDocumentNodeResolver } from "sanity/structure";

import { siteUrl } from "~/lib/app-info";

function getPreviewUrl(doc: SanityDocument) {
	return `${siteUrl}/articles/${doc.slug.current}`;
}

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, { schemaType }) => {
	switch (schemaType) {
		case `article`:
			return S.document().views([
				S.view.form(),
				S.view
					.component(Iframe)
					.options({
						url: getPreviewUrl,
					})
					.title("Preview"),
			]);
		default:
			return S.document().views([S.view.form()]);
	}
};
