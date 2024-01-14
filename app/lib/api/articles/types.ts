import type { Article } from "./helpers";

import type { Tuple3, Tuple2, Tuple5 } from "~/lib/types";

export type ArrangedArticles = {
	firstCol: Tuple3<Article>;
	secondCol: Tuple2<Article>;
	thirdCol: Tuple5<Article>;
};
