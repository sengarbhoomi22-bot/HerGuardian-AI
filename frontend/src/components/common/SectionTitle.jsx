function SectionTitle({ title, themeColor, subtitle, subtitleClassName = "text-gray-600" }) {
  return (
    <div className="mb-8">
      <h1 className={`mb-2 text-3xl font-bold sm:text-4xl ${themeColor}`}>{title}</h1>
      {subtitle && <p className={`max-w-2xl text-sm sm:text-base ${subtitleClassName}`}>{subtitle}</p>}
    </div>
  );
}

export default SectionTitle;
