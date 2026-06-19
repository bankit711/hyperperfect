import { Button } from "@hyperperfect/design-system";

export const Primary = () => <Button variant="primary">Join the Waitlist</Button>;

export const Secondary = () => <Button variant="secondary">Learn more</Button>;

export const SolidInk = () => <Button variant="solid-ink">Continue</Button>;

export const Ghost = () => <Button variant="ghost">Skip for now</Button>;

export const Sizes = () => (
  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
    <Button variant="primary" size="sm">Small</Button>
    <Button variant="primary" size="md">Medium</Button>
    <Button variant="primary" size="lg">Large</Button>
  </div>
);

export const Pill = () => (
  <Button variant="primary" shape="pill">Claim your spot &rarr;</Button>
);

export const Disabled = () => (
  <Button variant="primary" disabled>Joining&hellip;</Button>
);
