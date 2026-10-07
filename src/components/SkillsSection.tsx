import styles from "./SkillsSection.module.css";

interface SkillCategory {
  title: string;
  icon: string;
  skills: { name: string; level: string; percent: number }[];
}

export default function SkillsSection() {
  const skillCategories: SkillCategory[] = [
    {
      title: "Frontend Engineering",
      icon: "⚛️",
      skills: [
        { name: "Next.js 16 & App Router", level: "Expert", percent: 96 },
        { name: "React 19 & Server Components", level: "Expert", percent: 95 },
        { name: "TypeScript & Strict Typing", level: "Advanced", percent: 92 },
        { name: "Vanilla CSS & Modern Token Systems", level: "Advanced", percent: 90 },
      ],
    },
    {
      title: "Backend & Systems",
      icon: "⚙️",
      skills: [
        { name: "Node.js & Express / Fastify", level: "Advanced", percent: 88 },
        { name: "PostgreSQL & Prisma / Drizzle", level: "Advanced", percent: 85 },
        { name: "REST APIs & GraphQL Federation", level: "Advanced", percent: 88 },
        { name: "Redis Caching & Real-Time WebSockets", level: "Proficient", percent: 82 },
      ],
    },
    {
      title: "Cloud & DevOps",
      icon: "☁️",
      skills: [
        { name: "Docker Containerization", level: "Advanced", percent: 85 },
        { name: "Vercel Edge & Serverless", level: "Expert", percent: 94 },
        { name: "AWS (S3, CloudFront, Lambda)", level: "Proficient", percent: 80 },
        { name: "CI/CD & GitHub Actions Automation", level: "Advanced", percent: 86 },
      ],
    },
    {
      title: "Tooling & Best Practices",
      icon: "🛡️",
      skills: [
        { name: "Turbopack & Webpack Configs", level: "Advanced", percent: 90 },
        { name: "Automated Testing (Jest / Playwright)", level: "Advanced", percent: 86 },
        { name: "ESLint 9 & Code Quality", level: "Advanced", percent: 92 },
        { name: "Web Performance & Core Web Vitals", level: "Expert", percent: 95 },
      ],
    },
  ];

  return (
    <section id="skills" className={styles.section}>
      <div className={styles.header}>
        <span className={styles.sectionBadge}>Technical Mastery</span>
        <h2 className={styles.sectionTitle}>Skills & Expertise</h2>
        <p className={styles.sectionSubtitle}>
          Specialized in high-velocity modern web technologies, scalable systems architecture, and engineering precision.
        </p>
      </div>

      <div className={styles.grid}>
        {skillCategories.map((category) => (
          <div key={category.title} className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.categoryIcon}>{category.icon}</div>
              <h3 className={styles.categoryTitle}>{category.title}</h3>
            </div>

            <div className={styles.skillsList}>
              {category.skills.map((skill) => (
                <div key={skill.name} className={styles.skillItem}>
                  <div className={styles.skillInfo}>
                    <span className={styles.skillName}>{skill.name}</span>
                    <span className={styles.skillLevel}>{skill.level}</span>
                  </div>
                  <div className={styles.progressBarTrack}>
                    <div
                      className={styles.progressBarFill}
                      style={{ width: `${skill.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
