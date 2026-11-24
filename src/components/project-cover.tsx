import { cn } from "@/lib/cn";
import { colorHex, type ColorName } from "@/lib/color-classes";

/**
 * Decorative card artwork: one bold motif per project, no text, no fake
 * screenshots. Meant to read like a designed cover image at card size.
 * The honest architecture diagrams remain on the case-study pages.
 */
type CoverProject = { slug: string; name: string; color: ColorName };

const SOFT: Record<ColorName, string> = {
  cobalt: "#eff6ff",
  coral: "#fdecea",
  tangerine: "#fff4e0",
  lavender: "#f3e8ff",
  emerald: "#dcfce7",
};

function OneBitCover({ hex }: { hex: string }) {
  const device = (x: number, y: number, active: boolean) => (
    <g key={`${x}-${y}`}>
      <rect x={x - 25} y={y - 40} width={50} height={80} rx={13} fill="#ffffff" stroke={active ? hex : "#cbd5e1"} strokeWidth={active ? 4 : 2.5} />
      <rect x={x - 15} y={y - 29} width={30} height={49} rx={6} fill={active ? hex : "#e8eef6"} opacity={active ? 0.25 : 1} />
      <circle cx={x} cy={y + 28} r={4} fill={active ? hex : "#cbd5e1"} />
    </g>
  );
  return (
    <g>
      <g stroke={hex} strokeWidth={2.5} strokeDasharray="6 8" opacity={0.35}>
        <path d="M110 76 L252 62 L370 104 L200 140 Z" fill="none" />
        <path d="M110 76 L200 140" fill="none" />
      </g>
      <path d="M110 76 L200 140 L370 104" fill="none" stroke={hex} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
      {device(110, 76, true)}
      {device(252, 62, false)}
      {device(200, 140, false)}
      {device(370, 104, true)}
      <circle cx="370" cy="104" r="62" fill="none" stroke={hex} strokeWidth={2} opacity={0.3} />
    </g>
  );
}

function FaceSnapCover({ hex }: { hex: string }) {
  return (
    <g>
      <rect x="166" y="18" width="148" height="164" rx="28" fill="#ffffff" stroke={hex} strokeWidth={4} />
      <g stroke={hex} strokeWidth={7} strokeLinecap="round" fill="none">
        <path d="M186 54 V40 H204" />
        <path d="M276 40 H294 V54" />
        <path d="M186 146 V160 H204" />
        <path d="M276 160 H294 V146" />
      </g>
      <circle cx="240" cy="86" r="30" fill={hex} opacity={0.2} />
      <circle cx="240" cy="80" r="13" fill={hex} />
      <path d="M215 122 a25 25 0 0 1 50 0" fill={hex} />
      <path d="M176 108 H304" stroke={hex} strokeWidth={3} opacity={0.5} />
      <circle cx="120" cy="62" r="10" fill={hex} opacity={0.45} />
      <circle cx="362" cy="138" r="14" fill={hex} opacity={0.3} />
      <circle cx="356" cy="50" r="6" fill={hex} opacity={0.4} />
    </g>
  );
}

function AipflCover({ hex }: { hex: string }) {
  return (
    <g>
      <circle cx="240" cy="100" r="78" fill="none" stroke={hex} strokeWidth={2} strokeDasharray="5 9" opacity={0.4} />
      <g stroke={hex} strokeWidth={3.5} opacity={0.7}>
        <path d="M94 56 L206 92" />
        <path d="M240 46 L240 54" />
        <path d="M386 56 L274 92" />
      </g>
      <circle cx="240" cy="100" r="48" fill={hex} opacity={0.14} />
      <circle cx="240" cy="100" r="48" fill="none" stroke={hex} strokeWidth={5} />
      <circle cx="240" cy="100" r="26" fill={hex} />
      <circle cx="94" cy="56" r="22" fill="#ffffff" stroke={hex} strokeWidth={3.5} />
      <circle cx="240" cy="46" r="22" fill="#ffffff" stroke={hex} strokeWidth={3.5} />
      <circle cx="386" cy="56" r="22" fill="#ffffff" stroke={hex} strokeWidth={3.5} />
      <circle cx="94" cy="56" r="8" fill={hex} opacity={0.5} />
      <circle cx="386" cy="56" r="8" fill={hex} opacity={0.5} />
    </g>
  );
}

function PhishGuardCover({ hex }: { hex: string }) {
  return (
    <g>
      <path
        d="M240 18 L342 56 V104 C342 148 296 174 240 188 C184 174 138 148 138 104 V56 Z"
        fill={hex}
        opacity={0.14}
        stroke={hex}
        strokeWidth={5}
        strokeLinejoin="round"
      />
      <path d="M190 92 H290 V138 H190 Z" fill="#ffffff" stroke={hex} strokeWidth={4} strokeLinejoin="round" />
      <path d="M190 94 L240 126 L290 94" fill="none" stroke={hex} strokeWidth={4} strokeLinejoin="round" />
      <path d="M240 126 V150" stroke={hex} strokeWidth={3} opacity={0.5} />
      <circle cx="348" cy="44" r="26" fill="#ffffff" stroke={hex} strokeWidth={3} opacity={0.9} />
      <path d="M348 31 L348 48" stroke={hex} strokeWidth={5} strokeLinecap="round" />
      <circle cx="348" cy="56" r="3" fill={hex} />
      <circle cx="132" cy="52" r="9" fill={hex} opacity={0.4} />
    </g>
  );
}

const COVERS: Record<string, (p: { hex: string }) => React.ReactNode> = {
  onebit: OneBitCover,
  faceSnap: FaceSnapCover,
  "aipfl-ids": AipflCover,
  phishguard: PhishGuardCover,
};

export function ProjectCover({ project, className }: { project: CoverProject; className?: string }) {
  const hex = colorHex[project.color];
  const Cover = COVERS[project.slug];
  const id = project.slug.replace(/[^a-z0-9]/gi, "");

  return (
    <div className={cn("relative overflow-hidden", className)} aria-hidden="true">
      <svg
        viewBox="0 0 480 200"
        role="presentation"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id={`bg-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor={SOFT[project.color]} />
          </linearGradient>
          <radialGradient id={`wash-${id}`} cx="15%" cy="10%" r="90%">
            <stop offset="0%" stopColor={hex} stopOpacity="0.12" />
            <stop offset="100%" stopColor={hex} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="480" height="200" fill={`url(#bg-${id})`} />
        <rect x="0" y="0" width="480" height="200" fill={`url(#wash-${id})`} />
        {Cover ? <Cover hex={hex} /> : null}
      </svg>
    </div>
  );
}
