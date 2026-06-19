import { StatusDot } from "@hyperperfect/design-system";

const row = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  fontFamily: "'DM Sans', system-ui, sans-serif",
  fontSize: 14,
  color: "#4A352B",
};

export const Here = () => (
  <span style={row}>
    <StatusDot tone="slate" /> here
  </span>
);

export const Working = () => (
  <span style={row}>
    <StatusDot tone="terra" pulse /> working&hellip;
  </span>
);

export const Sizes = () => (
  <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
    <StatusDot tone="slate" size="sm" />
    <StatusDot tone="terra" size="md" />
  </div>
);
