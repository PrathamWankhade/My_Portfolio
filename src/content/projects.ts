/**
 * Project data — verified against the actual GitHub repositories
 * (github.com/PrathamWankhade). Metrics are repo-reported only,
 * always with their conditions.
 */

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  color: "cobalt" | "coral" | "tangerine" | "lavender" | "emerald";
  description: string;
  problem: string;
  objectives: string[];
  stack: string[];
  status: string;
  repo?: string;
  demo?: string;
  image?: string;
  screenshots?: string[];
  metrics?: {
    label: string;
    value: string;
    condition: string;
  }[];
  challenges: string[];
  architecture?: string;
  implementation: string;
  outcomes: string[];
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "onebit",
    name: "OneBit",
    tagline: "Decentralized mesh messaging over Bluetooth — no servers, no accounts",
    color: "cobalt",
    description:
      "A peer-to-peer messenger where nearby devices talk directly over Bluetooth Low Energy. Every device is a node, router, and secure endpoint — messages hop between devices through a custom mesh protocol, and your data never touches a server.",
    problem:
      "Messaging apps depend on infrastructure that disappears when it's needed most — outages, shutdowns, and remote areas leave people unreachable. Server-based apps also centralize who can see metadata and who can switch the network off.",
    objectives: [
      "Let nearby devices talk with no internet, cloud, servers, or accounts",
      "Route messages multi-hop through other devices when peers are out of direct range",
      "Queue messages in an offline outbox and send them once the mesh finds a path",
      "Encrypt every session end-to-end with keys derived from the user's identity",
    ],
    stack: [
      "Flutter",
      "Dart",
      "Riverpod",
      "Drift (SQLite)",
      "Bluetooth Low Energy",
      "AES-256-GCM",
      "Material 3",
    ],
    status: "Active development",
    repo: "https://github.com/PrathamWankhade/OneBit",
    featured: true,
    metrics: [
      {
        label: "Infrastructure",
        value: "Zero",
        condition:
          "no servers, accounts, or phone numbers required — device-to-device over BLE (repo-documented)",
      },
      {
        label: "Session encryption",
        value: "AES-256-GCM",
        condition:
          "with X25519 key agreement derived from an Ed25519 identity key (repo-documented)",
      },
    ],
    challenges: [
      "Multi-hop mesh routing with automatic topology discovery and route recovery",
      "Delivery receipts that have to travel home through relay devices",
      "Keeping the offline outbox reliable as message history grows",
    ],
    architecture:
      "Three reactive layers: Drift (SQLite) as the source of truth, Riverpod providers exposing it to the UI, and a BLE protocol layer handling packet codec, mesh routing, and reliable transfer. Every device can optionally relay for other peers.",
    implementation:
      "Built in Flutter/Dart with a custom BLE mesh routing protocol. Messages are encrypted with AES-256-GCM before leaving the device; identity is an Ed25519 key pair with X25519 derived for session agreement. CI runs the full test suite and fails the build on a single flutter analyze issue.",
    outcomes: [
      "Two devices can converse with no internet, no server, and no account",
      "Messages queue for out-of-range peers and send themselves once the mesh finds a path",
      "Every push runs CI; the suite is green and static analysis is enforced at zero issues",
    ],
  },
  {
    slug: "faceSnap",
    name: "FaceSnap",
    tagline: "Face-verified attendance — only verified matches become records",
    color: "coral",
    description:
      "An attendance system where a face in frame means nothing until the backend matches it against an enrolled embedding and it passes liveness checks. Unknown faces go to a review queue — never into the register.",
    problem:
      "Manual attendance is slow and easy to fake, while naive face-detection tools record anyone who walks past a camera. Photo and video-replay attacks defeat systems that only detect faces, and attendance without an audit trail can't be trusted.",
    objectives: [
      "Enroll students once with a guided, consent-aware face capture",
      "Verify identity with liveness checks that resist photo and video replay",
      "Keep detection, recognition, and attendance as three separate explicit states",
      "Fail loudly — camera or API errors produce visible errors and zero records",
    ],
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "FastAPI",
      "InsightFace ArcFace",
      "Qdrant",
      "Firebase",
    ],
    status: "Completed",
    repo: "https://github.com/PrathamWankhade/FaceSnap",
    featured: true,
    metrics: [
      {
        label: "Embedding match",
        value: "512-dim ArcFace",
        condition:
          "cosine distance with a 0.35 threshold — a threshold choice, not a calibrated probability (repo-documented)",
      },
      {
        label: "Liveness",
        value: "rPPG + blink + motion",
        condition:
          "multi-frame analysis against photo and video-replay attacks (repo-documented)",
      },
    ],
    challenges: [
      "Separating detection, recognition, and attendance so none can masquerade as another",
      "Resisting presentation attacks without expensive hardware",
      "Keeping the recognition API the authority — Firestore rules alone are only a client boundary",
    ],
    architecture:
      "Next.js 15 + Firebase on the frontend (Google sign-in, Firestore profiles, storage); a FastAPI service does recognition — InsightFace ArcFace embeddings cached in Qdrant, cosine-distance matching, liveness scoring — and writes one canonical attendance schema.",
    implementation:
      "Enrollment captures a guided face sample and syncs the embedding to Qdrant. Live scans run liveness analysis before embedding; only verified matches within threshold become attendance events, once per session. Every backend route verifies Firebase ID tokens, and a chatbot is proxied server-side so no API key reaches the browser.",
    outcomes: [
      "Only verified, live matches become attendance records — unknowns wait in a review queue",
      "Four capture modes — 1:1, doorway batch, group photo, CCTV/Pi streams — write one canonical schema",
      "Enrollment shows a biometric-consent notice; face data is deletable from the student portal",
    ],
  },
  {
    slug: "aipfl-ids",
    name: "AIPFL-IDS",
    tagline: "Simulated federated learning for IoT intrusion detection",
    color: "emerald",
    description:
      "A research prototype applying deep learning and simulated federated learning to IoT network-traffic intrusion detection across two benchmark datasets — with its limits documented as carefully as its results.",
    problem:
      "Centralizing network traffic for intrusion detection concentrates sensitive data in one place. Federated learning promises training across nodes without raw traffic leaving them — but few prototypes are honest about what a single-process simulation does and doesn't prove.",
    objectives: [
      "Train clients on local traffic partitions and aggregate only model updates",
      "Support two real benchmark datasets end-to-end (CICIoT2023 and NF-ToN-IoT-V2)",
      "State plainly what the single-process simulation does not prove",
      "Serve predictions through a documented dual-model API",
    ],
    stack: ["Python", "TensorFlow", "FedAvg", "Flask", "Next.js", "Docker"],
    status: "Research prototype",
    repo: "https://github.com/PrathamWankhade/AIPFL-IDS",
    featured: true,
    metrics: [
      {
        label: "CICIoT2023 test accuracy",
        value: "71.35%",
        condition:
          "historical benchmark reported in the repo — reproduce with the released model before citing; 10 merged attack classes from 34 labels",
      },
      {
        label: "NF-ToN-IoT-V2 test accuracy",
        value: "79.92%",
        condition:
          "historical benchmark reported in the repo — reproduce with the released model before citing; 10 classes, balanced 50K/class",
      },
    ],
    challenges: [
      "Handling extreme byte-rate features (up to 1e+261) with percentile-based clipping",
      "Streaming 200K-row batches through 45M+ records within memory limits",
      "Converging under non-IID client partitions",
    ],
    architecture:
      "A TensorFlow DNN (512→256→128→64→10) with FedAvg across 10 simulated clients; per-dataset scalers, encoders, and models; a Flask API selects the model per request; a Next.js frontend proxies /api/* and shows dual-dataset metrics.",
    implementation:
      "Client partitions are simulated in one process — the repo states this explicitly: the project does not yet demonstrate privacy guarantees for independent clients, secure aggregation, or differential privacy. Training streams 200K-row batches and clips extreme features by percentile.",
    outcomes: [
      "Two datasets train and serve through one API with per-dataset models",
      "A published threat model states what federated simulation does not prove",
      "Released models and training summaries support reproduction of the reported benchmarks",
    ],
  },
  {
    slug: "phishing-detection",
    name: "Phishing Detection",
    tagline: "Traceable phishing verdicts with honest, documented scores",
    color: "tangerine",
    description:
      "An email phishing detector built so every verdict is traceable to evidence and every score means exactly what the interface says it means — the model's probability and the policy risk score stay separate fields.",
    problem:
      "Most phishing demos show a confidence percentage nobody validated. Security teams need risk signals that are auditable, explainable, and honest about what a score does and doesn't mean.",
    objectives: [
      "Classify email with an ML ensemble and corroborate with URL, sender, and header evidence",
      "Keep the model's probability and the policy risk score as separate, distinct fields",
      "Make deterministic evidence survive — an LLM can add a summary but never overwrite a verdict",
      "Report evaluation with its protocol, not just a headline number",
    ],
    stack: [
      "Python",
      "FastAPI",
      "scikit-learn",
      "React 19",
      "SQLite",
      "Docker",
      "LLM explanations",
    ],
    status: "Completed",
    repo: "https://github.com/PrathamWankhade/email-phishing-detection-system",
    featured: true,
    metrics: [
      {
        label: "Test accuracy",
        value: "98.25%",
        condition:
          "on a 39,148-mail stratified holdout (model phase4); CV F1-macro 98.14% — measured on this holdout, not unseen campaigns",
      },
      {
        label: "Phishing precision / recall",
        value: "97.8% / 98.4%",
        condition:
          "same holdout; policy verdicts trade recall for precision — 99.5% precision at 93.3% recall (text-only thresholds 75/45)",
      },
    ],
    challenges: [
      "Keeping risk = P(phishing)×100 + bounded evidence — so a 96%-legitimate email scores ~4, not 96",
      "Refusing silent fallbacks — backend down means an explicit error, never a disguised heuristic guess",
      "Keeping the evaluation holdout out of threshold tuning",
    ],
    architecture:
      "Server-side MIME parsing feeds a TF-IDF + soft-voting LogisticRegression/RandomForest ensemble; URL, sender-domain, header-authentication, and BEC analyzers add bounded, evidence-tagged risk. A decision engine combines them: risk = P×100 + url(≤20) + sender(≤30) + evidence(≤10), with 75/45 thresholds.",
    implementation:
      "The risk score is a heuristic policy score, never a calibrated probability — the UI labels it \"Risk score\" and shows P(phishing) separately. An optional LLM adds plain-language summaries, but deterministic signals are the source of truth. Scans persist by content hash in SQLite, and the dashboard shows a Demo Mode badge whenever live data is unreachable.",
    outcomes: [
      "Every verdict links to inspectable evidence; risk and probability stay separate fields",
      "Full evaluation protocol published — holdout size, split, and tuning caveats included",
      "Docker compose runs frontend and API; pytest and CI cover the contract",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
