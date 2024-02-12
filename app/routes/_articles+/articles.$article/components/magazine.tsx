import React from "react";
import { Document, Page, pdfjs } from "react-pdf";

import { type PortableTextTypeComponentProps } from "@portabletext/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ClientOnly } from "remix-utils/client-only";

import { HStack, Text } from "~/components/ui";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const options = {
	cMapUrl: "cmaps/",
	cMapPacked: true,
	standardFontDataUrl: "standard_fonts/",
};

export function Magazine({ value }: PortableTextTypeComponentProps<{ url: string }>) {
	return <ClientOnly fallback={null}>{() => <PDFViewer src={value.url} />}</ClientOnly>;
}

export function PDFViewer({ src }: { src: string }) {
	const [numPages, setNumPages] = React.useState<number>(0);
	const [pageNumber, setPageNumber] = React.useState<number>(1); // start on first page
	const [pageWidth, setPageWidth] = React.useState(0);

	function onDocumentLoadSuccess({ numPages: nextNumPages }: { numPages: number }) {
		setNumPages(nextNumPages);
	}

	function onPageLoadSuccess() {
		setPageWidth(window.innerWidth);
	}

	function goToNextPage() {
		setPageNumber((prevPageNumber) => prevPageNumber + 1);
	}

	function goToPreviousPage() {
		setPageNumber((prevPageNumber) => prevPageNumber - 1);
	}

	return (
		<>
			<div
				style={{ width: Math.max(pageWidth * 0.6, 390) }}
				className="relative flex items-center"
			>
				<div className="absolute z-10 flex w-full items-center justify-between px-2">
					<button
						onClick={goToPreviousPage}
						disabled={pageNumber <= 1}
						className="px-2 py-24 text-foreground hover:text-off-white-600 focus:z-20 disabled:cursor-not-allowed disabled:text-off-white-300"
					>
						<span className="sr-only">Previous</span>
						<ChevronLeft className="size-10" aria-hidden="true" />
					</button>

					<button
						onClick={goToNextPage}
						disabled={pageNumber >= numPages}
						className="px-2 py-24 text-foreground hover:text-off-white-600 focus:z-20 disabled:cursor-not-allowed disabled:text-off-white-300"
					>
						<span className="sr-only">Next</span>
						<ChevronRight className="size-10" aria-hidden="true" />
					</button>
				</div>

				<div className="mx-auto flex h-full justify-center">
					<Document
						file={src}
						onLoadSuccess={onDocumentLoadSuccess}
						options={options}
						renderMode="canvas"
					>
						<Page
							key={pageNumber}
							pageNumber={pageNumber}
							renderAnnotationLayer={false}
							renderTextLayer={false}
							onLoadSuccess={onPageLoadSuccess}
							width={Math.max(pageWidth * 0.6, 390)}
						/>
					</Document>
				</div>
			</div>
			<Pagination pageNumber={pageNumber} numPages={numPages} />
		</>
	);
}

function Pagination({ pageNumber, numPages }: { pageNumber: number; numPages: number }) {
	return (
		<nav className="grid w-full place-content-center">
			<HStack className="mt-8 gap-2" alignment="center/center">
				<Text.P>{pageNumber}</Text.P>
				<Text.P>/</Text.P>
				<Text.P>{numPages}</Text.P>
			</HStack>
		</nav>
	);
}
