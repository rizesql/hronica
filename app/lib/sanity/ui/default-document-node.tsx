import { SanityDocument } from "sanity";
import { Iframe } from "sanity-plugin-iframe-pane";
import { DefaultDocumentNodeResolver } from "sanity/desk";

function getPreviewUrl(doc: SanityDocument) {
	return `http://localhost:5173/articles/${doc.slug.current}`;
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
