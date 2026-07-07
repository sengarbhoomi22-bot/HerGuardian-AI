function CategoryFilter({ categories, selectedCategory, onCategoryChange, activeClassName, inactiveClassName }) {
  return (
    <div className="mb-8 flex flex-wrap gap-3" aria-label="Category filters">
      {categories.map((item) => (
        <button
          key={item}
          onClick={() => onCategoryChange(item)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition duration-200 hover:-translate-y-0.5 ${
            selectedCategory === item ? activeClassName : inactiveClassName
          }`}
          aria-pressed={selectedCategory === item}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
