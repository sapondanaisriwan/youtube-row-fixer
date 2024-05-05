function HorizontalLine({ borderBottom = true }) {
  return <>{borderBottom && <hr className="mx-3 dark:border-content3" />}</>;
}

export default HorizontalLine;
