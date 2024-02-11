import { FileUp } from "lucide-react";
import { Preview, type PreviewProps } from "sanity";

export function EmbedPreview(props: PreviewProps & { url: string }) {
	return <Preview value={{ url: props.url }} {...props} />;
}

export function EmbedIcon() {
	return <FileUp className="size-[15px]" />;
}
