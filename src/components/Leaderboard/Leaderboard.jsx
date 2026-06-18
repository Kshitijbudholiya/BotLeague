import React, { useEffect, useState } from "react";
import { leaderboardAPI } from "../../services/api";
import styles from "./Leaderboard.module.css";
import { Bot, Trophy, Medal, Award, Crown } from "lucide-react";

const RankIcon = ({ rank }) => {
  if (rank === 1) return <Crown size={18} className={styles.gold} />;

  if (rank === 2) return <Trophy size={18} className={styles.silver} />;

  if (rank === 3) return <Award size={18} className={styles.bronze} />;

  return <span>#{rank}</span>;
};

const COLORS = [
  "#e53935",
  "#FFD600",
  "#00C853",
  "#1565C0",
  "#9C27B0",
  "#FF6F00",
];

export default function Leaderboard() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    leaderboardAPI
      .getAll()
      .then((r) => setRows(r.data.data))
      .catch(() =>
        setRows([
          { rank: 1, name: "AlphaBot_X", pts: "98k", pct: 100 },
          { rank: 2, name: "VoltViper", pts: "87k", pct: 89 },
          { rank: 3, name: "SteelSurge", pts: "76k", pct: 78 },
          { rank: 4, name: "CircuitKing", pts: "65k", pct: 66 },
          { rank: 5, name: "RoboForce", pts: "54k", pct: 55 },
          { rank: 6, name: "NanoNinja", pts: "43k", pct: 44 },
        ]),
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <p className={styles.headerLabel}>LEADERBOARD</p>
        <div className={styles.avatar}>
          <Bot size={42} />
        </div>

        <div className={styles.score}>
          508<span className={styles.scoreAcc}>754</span>
        </div>

        <p className={styles.scoreLabel}>YOUR RANK · #42</p>
      </div>

      <div className={styles.list}>
        {loading
          ? [1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className={styles.skeleton} />
            ))
          : rows.map((row) => (
              <div key={row.rank} className={styles.row}>
                <span className={styles.rank}>
                  <RankIcon rank={row.rank} />
                </span>

                <div
                  className={styles.avatarSm}
                  style={{ background: COLORS[(row.rank - 1) % COLORS.length] }}
                >
                  {row.name[0]}
                </div>

                <span className={styles.name}>{row.name}</span>
                <span className={styles.pts}>{row.pts}</span>
                <div className={styles.barWrap}>
                  <div
                    className={styles.bar}
                    style={{ width: `${row.pct}%` }}
                  />
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
