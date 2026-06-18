import React, { useEffect, useState } from "react";
import { eventsAPI } from "../../services/api";
import styles from "./Events.module.css";

function LiveDot() {
  return <span className={styles.liveDot} />;
}

const BRACKET = [
  {
    teamA: "Alpha Bots",
    scoreA: 3,
    teamB: "Circuit Kings",
    scoreB: 1,
    winner: "A",
  },
  {
    teamA: "Steel Surge",
    scoreA: 2,
    teamB: "Volt Vipers",
    scoreB: 4,
    winner: "B",
  },
];
const PAST = [
  { title: "Bengaluru Regionals", sub: "Alpha Bots won by 12pts" },
  { title: "Bengaluru Regionals", sub: "Steel Surge took second" },
  { title: "Bengaluru Regionals", sub: "Circuit Kings qualifier" },
];

function Bracket() {
  return (
    <div className={styles.bracket}>
      <div className={styles.bracketCol}>
        {BRACKET.map((m, i) => (
          <div key={i} className={styles.match}>
            <div
              className={`${styles.team} ${m.winner === "A" ? styles.teamWin : ""}`}
            >
              <span className={styles.teamName}>{m.teamA}</span>
              <span className={styles.teamScore}>{m.scoreA}</span>
            </div>
            <div
              className={`${styles.team} ${m.winner === "B" ? styles.teamWin : ""}`}
            >
              <span className={styles.teamName}>{m.teamB}</span>
              <span className={styles.teamScore}>{m.scoreB}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.connector}>
        <div className={styles.connLine} />
        <div className={styles.connMid} />
        <div className={styles.connLine} />
      </div>

      <div className={styles.bracketCol}>
        <div className={styles.finalMatch}>
          <div className={`${styles.team} ${styles.teamWin}`}>
            <span className={styles.teamName}>Alpha Bots</span>
            <span className={styles.teamScore}>2</span>
          </div>
          
          <div className={styles.team}>
            <span className={styles.teamName}>Volt Vipers</span>
            <span className={styles.teamScore}>1</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    eventsAPI
      .getAll()
      .then((r) => setEvents(r.data.data))
      .catch(() =>
        setEvents([
          {
            id: 1,
            title: "Event in Mumbai",
            date: "7/11/25",
            location: "BRC",
            category: "Junior",
          },
          {
            id: 2,
            title: "Event in Delhi",
            date: "11/11/26",
            location: "BRC",
            category: "Pro",
          },
        ]),
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className={styles.section} id="events">
      <p className={styles.sectionLabel}>Competitions &amp; Events</p>
      <div className={styles.grid}>
        <div className={styles.col}>
          <div className={styles.colTitle}>
            <LiveDot />
            LIVE NOW
          </div>
          <p className={styles.eventName}>Bengaluru Regionals</p>
          <Bracket />
        </div>
        <div className={styles.col}>
          <div className={`${styles.colTitle} ${styles.colTitleMuted}`}>
            UPCOMING
          </div>
          {loading
            ? [1, 2].map((i) => (
                <div
                  key={i}
                  className={styles.skeleton}
                  style={{ height: 110, marginBottom: 12 }}
                />
              ))
            : events.map((ev) => (
                <div key={ev.id} className={styles.card}>
                  <p className={styles.cardTitle}>{ev.title}</p>
                  <div className={styles.meta}>
                    <div className={styles.metaItem}>
                      <label>Date</label>
                      <span>{ev.date}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <label>Location</label>
                      <span>{ev.location}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <label>Category</label>
                      <span>{ev.category}</span>
                    </div>
                  </div>
                  <button className={styles.regBtn}>REGISTER</button>
                </div>
              ))}
        </div>
        <div className={styles.col}>
          <div className={`${styles.colTitle} ${styles.colTitleMuted}`}>
            PAST RESULTS
          </div>
          {PAST.map((r, i) => (
            <div key={i} className={styles.resultRow}>
              <p className={styles.resultTitle}>{r.title}</p>
              <p className={styles.resultSub}>{r.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
