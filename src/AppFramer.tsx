import { useState } from "react";
import { IconSwitcher } from "./components/icons/IconSwitcher";
import { articles } from "./data/articles";

import { AnimatePresence, motion } from "framer-motion";

type Article = {
  id: number;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
};

// Functions

// 1. Extract the categories from the article data and return them as an array,
// Since we want only unique values, we will use the Set data structure
// E.g. ["qwik", "react", "vue"]
function getUniqueCategories(articles: Article[]) {
  const categoriesSet = new Set(articles.map((article) => article.category));
  return Array.from(categoriesSet);
}

// 2. Filter the articles based on the category
// E.g. "qwik" -> [{...}, {...}]
function filterArticlesByCategory(articles: Article[], category: string) {
  return articles.filter((article) => article.category === category);
}

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredArticles =
    selectedCategory === null
      ? articles
      : filterArticlesByCategory(articles, selectedCategory);

  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category);
  };

  return (
    <div className="App">
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
      </div>
      <div>
        <AnimatePresence>
          <motion.ul layout className="flex flex-wrap gap-4">
            {filteredArticles.map((article: Article, index: number) => (
              <motion.li
                animate={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0.5 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  duration: 0.25,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
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
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
