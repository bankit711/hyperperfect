import { Eyebrow } from "@hyperperfect/design-system";

export const Numbered = () => (
  <Eyebrow>
    <span>01</span>
    <span style={{ height: 1, width: 56, background: "#5B91A8" }} />
    <span>The Problem</span>
  </Eyebrow>
);

export const TerraLabel = () => (
  <Eyebrow color="terra">
    <span style={{ width: 10, height: 10, borderRadius: "9999px", background: "#5B91A8" }} />
    Patricia &middot; Personal Assistant
  </Eyebrow>
);
