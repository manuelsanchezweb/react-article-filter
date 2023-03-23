// Functions

import { Article } from "../types/types";

// 1. Extract the categories from the article data and return them as an array,
// Since we want only unique values, we will use the Set data structure
// E.g. ["qwik", "react", "vue"]
export function getUniqueCategories(articles: Article[]) {
  const categoriesSet = new Set(articles.map((article) => article.category));
  return Array.from(categoriesSet);
}

// 2. Filter the articles based on the category
// E.g. "qwik" -> [{...}, {...}]
export function filterArticlesByCategory(
  articles: Article[],
  category: string
) {
  return articles.filter((article) => article.category === category);
}

// 3. Filter the posts based on the search term
export function filterPostsBySearchTerm(articles: Article[], term: string) {
  const isInDescription = (article: Article) =>
    article.description?.toLowerCase().includes(term.toLowerCase().trim());
  const isInTitle = (article: Article) =>
    article.title.toLowerCase().includes(term.toLowerCase().trim());
  return articles.filter(
    (article) => isInDescription(article) || isInTitle(article)
  );
}
