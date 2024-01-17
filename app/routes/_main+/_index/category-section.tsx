import { ArrowRight } from "lucide-react";

import { GridLayout } from "~/components/layouts/grid";
import {
	Flex,
	HStack,
	Link,
	Section as SectionLayout,
	Separator,
	Text,
} from "~/components/ui";
import { type ArrangedArticles } from "~/lib/api/articles/helpers";
import { type Category } from "~/lib/api/categories/helpers";
import { type Query, useQuery } from "~/lib/sanity/loader";

type Props = {
	articlesQuery: Query<ArrangedArticles>;
	category: Category;
	layout: number;
};

export function CategorySection({ articlesQuery, layout, category }: Props) {
	const articles = useQuery(articlesQuery);

	return (
		<>
			<SectionLayout
				className="h-auto border-t border-border py-8 lg:h-auto"
				style={{ backgroundColor: category.color }}
			>
				<HStack stretch="width" className="gap-8 px-8 pb-4">
					<Text.H1>{category.name}</Text.H1>
					<Link.Nav
						to={`/${category._slug}`}
						className="group scale-95 rounded-md bg-foreground px-3 py-2 transition-all hover:scale-100 hover:bg-transparent hover:!text-foreground"
						style={{ color: category.color }}
					>
						<Flex alignment="center/between" className="gap-4">
							Citeste mai mult
							<ArrowRight className="transition-transform group-hover:translate-x-1" />
						</Flex>
					</Link.Nav>
				</HStack>

				<Separator />

				<GridLayout layout={layout} articles={articles.data} />
			</SectionLayout>
		</>
	);
}
