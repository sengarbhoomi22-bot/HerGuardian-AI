function FavoriteButton({ isFavorite, onToggle, className = "" }) {
  return (
    <button onClick={onToggle} className={`text-2xl ${className}`} aria-label="Toggle favorite">
      {isFavorite ? "❤️" : "🤍"}
    </button>
  );
}

export default FavoriteButton;
