import { articles } from "./articles/articles.server";
import { queries as articlesQueries } from "./articles/helpers";
import { categories } from "./categories/categories.server";
import { queries as categoriesQueries } from "./categories/helpers";
import { queries as membersQueries } from "./members/helpers";
import { members } from "./members/members.server";
import { og, queries as ogQueries } from "./og-images.server";
import { social } from "./social.server";

const queries = {
	categories: categoriesQueries,
	articles: articlesQueries,
	members: membersQueries,
	og: ogQueries,
} as const;

export const api = {
	categories,
	articles,
	members,
	social,
	og,
	queries,
} as const;
