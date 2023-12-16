import { articles } from "./articles";
import { categories } from "./categories";
import { members } from "./members";
import { social } from "./social";

export const api = { articles, members, categories, social } as const;
