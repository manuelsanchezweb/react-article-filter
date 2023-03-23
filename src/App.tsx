import { useEffect, useState } from "react";
import { IconSwitcher } from "./components/icons/IconSwitcher";
import { articles } from "./data/articles";

import { animate, stagger } from "motion";
import {
  filterArticlesByCategory,
  filterPostsBySearchTerm,
  getUniqueCategories,
} from "./functions/functions";
import { Article } from "./types/types";

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTerm, setSelectedTerm] = useState<string>("");

  let filteredArticles =
    selectedCategory === null
      ? articles
      : filterArticlesByCategory(articles, selectedCategory);

  filteredArticles = filterPostsBySearchTerm(filteredArticles, selectedTerm);

  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category);
  };

  const searchTerm = (event: any) => {
    setSelectedTerm(event.target.value);
  };

  useEffect(() => {
    const li = document.querySelectorAll("li");
    if (!li[0]) return;

    animate(
      li,
      { opacity: [0, 1], scale: [0, 1] },
      { delay: stagger(0.1), easing: "ease-in-out" }
    );
  }, [selectedCategory, selectedTerm]);

  return (
    <div className="App w-full">
      <h1 className="text-4xl">Últimos artículos del blog</h1>
      <div className="flex flex-wrap gap-4 my-8">
        <button
          onClick={() => handleCategoryClick(null)}
          className={selectedCategory === null ? "bg-gray-200" : ""}
        >
          All
        </button>
        {getUniqueCategories(articles).map((category, index) => (
          <button
            className={`flex gap-2 ${
              selectedCategory === category ? "bg-gray-200" : ""
            }`}
            key={index}
            onClick={() => handleCategoryClick(category)}
          >
            <IconSwitcher className="w-6" icon={category} /> {category}
          </button>
        ))}
        <div className="md:ml-auto">
          Search
          <input
            className="border ml-2 border-black pl-2 h-[48px] rounded-md"
            type="text"
            name="search"
            defaultValue={selectedTerm}
            onKeyUp={searchTerm}
          />
        </div>
      </div>
      <div>
        <ul className="flex flex-wrap gap-4">
          {filteredArticles[0] ? (
            filteredArticles.map((article: Article, index: number) => (
              <li
                key={article.id}
                className={`${
                  index < 4
                    ? "text-2xl min-w-[300px] lg:min-w-[600px] min-h-[300px]"
                    : "min-w-[300px] lg:min-w-[400px] lg:max-w-[450px]"
                } flex-1 border border-black rounded-md relative`}
              >
                <a href="#" className="text-black p-12 flex flex-col h-full">
                  <h2 className="font-bold mb-4">{article.title}</h2>
                  <p>{article.description}</p>
                  <IconSwitcher
                    icon={article.category}
                    className="w-8 absolute bottom-2 left-2"
                  />
                </a>
              </li>
            ))
          ) : (
            <p>No hay artículos que coincidan con tu búsqueda</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
