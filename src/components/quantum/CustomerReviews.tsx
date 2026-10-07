import styles from "./CustomerReviews.module.css";

export default function CustomerReviews() {
  const reviews = [
    {
      stars: "★★★★★",
      quote:
        "The 120W HyperCharge completely changes your daily routine. Going from 10% to 100% while getting ready in the morning is sheer magic. The 200MP camera produces stunning detail.",
      author: "Marcus Vance",
      role: "Lead Tech Editor, CyberGizmo",
      avatar: "MV",
    },
    {
      stars: "★★★★★",
      quote:
        "Easily the most fluid display I’ve tested all year. The 144Hz curved OLED and 3nm processor chew through high-framerate 4K mobile gaming without even breaking a sweat.",
      author: "Elena Rostova",
      role: "Professional Mobile Esports Gamer",
      avatar: "ER",
    },
    {
      stars: "★★★★★",
      quote:
        "Night photography on the Quantum X Pro makes traditional camera sensors look obsolete. The dynamic range and instant zero-shutter-lag capture are unrivaled.",
      author: "David Chen",
      role: "Commercial Photographer & Filmmaker",
      avatar: "DC",
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.badge}>CRITIC & USER ACCLAIM</span>
        <h2 className={styles.title}>
          Loved by <span className={styles.titleGlow}>Over 500,000 Power Users</span>
        </h2>
      </div>

      <div className={styles.reviewsGrid}>
        {reviews.map((r) => (
          <div key={r.author} className={styles.reviewCard}>
            <div className={styles.stars}>{r.stars}</div>
            <p className={styles.quote}>&ldquo;{r.quote}&rdquo;</p>
            <div className={styles.authorRow}>
              <div className={styles.authorAvatar}>{r.avatar}</div>
              <div className={styles.authorInfo}>
                <span className={styles.authorName}>{r.author}</span>
                <span className={styles.authorRole}>{r.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
