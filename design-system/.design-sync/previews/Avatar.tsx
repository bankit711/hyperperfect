import { Avatar } from "@hyperperfect/design-system";

// Self-contained portrait placeholder (warm paper bg, coral figure) so the preview
// never depends on a network image. Real usage passes a headshot URL.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="#F5EAD9"/><circle cx="100" cy="74" r="38" fill="#C9694A"/><rect x="44" y="124" width="112" height="90" rx="46" fill="#C9694A"/></svg>`;
const SRC = `data:image/svg+xml,${encodeURIComponent(svg)}`;

export const Sizes = () => (
  <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
    <Avatar src={SRC} alt="Patricia" size="sm" />
    <Avatar src={SRC} alt="Patricia" size="md" />
    <Avatar src={SRC} alt="Patricia" size="lg" />
    <Avatar src={SRC} alt="Patricia" size="xl" />
  </div>
);

export const NoRing = () => <Avatar src={SRC} alt="Patricia" size="lg" ring={false} />;
