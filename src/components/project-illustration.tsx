import { cn } from "@/lib/cn";
import { colorHex, type ColorName } from "@/lib/color-classes";

/**
 * Bespoke architecture illustrations — one per project, drawn as honest
 * technical diagrams (never fake screenshots). Each depicts the architecture
 * documented in the repository, so the visual explains the system instead of
 * decorating it. Rendered as inline SVG: crisp at any size, zero requests.
 */

type DiagramProject = {
  slug: string;
  name: string;
  color: ColorName;
};

const INK = "#0f172a";
const MUTED = "#64748b";
const LINE = "#cbd5e1";

function labelProps(x: number, y: number, anchor: "start" | "middle" | "end" = "middle") {
  return {
    x,
    y,
    textAnchor: anchor,
    fill: MUTED,
    fontSize: 9.5,
    letterSpacing: "0.02em",
    style: { fontFamily: "var(--font-geist-mono), monospace" },
  };
}

/* ------------------------------------------------------------------ */
/* OneBit — multi-hop BLE mesh: devices relay for each other, E2E      */
/* ------------------------------------------------------------------ */
function OneBitDiagram({ hex }: { hex: string }) {
  const node = (id: string, x: number, y: number, label: string, accent = false) => (
    <g key={id}>
      <rect
        x={x - 17}
        y={y - 27}
        width={34}
        height={54}
        rx={7}
        fill="#ffffff"
        stroke={accent ? hex : LINE}
        strokeWidth={accent ? 2 : 1.4}
      />
      <rect x={x - 9} y={y - 20} width={18} height={30} rx={3} fill={accent ? hex : "#f1f5f9"} opacity={accent ? 0.16 : 1} />
      <circle cx={x} cy={y + 17} r={2.4} fill={accent ? hex : LINE} />
      <text {...labelProps(x, y + 44)}>{label}</text>
    </g>
  );
  return (
    <g>
      {/* faint all-to-all mesh */}
      <g stroke={LINE} strokeWidth={1} strokeDasharray="3 4" opacity={0.6}>
        <line x1={78} y1={92} x2={210} y2={92} />
        <line x1={210} y1={92} x2={330} y2={150} />
        <line x1={78} y1={92} x2={160} y2={178} />
        <line x1={210} y1={92} x2={160} y2={178} />
      </g>
      {/* active multi-hop route */}
      <path
        d="M95 100 L143 168 L193 100 L313 150"
        fill="none"
        stroke={hex}
        strokeWidth={2.2}
        strokeLinecap="round"
      />
      <circle cx={95} cy={100} r={4} fill={hex} />
      <circle cx={160} cy={178} r={3} fill={hex} />
      <circle cx={313} cy={150} r={4} fill={hex} />
      {node("you", 78, 92, "you", true)}
      {node("relay-a", 210, 92, "relay")}
      {node("relay-b", 160, 178, "relay")}
      {node("peer", 330, 150, "peer", true)}
      {/* encryption badge */}
      <g>
        <rect x={300} y={44} width={92} height={26} rx={13} fill="#ffffff" stroke={hex} strokeWidth={1.2} />
        <path
          d="M312 55 h-3 a3 3 0 0 0 0 6 h3 z M309 55 v-3 a4 4 0 0 1 8 0 v3"
          fill="none"
          stroke={hex}
          strokeWidth={1.4}
        />
        <text {...labelProps(350, 61)} fill={INK} fontSize={9}>
          AES-256-GCM
        </text>
      </g>
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* FaceSnap — liveness → embedding → match → record or review queue    */
/* ------------------------------------------------------------------ */
function FaceSnapDiagram({ hex }: { hex: string }) {
  const stage = (x: number, title: string, sub: string) => (
    <g key={title}>
      <rect x={x} y={70} width={78} height={46} rx={8} fill="#ffffff" stroke={LINE} strokeWidth={1.4} />
      <text {...labelProps(x + 39, 90)} fill={INK} fontSize={10}>
        {title}
      </text>
      <text {...labelProps(x + 39, 103)} fontSize={8.5}>
        {sub}
      </text>
    </g>
  );
  const arrow = (x1: number, x2: number) => (
    <g key={x1}>
      <line x1={x1} y1={93} x2={x2 - 6} y2={93} stroke={LINE} strokeWidth={1.6} />
      <path d={`M${x2} 93 l-7 -4 l0 8 z`} fill={LINE} />
    </g>
  );
  return (
    <g>
      {/* camera frame */}
      <rect x={18} y={64} width={44} height={58} rx={6} fill="none" stroke={hex} strokeWidth={1.6} />
      <circle cx={40} cy={93} r={11} fill={hex} opacity={0.18} />
      <circle cx={40} cy={88} r={4} fill={hex} />
      <path d="M33 101 a7 7 0 0 1 14 0" fill={hex} />
      {stage(74, "liveness", "rPPG·blink")}
      {arrow(64, 74)}
      {stage(164, "ArcFace", "512-d")}
      {arrow(152, 164)}
      {stage(254, "match", "cos ≤ 0.35")}
      {arrow(242, 254)}
      {/* verdict split */}
      <line x1={332} y1={93} x2={348} y2={93} stroke={LINE} strokeWidth={1.6} />
      <line x1={348} y1={93} x2={348} y2={64} stroke={LINE} strokeWidth={1.6} />
      <line x1={348} y1={64} x2={360} y2={64} stroke={LINE} strokeWidth={1.6} />
      <line x1={348} y1={93} x2={348} y2={128} stroke={LINE} strokeWidth={1.6} />
      <line x1={348} y1={128} x2={360} y2={128} stroke={LINE} strokeWidth={1.6} />
      <g>
        <rect x={360} y={50} width={54} height={28} rx={6} fill={hex} opacity={0.12} />
        <rect x={360} y={50} width={54} height={28} rx={6} fill="none" stroke={hex} strokeWidth={1.4} />
        <text {...labelProps(387, 67)} fill={INK} fontSize={8.5}>
          record
        </text>
      </g>
      <g>
        <rect x={360} y={114} width={54} height={28} rx={6} fill="#ffffff" stroke={LINE} strokeWidth={1.2} strokeDasharray="3 3" />
        <text {...labelProps(387, 131)} fontSize={8.5}>
          review
        </text>
      </g>
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* AIPFL-IDS — simulated federation: clients → FedAvg → shared model   */
/* ------------------------------------------------------------------ */
function AipflDiagram({ hex }: { hex: string }) {
  const client = (x: number, label: string) => (
    <g key={label}>
      <rect x={x - 40} y={30} width={80} height={40} rx={8} fill="#ffffff" stroke={LINE} strokeWidth={1.4} />
      <text {...labelProps(x, 48)} fill={INK} fontSize={10}>
        {label}
      </text>
      <text {...labelProps(x, 60)} fontSize={8.5}>
        local traffic
      </text>
    </g>
  );
  return (
    <g>
      {client(80, "client 1")}
      {client(200, "client 2")}
      {client(320, "client 10")}
      {/* updates up / weights down */}
      <g stroke={hex} strokeWidth={1.8}>
        <line x1={80} y1={70} x2={175} y2={110} />
        <line x1={200} y1={70} x2={200} y2={108} />
        <line x1={320} y1={70} x2={225} y2={110} />
      </g>
      <path d="M175 110 l2 -8 l6 4 z" fill={hex} />
      <path d="M225 110 l-2 -8 l-6 4 z" fill={hex} />
      <path d="M200 108 l-4 -7 l8 0 z" fill={hex} />
      {/* FedAvg hub */}
      <circle cx={200} cy={140} r={30} fill={hex} opacity={0.12} />
      <circle cx={200} cy={140} r={30} fill="none" stroke={hex} strokeWidth={2} />
      <text {...labelProps(200, 138)} fill={INK} fontSize={10.5}>
        FedAvg
      </text>
      <text {...labelProps(200, 151)} fontSize={8}>
        aggregate
      </text>
      {/* model */}
      <line x1={200} y1={170} x2={200} y2={192} stroke={LINE} strokeWidth={1.6} />
      <g>
        <rect x={120} y={192} width={160} height={34} rx={8} fill="#ffffff" stroke={hex} strokeWidth={1.4} />
        <text {...labelProps(200, 207)} fill={INK} fontSize={9.5}>
          DNN 512→256→128→64→10
        </text>
        <text {...labelProps(200, 219)} fontSize={8}>
          per-dataset model
        </text>
      </g>
      {/* honesty tag */}
      <text {...labelProps(200, 246)} fontSize={8.5}>
        simulated federation · single process
      </text>
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Phishing — evidence + ensemble → separate probability & risk score  */
/* ------------------------------------------------------------------ */
function PhishingDiagram({ hex }: { hex: string }) {
  return (
    <g>
      {/* email */}
      <g>
        <rect x={16} y={78} width={64} height={40} rx={8} fill="#ffffff" stroke={hex} strokeWidth={1.6} />
        <path d="M28 90 h40 v20 h-40 z" fill="none" stroke={hex} strokeWidth={1.2} />
        <path d="M28 90 l20 12 l20 -12" fill="none" stroke={hex} strokeWidth={1.2} />
        <text {...labelProps(48, 132)} fontSize={8.5}>
          email
        </text>
      </g>
      <line x1={80} y1={98} x2={104} y2={98} stroke={LINE} strokeWidth={1.6} />
      <path d="M110 98 l-7 -4 l0 8 z" fill={LINE} />
      {/* parse */}
      <g>
        <rect x={110} y={78} width={70} height={40} rx={8} fill="#ffffff" stroke={LINE} strokeWidth={1.4} />
        <text {...labelProps(145, 96)} fill={INK} fontSize={9.5}>
          MIME parse
        </text>
        <text {...labelProps(145, 108)} fontSize={8}>
          headers·body
        </text>
      </g>
      {/* two evidence lanes */}
      <g stroke={LINE} strokeWidth={1.4}>
        <line x1={180} y1={98} x2={196} y2={66} />
        <line x1={180} y1={98} x2={196} y2={130} />
      </g>
      <g>
        <rect x={196} y={48} width={116} height={36} rx={8} fill={hex} opacity={0.1} />
        <rect x={196} y={48} width={116} height={36} rx={8} fill="none" stroke={hex} strokeWidth={1.3} />
        <text {...labelProps(254, 64)} fill={INK} fontSize={9.5}>
          TF-IDF ensemble
        </text>
        <text {...labelProps(254, 76)} fontSize={8}>
          P(phishing)
        </text>
      </g>
      <g>
        <rect x={196} y={112} width={116} height={36} rx={8} fill="#ffffff" stroke={LINE} strokeWidth={1.3} />
        <text {...labelProps(254, 128)} fill={INK} fontSize={9.5}>
          URL·sender·header
        </text>
        <text {...labelProps(254, 140)} fontSize={8}>
          bounded evidence
        </text>
      </g>
      {/* decision */}
      <g stroke={LINE} strokeWidth={1.4}>
        <line x1={312} y1={66} x2={330} y2={92} />
        <line x1={312} y1={130} x2={330} y2={104} />
      </g>
      <g>
        <rect x={330} y={78} width={74} height={40} rx={8} fill="#ffffff" stroke={hex} strokeWidth={1.6} />
        <text {...labelProps(367, 96)} fill={INK} fontSize={9.5}>
          decision
        </text>
        <text {...labelProps(367, 108)} fontSize={8}>
          engine
        </text>
      </g>
      {/* two separate outputs */}
      <text {...labelProps(254, 190)} fill={INK} fontSize={9}>
        two separate fields
      </text>
      <g>
        <rect x={150} y={200} width={100} height={32} rx={7} fill={hex} opacity={0.12} />
        <rect x={150} y={200} width={100} height={32} rx={7} fill="none" stroke={hex} strokeWidth={1.3} />
        <text {...labelProps(200, 220)} fill={INK} fontSize={9}>
          P(phishing)
        </text>
      </g>
      <g>
        <rect x={262} y={200} width={100} height={32} rx={7} fill="#ffffff" stroke={LINE} strokeWidth={1.3} />
        <text {...labelProps(312, 220)} fill={INK} fontSize={9}>
          risk score
        </text>
      </g>
    </g>
  );
}

const DIAGRAMS: Record<string, (p: { hex: string }) => React.ReactNode> = {
  onebit: OneBitDiagram,
  faceSnap: FaceSnapDiagram,
  "aipfl-ids": AipflDiagram,
  "phishing-detection": PhishingDiagram,
};

/**
 * A bespoke, honest architecture illustration for a project. Not a
 * screenshot and not a mockup — a labeled diagram of the documented system.
 */
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
    <div className={cn("relative overflow-hidden bg-[#fdfaf5]", className)} aria-hidden="true">
      <svg
        viewBox="0 0 420 260"
        role="presentation"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <pattern id={`grid-${project.slug}`} width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M16 0 H0 V16" fill="none" stroke="#e7e2d9" strokeWidth="0.6" opacity="0.6" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="420" height="260" fill="#fdfaf5" />
        <rect x="0" y="0" width="420" height="260" fill={`url(#grid-${project.slug})`} />
        {/* soft accent wash */}
        <circle cx="20" cy="18" r="120" fill={hex} opacity="0.06" />
        {Diagram ? <Diagram hex={hex} /> : null}
      </svg>
    </div>
  );
}
