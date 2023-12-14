import { articles } from "./articles";
import { categories } from "./categories";
import { members } from "./members";

export const api = { articles, members, categories } as const;
