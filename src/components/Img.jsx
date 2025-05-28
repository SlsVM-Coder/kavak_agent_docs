export function Img({ src, alt, width = "100%" }) {
  return (
    <div style={{ textAlign: "center", margin: "2rem 0" }}>
      <img src={src} alt={alt} style={{ width, maxWidth: "100%" }} />
    </div>
  );
}
