"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./ProjectsSection.module.css";

type Category = "all" | "fullstack" | "frontend" | "cloud";

interface Project {
  id: string;
  title: string;
  category: "fullstack" | "frontend" | "cloud";
  description: string;
  image: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
}

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const projects: Project[] = [
    {
      id: "quantum-analytics",
      title: "Quantum Analytics Cloud",
      category: "fullstack",
      description:
        "Enterprise real-time data observability platform streaming 1.75 TB/s telemetry metrics with sub-second WebSocket updates, interactive data histograms, and automated anomaly alerts.",
      image: "/project_analytics.jpg",
      tags: ["Next.js 16", "React 19", "TypeScript", "WebSocket", "Tailored CSS", "Turbopack"],
      demoUrl: "https://github.com",
      githubUrl: "https://github.com",
    },
    {
      id: "synapse-ai-studio",
      title: "Synapse AI Dev Studio",
      category: "cloud",
      description:
        "Modern developer workspace with live AI code synthesis, AST parsing, dark syntax highlighting, contextual reasoning panels, and low-latency streaming completions.",
      image: "/project_ai_ide.jpg",
      tags: ["Next.js App Router", "TypeScript", "React Suspense", "AI Streaming", "Server Actions"],
      demoUrl: "https://github.com",
      githubUrl: "https://github.com",
    },
    {
      id: "nexus-design-system",
      title: "Nexus Component Architecture",
      category: "frontend",
      description:
        "Modern headless component system designed for maximum accessibility (WCAG AA), zero runtime CSS bloat, seamless dark mode tokens, and fluid micro-animations.",
      image: "/project_analytics.jpg",
      tags: ["TypeScript", "Vanilla CSS Tokens", "Accessibility", "A11y", "Micro-Interactions"],
      demoUrl: "https://github.com",
      githubUrl: "https://github.com",
    },
    {
      id: "aura-edge-commerce",
      title: "Aura Edge Headless Commerce",
      category: "fullstack",
      description:
        "High-conversion global storefront running on Edge Middleware with sub-50ms TTFB, instant optimistic cart state, multi-currency localization, and payment pipelines.",
      image: "/project_ai_ide.jpg",
      tags: ["Next.js 16", "Edge Middleware", "React 19 Server Components", "Stripe API"],
      demoUrl: "https://github.com",
      githubUrl: "https://github.com",
    },
  ];

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className={styles.section}>
      <div className={styles.header}>
        <span className={styles.sectionBadge}>Selected Works</span>
        <h2 className={styles.sectionTitle}>Featured Engineering Projects</h2>
        <p className={styles.sectionSubtitle}>
          A curated selection of high-impact production systems, modern web applications, and developer tools.
        </p>
      </div>

      <div className={styles.filterBar} role="tablist">
        <button
          role="tab"
          aria-selected={activeCategory === "all"}
          className={`${styles.filterBtn} ${activeCategory === "all" ? styles.filterBtnActive : ""}`}
          onClick={() => setActiveCategory("all")}
        >
          All Projects ({projects.length})
        </button>
        <button
          role="tab"
          aria-selected={activeCategory === "fullstack"}
          className={`${styles.filterBtn} ${activeCategory === "fullstack" ? styles.filterBtnActive : ""}`}
          onClick={() => setActiveCategory("fullstack")}
        >
          Full-Stack
        </button>
        <button
          role="tab"
          aria-selected={activeCategory === "frontend"}
          className={`${styles.filterBtn} ${activeCategory === "frontend" ? styles.filterBtnActive : ""}`}
          onClick={() => setActiveCategory("frontend")}
        >
          Frontend & UI
        </button>
        <button
          role="tab"
          aria-selected={activeCategory === "cloud"}
          className={`${styles.filterBtn} ${activeCategory === "cloud" ? styles.filterBtnActive : ""}`}
          onClick={() => setActiveCategory("cloud")}
        >
          Cloud & AI
        </button>
      </div>

      <div className={styles.projectsGrid}>
        {filteredProjects.map((project) => (
          <article key={project.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.cardImg}
              />
            </div>

            <div className={styles.cardContent}>
              <div className={styles.tagRow}>
                {project.tags.map((tag) => (
                  <span key={tag} className={styles.techTag}>
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.projectDesc}>{project.description}</p>

              <div className={styles.cardFooter}>
                <div className={styles.cardLinks}>
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.projectLink}
                  >
                    Live Demo ↗
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.githubLink}
                  >
                    Source Code
                  </a>
                </div>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  2026 Production
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
