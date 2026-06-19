import { Card, Heading, Badge, StatusDot } from "@hyperperfect/design-system";

const sans = { fontFamily: "'DM Sans', system-ui, sans-serif" };

export const Paper = () => (
  <Card variant="paper" style={{ maxWidth: 360, ...sans }}>
    <Heading level={3}>She learns from the work itself.</Heading>
    <p style={{ marginTop: 12, lineHeight: 1.6, color: "#4A352B" }}>
      From every email, call, and meeting, Patricia picks up your customers,
      suppliers, and the details that matter.
    </p>
  </Card>
);

export const White = () => (
  <Card variant="white" style={{ maxWidth: 320, ...sans }}>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: 12,
        textTransform: "uppercase",
        letterSpacing: "0.16em",
        color: "#C9694A",
      }}
    >
      <span>Hire #001</span>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
        <StatusDot tone="terra" /> Available soon
      </span>
    </div>
    <Heading level={3} style={{ marginTop: 20 }}>Patricia</Heading>
    <div style={{ color: "#C9694A", marginTop: 6 }}>Personal Assistant</div>
  </Card>
);

export const Ink = () => (
  <Card variant="ink" style={{ maxWidth: 360, ...sans }}>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Heading level={3} style={{ color: "#FCF7F0" }}>Permissions</Heading>
      <Badge tone="slate">Trust Level &middot; 2</Badge>
    </div>
    <p style={{ marginTop: 16, lineHeight: 1.6, color: "#F2C9B0" }}>
      She drafts, you decide. Nothing goes out without your say-so.
    </p>
  </Card>
);
