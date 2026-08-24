function Loader({ text = "Loading..." }) {
  return (
    <div className="loader" role="status" aria-live="polite">
      <span>{text}</span>
    </div>
  );
}

export default Loader;
