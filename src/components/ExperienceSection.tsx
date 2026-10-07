import styles from "./ExperienceSection.module.css";

interface Experience {
  role: string;
  company: string;
  duration: string;
  achievements: string[];
  skills: string[];
}

export default function ExperienceSection() {
  const experiences: Experience[] = [
    {
      role: "Lead Full-Stack Engineer",
      company: "Vanguard Tech Systems • San Francisco (Remote)",
      duration: "2024 — Present",
      achievements: [
        "Architected core Next.js 15/16 micro-frontends serving 450,000+ monthly active users, reducing time-to-interactive by 42%.",
        "Pioneered React 19 Server Actions & Streaming SSR adoption, cutting API latency across distributed edge nodes from 180ms to 45ms.",
        "Mentored a 7-person engineering pod on TypeScript strictness, automated E2E testing, and zero-runtime CSS design systems.",
      ],
      skills: ["Next.js 16", "React 19", "TypeScript", "Edge Runtime", "Turbopack", "PostgreSQL"],
    },
    {
      role: "Senior Frontend Engineer",
      company: "Aether Labs • New York",
      duration: "2022 — 2024",
      achievements: [
        "Re-engineered data visualization dashboards and canvas graphs, handling 50k real-time WebSocket ticks per second.",
        "Built enterprise design system with 60+ modular, accessible WCAG AA components used across 5 company product lines.",
        "Implemented rigorous CI/CD test automation pipelines with Jest and Playwright achieving 94% code coverage.",
      ],
      skills: ["React", "TypeScript", "WebGL / Canvas", "Tailored CSS", "WebSockets", "Playwright"],
    },
    {
      role: "Software Engineer",
      company: "Apex Digital Solutions",
      duration: "2021 — 2022",
      achievements: [
        "Developed full-stack web applications and microservices using Node.js, Express, Next.js, and Redis caching layers.",
        "Migrated legacy REST services to GraphQL federated schemas, eliminating over-fetching by 65%.",
        "Optimized database queries and indexed Postgres tables, cutting average request resolution times by half.",
      ],
      skills: ["Node.js", "Express", "GraphQL", "Redis", "Docker", "PostgreSQL"],
    },
  ];

  return (
    <section id="experience" className={styles.section}>
      <div className={styles.header}>
        <span className={styles.sectionBadge}>Career Path</span>
        <h2 className={styles.sectionTitle}>Work Experience & Impact</h2>
      </div>

      <div className={styles.timeline}>
        {experiences.map((exp) => (
          <div key={exp.company} className={styles.timelineItem}>
            <div className={styles.timelineNode} />
            <div className={styles.timelineCard}>
              <div className={styles.roleRow}>
                <h3 className={styles.roleTitle}>{exp.role}</h3>
                <span className={styles.durationBadge}>{exp.duration}</span>
              </div>
              <div className={styles.companyRow}>{exp.company}</div>

              <ul className={styles.achievementsList}>
                {exp.achievements.map((item, idx) => (
                  <li key={idx} className={styles.achievementItem}>
                    {item}
                  </li>
                ))}
              </ul>

              <div className={styles.skillsUsed}>
                {exp.skills.map((s) => (
                  <span key={s} className={styles.skillPill}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
