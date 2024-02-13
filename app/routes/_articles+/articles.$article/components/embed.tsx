import { type PortableTextComponentProps } from "@portabletext/react";

export function Embed({ value }: PortableTextComponentProps<{ url: string }>) {
	return (
		<iframe
			className="aspect-video w-full rounded-md"
			src={value.url}
			title="Embeded link"
			allow="accelerometer;
				autoplay;
				clipboard-write;
				encrypted-media;
				gyroscope;
				picture-in-picture;
				web-share"
		/>
	);
}
