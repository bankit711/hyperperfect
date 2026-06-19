import { Heading, Emphasis } from "@hyperperfect/design-system";

export const Display = () => (
  <Heading level={1}>
    Meet <Emphasis>Patricia.</Emphasis>
  </Heading>
);

export const Section = () => (
  <Heading level={2}>
    Finally, support that <Emphasis>works 24/7.</Emphasis>
  </Heading>
);

export const Subsection = () => <Heading level={3}>A day with Patricia</Heading>;
