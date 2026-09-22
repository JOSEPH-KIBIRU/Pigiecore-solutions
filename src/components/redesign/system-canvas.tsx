import {
  ArrowUpRight,
  BarChart3,
  Boxes,
  CreditCard,
  Database,
  Globe2,
  Sparkles,
} from "lucide-react";

const nodes = [
  { label: "Customers", icon: Globe2, className: "node-a" },
  { label: "Payments", icon: CreditCard, className: "node-b" },
  { label: "Data", icon: Database, className: "node-c" },
  { label: "Operations", icon: Boxes, className: "node-d" },
];

export function SystemCanvas() {
  return (
    <div className="system-canvas" aria-label="Illustration of a connected business system">
      <div className="canvas-grid" />
      <div className="canvas-glow glow-one" />
      <div className="canvas-glow glow-two" />
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="orbit-dot dot-one" />
      <div className="orbit-dot dot-two" />

      <div className="system-core">
        <div className="core-icon"><Sparkles size={20} /></div>
        <div>
          <div className="core-kicker">Pigiecore Solutions</div>
          <div className="core-title">We offer you customized services</div>
        </div>
        <div className="core-status"><span /> Live</div>
        <div className="core-bars">
          <span style={{ width: "80%" }} />
          <span style={{ width: "56%" }} />
          <span style={{ width: "68%" }} />
        </div>
      </div>

      {nodes.map(({ label, icon: Icon, className }) => (
        <div key={label} className={`system-node ${className}`}>
          <div className="node-icon"><Icon size={17} /></div>
          <div>
            <strong>{label}</strong>
          </div>
          <ArrowUpRight size={13} className="node-arrow" />
        </div>
      ))}

      <div className="metric-chip metric-one">
        <BarChart3 size={15} />
        <div><span>visibility</span></div>
      </div>
      <div className="metric-chip metric-two">
        <span className="live-dot" />
        <div><strong>24/7</strong><span>support</span></div>
      </div>

      <div className="canvas-footer-label">DESIGNED · ENGINEERED · SHIPPED</div>
    </div>
  );
}
