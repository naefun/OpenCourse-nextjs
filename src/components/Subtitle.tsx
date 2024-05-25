const Subtitle = ({ label = "", className = "" }) => {
  return (
    <h1 className={`text-xl font-medium text-stone-500 ${className}`}>
      {label}
    </h1>
  );
};

export default Subtitle;
