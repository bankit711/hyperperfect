import { Pill, StatusDot } from "@hyperperfect/design-system";

export const Announcement = () => (
  <Pill variant="solid">
    <StatusDot tone="terra" /> Early access
  </Pill>
);

export const Suggestion = () => <Pill variant="outline">What can you do?</Pill>;
