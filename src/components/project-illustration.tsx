import { cn } from "@/lib/cn";
import { colorHex, type ColorName } from "@/lib/color-classes";

/**
 * Honest architecture diagrams — never fake screenshots. Each visual is drawn
 * from the system documented in the repository and rendered as inline SVG, so
 * it is crisp at any size and costs no network request.
 *
 * Design: one wide canvas (480x200), no decorative grid, Inter typography,
 * generous colour only where it carries meaning. The same drawing works in a
 * small card and in the large project-page figure.
 */

type DiagramProject = { slug: string; name: string; color: ColorName };

const INK = "#0f172a";
const MUTED = "#64748b";
const LINE = "#cbd5e1";
const FONT = "var(--font-inter), system-ui, sans-serif";

type Align = "start" | "middle" | "end";

function label(
  x: number,
  y: number,
  children: React.ReactNode,
  opts: { size?: number; weight?: number; fill?: string; anchor?: Align } = {}
) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={opts.anchor ?? "middle"}
      fill={opts.fill ?? MUTED}
      fontSize={opts.size ?? 12}
      fontWeight={opts.weight ?? 500}
      style={{ fontFamily: FONT }}
    >
      {children}
    </text>
  );
}

function Box({
  x,
  y,
  w,
  h,
  title,
  sub,
  hex,
  accent = false,
  dashed = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  sub?: string;
  hex: string;
  accent?: boolean;
  dashed?: boolean;
}) {
  return (
    <g key={title}>
      {accent && (
        <rect x={x} y={y} width={w} height={h} rx={12} fill={hex} opacity={0.09} />
      )}
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={12}
        fill={accent ? "none" : "#ffffff"}
        stroke={accent ? hex : LINE}
        strokeWidth={accent ? 1.8 : 1.3}
        strokeDasharray={dashed ? "4 4" : undefined}
      />
      {label(x + w / 2, y + (sub ? h / 2 - 1 : h / 2 + 4), title, {
        size: sub ? 13 : 13,
        weight: 600,
        fill: INK,
      })}
      {sub &&
        label(x + w / 2, y + h / 2 + 16, sub, { size: 11, fill: MUTED })}
    </g>
  );
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  hex,
  subtle = false,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  hex: string;
  subtle?: boolean;
}) {
  const color = subtle ? LINE : hex;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const px = -uy;
  const py = ux;
  const tip = `${x2},${y2}`;
  const left = `${x2 - ux * 8 + px * 4},${y2 - uy * 8 + py * 4}`;
  const right = `${x2 - ux * 8 - px * 4},${y2 - uy * 8 - py * 4}`;
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2 - ux * 8}
        y2={y2 - uy * 8}
        stroke={color}
        strokeWidth={subtle ? 1.3 : 1.8}
        strokeLinecap="round"
      />
      <polygon points={`${tip} ${left} ${right}`} fill={color} />
    </g>
  );
}

/* OneBit — multi-hop BLE mesh, end-to-end encrypted */
function OneBitDiagram({ hex }: { hex: string }) {
  const phone = (x: number, y: number, name: string, active: boolean) => (
    <g key={name}>
      <rect
        x={x - 17}
        y={y - 28}
        width={34}
        height={56}
        rx={9}
        fill="#ffffff"
        stroke={active ? hex : LINE}
        strokeWidth={active ? 2 : 1.4}
      />
      <rect
        x={x - 10}
        y={y - 21}
        width={20}
        height={34}
        rx={4}
        fill={active ? hex : "#eef2f7"}
        opacity={active ? 0.18 : 1}
      />
      <circle cx={x} cy={y + 19} r={2.6} fill={active ? hex : LINE} />
      {label(x, y + 44, name, { size: 11.5, weight: 600, fill: active ? INK : MUTED })}
    </g>
  );

  return (
    <g>
      {/* passive mesh links */}
      <g stroke={LINE} strokeWidth={1.3} strokeDasharray="4 5" opacity={0.85}>
        <line x1="74" y1="78" x2="158" y2="52" />
        <line x1="158" y1="52" x2="388" y2="104" />
        <line x1="74" y1="78" x2="148" y2="142" />
        <line x1="148" y1="142" x2="388" y2="104" />
      </g>
      {/* active multi-hop route */}
      <path
        d="M74 78 L148 142 L175 52 L388 104"
        fill="none"
        stroke={hex}
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {phone(57, 78, "you", true)}
      {phone(175, 52, "relay", false)}
      {phone(148, 142, "relay", false)}
      {phone(405, 104, "peer", true)}
      <g>
        <rect x="348" y="20" width="116" height="30" rx="15" fill="#ffffff" stroke={hex} strokeWidth={1.5} />
        <path
          d="M367 31 h-3 a4 4 0 0 0 0 8 h3 z M364 31 v-3 a5 5 0 0 1 10 0 v3"
          fill="none"
          stroke={hex}
          strokeWidth={1.5}
        />
        {label(416, 39.5, "AES-256-GCM", { size: 12, weight: 600, fill: INK })}
      </g>
    </g>
  );
}

/* FaceSnap — liveness → embedding → match → record or review */
function FaceSnapDiagram({ hex }: { hex: string }) {
  return (
    <g>
      <rect x="20" y="64" width="50" height="64" rx="12" fill="none" stroke={hex} strokeWidth={1.8} />
      <circle cx="45" cy="90" r="13" fill={hex} opacity={0.14} />
      <circle cx="45" cy="85" r="5" fill={hex} />
      <path d="M37 99 a8 8 0 0 1 16 0" fill={hex} />
      <Arrow x1={72} y1={96} x2={92} y2={96} hex={hex} />
      <Box x={94} y={69} w={78} h={54} title="liveness" sub="rPPG · blink" hex={hex} accent />
      <Arrow x1={174} y1={96} x2={194} y2={96} hex={hex} />
      <Box x={196} y={69} w={78} h={54} title="ArcFace" sub="512-d embedding" hex={hex} />
      <Arrow x1={276} y1={96} x2={296} y2={96} hex={hex} />
      <Box x={298} y={69} w={78} h={54} title="match" sub="cos ≤ 0.35" hex={hex} />
      <g stroke={LINE} strokeWidth={1.5} fill="none">
        <path d="M378 96 H392 V60 H402" />
        <path d="M392 96 V132 H402" />
      </g>
      <Box x={404} y={44} w={62} h={32} title="record" hex={hex} accent />
      <Box x={404} y={116} w={62} h={32} title="review" hex={hex} dashed />
      {label(240, 158, "verified matches become records · uncertain matches go to a human queue", {
        size: 11,
      })}
    </g>
  );
}

/* AIPFL-IDS — simulated federation: clients → FedAvg → shared model */
function AipflDiagram({ hex }: { hex: string }) {
  const client = (x: number, name: string) => (
    <Box key={name} x={x} y={16} w={106} h={40} title={name} sub="local traffic" hex={hex} />
  );
  return (
    <g>
      {client(34, "client 1")}
      {client(187, "client 2")}
      {client(340, "client 10")}
      <g stroke={hex} strokeWidth={1.7}>
        <path d="M87 58 L202 92" fill="none" />
        <path d="M240 58 L240 90" fill="none" />
        <path d="M393 58 L278 92" fill="none" />
      </g>
      <circle cx="240" cy="116" r="27" fill={hex} opacity={0.1} />
      <circle cx="240" cy="116" r="27" fill="none" stroke={hex} strokeWidth={2} />
      {label(240, 114, "FedAvg", { size: 13, weight: 600, fill: INK })}
      {label(240, 129, "aggregate", { size: 11 })}
      <Box x={110} y={152} w={260} h={42} title="shared model" sub="DNN 512→256→128→64→10 · simulated" hex={hex} accent />
    </g>
  );
}

/* PhishGuard — evidence + ensemble → two separate verdict fields */
function PhishingDiagram({ hex }: { hex: string }) {
  return (
    <g>
      <Box x={14} y={60} w={62} h={44} title="email" sub="MIME" hex={hex} accent />
      <Arrow x1={78} y1={82} x2={98} y2={82} hex={hex} />
      <Box x={100} y={60} w={84} h={44} title="parse" sub="headers · body" hex={hex} />
      <g stroke={LINE} strokeWidth={1.5} fill="none">
        <path d="M186 76 L204 43 H214" />
        <path d="M186 96 L204 129 H214" />
      </g>
      <Box x={216} y={24} w={132} h={38} title="TF-IDF ensemble" sub="P(phishing)" hex={hex} accent />
      <Box x={216} y={110} w={132} h={38} title="URL · sender · header" sub="bounded evidence" hex={hex} />
      <g stroke={LINE} strokeWidth={1.5} fill="none">
        <path d="M350 43 H366 V76 H374" />
        <path d="M366 129 V96 H374" />
      </g>
      <Box x={376} y={60} w={90} h={44} title="decision" sub="engine" hex={hex} accent />
      {label(240, 160, "two separate fields — never a single blended score", { size: 10.5 })}
      <Box x={120} y={168} w={116} h={26} title="P(phishing)" hex={hex} accent />
      <Box x={250} y={168} w={116} h={26} title="risk score" hex={hex} />
    </g>
  );
}

const DIAGRAMS: Record<string, (p: { hex: string }) => React.ReactNode> = {
  onebit: OneBitDiagram,
  faceSnap: FaceSnapDiagram,
  "aipfl-ids": AipflDiagram,
  phishguard: PhishingDiagram,
};

export function ProjectIllustration({
  project,
  className,
}: {
  project: DiagramProject;
  className?: string;
}) {
  const hex = colorHex[project.color];
  const Diagram = DIAGRAMS[project.slug];

  return (
    <div className={cn("relative overflow-hidden bg-[#fffdf9]", className)} aria-hidden="true">
      <svg
        viewBox="0 0 480 200"
        role="presentation"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <rect x="0" y="0" width="480" height="200" fill="#fffdf9" />
        <circle cx="12" cy="10" r="120" fill={hex} opacity={0.045} />
        {Diagram ? <Diagram hex={hex} /> : null}
      </svg>
    </div>
  );
}
