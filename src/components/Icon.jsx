const Icon = ({ variant, name, className, style }) => {
  if (variant === "Symbols") {
    return (
      <span style={style} className={"material-symbols-outlined " + className}>
        {name}
      </span>
    );
  } else if (variant === "Icon") {
    return (
      <span style={style} className={"material-icons " + className}>
        {name}
      </span>
    );
  } else {
    return (
      <span style={style} className={"material-icons-outlined " + className}>
        {name}
      </span>
    );
  }
};

export default Icon;
