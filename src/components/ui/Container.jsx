function Container({ classes, children }) {
  return (
    <div
      className={`min-w-[300px] w-[350px] mx-auto h-full overflow-hidden ${
        classes ? classes : ""
      }`}
    >
      {children}
    </div>
  );
}

export default Container;
