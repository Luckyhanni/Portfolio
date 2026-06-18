"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Act = {
  id: string;
  country: string;
  song: string;
};

type Scores = Record<string, number>;

type Vote = {
  participant: string;
  scores: Scores;
  updatedAt: string;
};

type Result = {
  act: Act;
  total: number;
  average: number;
  voteCount: number;
};

const STORAGE_KEY = "portfolio-esc-demo-v1";

const ACTS: Act[] = [
  { id: "germany-fire", country: "Germany", song: "Fire" },
  { id: "sweden-my-system", country: "Sweden", song: "My System" },
  { id: "italy-per-sempre-si", country: "Italy", song: "Per Sempre Si" },
  { id: "finland-liekinheitin", country: "Finland", song: "Liekinheitin" },
  { id: "france-regarde", country: "France", song: "Regarde" },
  { id: "norway-ya-ya-ya", country: "Norway", song: "YA YA YA" },
];

const POINTS = Array.from({ length: 12 }, (_, index) => index + 1);
const SAMPLE_PARTICIPANTS = ["Demo-Gast", "Sophie", "Alex", "Richard"];

const SEED_VOTES: Vote[] = [
  {
    participant: "Demo-Gast",
    updatedAt: "demo-seed",
    scores: {
      "germany-fire": 7,
      "sweden-my-system": 10,
      "italy-per-sempre-si": 8,
      "finland-liekinheitin": 9,
      "france-regarde": 6,
      "norway-ya-ya-ya": 12,
    },
  },
  {
    participant: "Sophie",
    updatedAt: "demo-seed",
    scores: {
      "germany-fire": 8,
      "sweden-my-system": 12,
      "italy-per-sempre-si": 10,
      "finland-liekinheitin": 7,
      "france-regarde": 6,
      "norway-ya-ya-ya": 9,
    },
  },
  {
    participant: "Alex",
    updatedAt: "demo-seed",
    scores: {
      "germany-fire": 10,
      "sweden-my-system": 8,
      "italy-per-sempre-si": 12,
      "finland-liekinheitin": 6,
      "france-regarde": 7,
      "norway-ya-ya-ya": 5,
    },
  },
  {
    participant: "Richard",
    updatedAt: "demo-seed",
    scores: {
      "germany-fire": 6,
      "sweden-my-system": 9,
      "italy-per-sempre-si": 8,
      "finland-liekinheitin": 12,
      "france-regarde": 7,
      "norway-ya-ya-ya": 10,
    },
  },
];

const DEFAULT_PARTICIPANT = "Demo-Gast";

function createEmptyScores(): Scores {
  return ACTS.reduce<Scores>((scores, act) => {
    scores[act.id] = 0;
    return scores;
  }, {});
}

function getSeedScoresFor(participant: string): Scores {
  return {
    ...createEmptyScores(),
    ...(SEED_VOTES.find((vote) => sameParticipant(vote.participant, participant))?.scores ?? {}),
  };
}

function sameParticipant(a: string, b: string): boolean {
  return a.trim().toLocaleLowerCase("de-DE") === b.trim().toLocaleLowerCase("de-DE");
}

function sanitizeVote(value: unknown): Vote | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const maybeVote = value as Partial<Vote>;

  if (typeof maybeVote.participant !== "string" || !maybeVote.participant.trim()) {
    return null;
  }

  if (!maybeVote.scores || typeof maybeVote.scores !== "object") {
    return null;
  }

  const scores = createEmptyScores();

  for (const act of ACTS) {
    const rawScore = (maybeVote.scores as Scores)[act.id];
    scores[act.id] = Number.isInteger(rawScore) && rawScore >= 1 && rawScore <= 12 ? rawScore : 0;
  }

  return {
    participant: maybeVote.participant.trim().slice(0, 40),
    scores,
    updatedAt: typeof maybeVote.updatedAt === "string" ? maybeVote.updatedAt : "local",
  };
}

function sanitizeVotes(value: unknown): Vote[] | null {
  if (!Array.isArray(value)) {
    return null;
  }

  const byParticipant = new Map<string, Vote>();

  for (const item of value) {
    const vote = sanitizeVote(item);

    if (vote) {
      byParticipant.set(vote.participant.toLocaleLowerCase("de-DE"), vote);
    }
  }

  const votes = Array.from(byParticipant.values());
  return votes.length > 0 ? votes : null;
}

function calculateRanking(votes: Vote[]): Result[] {
  return ACTS.map((act) => {
    const validScores = votes
      .map((vote) => vote.scores[act.id])
      .filter((score) => Number.isInteger(score) && score > 0);
    const total = validScores.reduce((sum, score) => sum + score, 0);
    const voteCount = validScores.length;

    return {
      act,
      total,
      voteCount,
      average: voteCount ? total / voteCount : 0,
    };
  }).sort((a, b) => {
    if (b.total !== a.total) {
      return b.total - a.total;
    }

    if (b.average !== a.average) {
      return b.average - a.average;
    }

    return a.act.country.localeCompare(b.act.country);
  });
}

export default function EscDemo() {
  const [participantName, setParticipantName] = useState(DEFAULT_PARTICIPANT);
  const [scores, setScores] = useState<Scores>(() => getSeedScoresFor(DEFAULT_PARTICIPANT));
  const [votes, setVotes] = useState<Vote[]>(SEED_VOTES);
  const [isHydrated, setIsHydrated] = useState(false);
  const [message, setMessage] = useState("Demo-Daten geladen.");

  useEffect(() => {
    try {
      const storedVotes = window.localStorage.getItem(STORAGE_KEY);

      if (storedVotes) {
        const parsedVotes = sanitizeVotes(JSON.parse(storedVotes));

        if (parsedVotes) {
          setVotes(parsedVotes);

          const existingVote = parsedVotes.find((vote) =>
            sameParticipant(vote.participant, DEFAULT_PARTICIPANT),
          );
          setScores(existingVote ? existingVote.scores : createEmptyScores());
          setMessage("Lokale Demo-Daten geladen.");
        }
      }
    } catch {
      setMessage("Lokaler Speicher ist nicht verfügbar, die Demo läuft trotzdem.");
    } finally {
      setIsHydrated(true);
    }
  }, []);

  const ranking = useMemo(() => calculateRanking(votes), [votes]);
  const maxTotal = Math.max(...ranking.map((result) => result.total), 1);
  const selectedCount = ACTS.filter((act) => scores[act.id] > 0).length;
  const participantOptions = useMemo(() => {
    const names = new Set(SAMPLE_PARTICIPANTS);

    votes.forEach((vote) => names.add(vote.participant));
    return Array.from(names);
  }, [votes]);

  function persistVotes(nextVotes: Vote[]) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextVotes));
    } catch {
      setMessage("Voting aktualisiert, aber localStorage ist nicht verfügbar.");
    }
  }

  function setActScore(actId: string, point: number) {
    setScores((currentScores) => ({
      ...currentScores,
      [actId]: point,
    }));
  }

  function selectParticipant(name: string) {
    const existingVote = votes.find((vote) => sameParticipant(vote.participant, name));

    setParticipantName(name);
    setScores(existingVote ? existingVote.scores : createEmptyScores());
    setMessage(existingVote ? `${name} geladen.` : `${name} kann neu abstimmen.`);
  }

  function saveVote() {
    const name = participantName.trim();

    if (!name) {
      setMessage("Bitte gib einen Teilnehmernamen ein.");
      return;
    }

    if (selectedCount < ACTS.length) {
      setMessage(`Bitte bewerte alle ${ACTS.length} Acts, bevor du speicherst.`);
      return;
    }

    const nextVote: Vote = {
      participant: name.slice(0, 40),
      scores: { ...scores },
      updatedAt: new Date().toISOString(),
    };
    const nextVotes = [
      ...votes.filter((vote) => !sameParticipant(vote.participant, name)),
      nextVote,
    ];

    setVotes(nextVotes);
    persistVotes(nextVotes);
    setParticipantName(nextVote.participant);
    setMessage(`Voting für ${nextVote.participant} gespeichert.`);
  }

  function resetDemo() {
    setParticipantName(DEFAULT_PARTICIPANT);
    setScores(getSeedScoresFor(DEFAULT_PARTICIPANT));
    setVotes(SEED_VOTES);
    persistVotes(SEED_VOTES);
    setMessage("Demo zurückgesetzt.");
  }

  return (
    <main className="escDemoPage">
      <header className="escDemoHeader">
        <Link href="/" className="escBrand">JOHANNES BLANK</Link>
        <nav className="escNav" aria-label="Demo Navigation">
          <a href="#voting">Voting</a>
          <a href="#results">Live-Ergebnis</a>
          <a href="#controls">Steuerung</a>
        </nav>
      </header>

      <div className="escDemoShell">
        <p className="escNotice">
          Demo-Version – alle Daten bleiben lokal im Browser und werden nicht gespeichert.
        </p>

        <section className="escHero">
          <div className="escHeroText">
            <p className="escEyebrow">Portfolio Demo</p>
            <h1>ESC Voting System</h1>
            <p>
              Kompakte Browser-Demo für einen ESC-Abend: Teilnehmer wählen Punkte,
              die Rangliste reagiert sofort und alles bleibt lokal auf diesem Gerät.
            </p>
          </div>
          <div className="escLivePill" aria-label="Demo ist lokal aktiv">
            <span />
            Lokal live
          </div>
        </section>

        <section className="escDemoGrid" aria-label="ESC Voting Demo">
          <section id="voting" className="escPanel escVotingPanel">
            <div className="escPanelHeader">
              <div>
                <p className="escPanelKicker">A) Voting</p>
                <h2>Stimmzettel</h2>
              </div>
              <div className="escProgressText">{selectedCount} / {ACTS.length}</div>
            </div>

            <div className="escNameCard">
              <label>
                Teilnehmername
                <input
                  type="text"
                  list="escDemoParticipants"
                  value={participantName}
                  maxLength={40}
                  autoComplete="name"
                  placeholder="Demo-Gast"
                  onChange={(event) => setParticipantName(event.target.value)}
                />
              </label>
              <datalist id="escDemoParticipants">
                {participantOptions.map((participant) => (
                  <option key={participant} value={participant} />
                ))}
              </datalist>

              <div className="escParticipantChips" aria-label="Beispiel-Teilnehmer">
                {SAMPLE_PARTICIPANTS.map((participant) => (
                  <button
                    key={participant}
                    type="button"
                    className={sameParticipant(participantName, participant) ? "active" : ""}
                    onClick={() => selectParticipant(participant)}
                  >
                    {participant}
                  </button>
                ))}
              </div>
            </div>

            <div className="escProgressBar" aria-hidden="true">
              <i style={{ width: `${(selectedCount / ACTS.length) * 100}%` }} />
            </div>

            <div className="escActList">
              {ACTS.map((act, index) => {
                const selectedScore = scores[act.id];

                return (
                  <article className="escActCard" key={act.id}>
                    <div className="escActMain">
                      <span className="escActNumber">{String(index + 1).padStart(2, "0")}</span>
                      <div>
                        <h3>{act.country}</h3>
                        <p>{act.song}</p>
                      </div>
                      <strong className={selectedScore ? "escSelectedScore active" : "escSelectedScore"}>
                        {selectedScore || "-"}
                      </strong>
                    </div>

                    <div className="escScoreGrid" aria-label={`Punkte für ${act.country} - ${act.song}`}>
                      {POINTS.map((point) => (
                        <button
                          key={point}
                          type="button"
                          className={selectedScore === point ? "selected" : ""}
                          aria-pressed={selectedScore === point}
                          onClick={() => setActScore(act.id, point)}
                        >
                          {point}
                        </button>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="escVotingFooter">
              <button type="button" className="escPrimaryButton" onClick={saveVote}>
                Voting speichern
              </button>
              <p role="status" aria-live="polite">
                {message}
              </p>
            </div>
          </section>

          <aside className="escSideStack">
            <section id="results" className="escPanel">
              <div className="escPanelHeader">
                <div>
                  <p className="escPanelKicker">B) Live-Ergebnis</p>
                  <h2>Rangliste</h2>
                </div>
                <div className="escVoteCount">{votes.length} Stimmen</div>
              </div>

              <div className="escRankingList">
                {ranking.map((result, index) => (
                  <article
                    key={result.act.id}
                    className={index < 3 ? "escRankRow podium" : "escRankRow"}
                  >
                    <span className="escRankNumber">{index + 1}</span>
                    <div className="escRankBody">
                      <div className="escRankTop">
                        <strong>{result.act.country}</strong>
                        <span>{result.total} Pkt.</span>
                      </div>
                      <p>{result.act.song}</p>
                      <div className="escResultBar" aria-hidden="true">
                        <i style={{ width: `${(result.total / maxTotal) * 100}%` }} />
                      </div>
                      <small>
                        Ø {result.average.toFixed(1)} · {result.voteCount} Stimmen
                      </small>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section id="controls" className="escPanel">
              <div className="escPanelHeader">
                <div>
                  <p className="escPanelKicker">C) Demo-Steuerung</p>
                  <h2>Aktionen</h2>
                </div>
              </div>

              <div className="escStorageInfo">
                <strong>{isHydrated ? "localStorage aktiv" : "Demo wird geladen"}</strong>
                <span>Keine API, kein Server, keine Datenbank.</span>
              </div>

              <div className="escControlButtons">
                <button type="button" className="escSecondaryButton" onClick={resetDemo}>
                  Demo zurücksetzen
                </button>
                <Link href="/#projects" className="escPrimaryButton">
                  Zurück zum Portfolio
                </Link>
              </div>
            </section>
          </aside>
        </section>
      </div>

      <style>{`
        .escDemoPage,
        .escDemoPage * {
          box-sizing: border-box;
        }

        .escDemoPage {
          --esc-bg: #0b1017;
          --esc-header: #16202b;
          --esc-panel: #101720;
          --esc-panel-soft: rgba(143, 168, 203, 0.07);
          --esc-panel-strong: rgba(19, 29, 43, 0.96);
          --esc-line: rgba(122, 145, 177, 0.22);
          --esc-text: #edf4ff;
          --esc-muted: rgba(223, 233, 248, 0.74);
          --esc-blue: #8fa8cb;
          --esc-blue-strong: #5aa6ff;
          --esc-gold: #ffd166;
          --esc-hot: #ff5c83;
          --esc-cyan: #58d6ff;
          min-height: 100vh;
          background:
            radial-gradient(circle at 12% -8%, rgba(90, 166, 255, 0.2), transparent 27rem),
            radial-gradient(circle at 88% 6%, rgba(255, 92, 131, 0.12), transparent 25rem),
            var(--esc-bg);
          color: var(--esc-text);
          font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
        }

        .escDemoHeader {
          position: sticky;
          top: 0;
          z-index: 20;
          min-height: 56px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 0 24px;
          border-bottom: 1px solid var(--esc-line);
          background: rgba(22, 32, 43, 0.94);
          backdrop-filter: blur(14px);
        }

        .escBrand,
        .escNav a {
          color: var(--esc-text);
          text-decoration: none;
          font-weight: 800;
        }

        .escBrand {
          font-size: 14px;
          letter-spacing: 0.8px;
          white-space: nowrap;
        }

        .escNav {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          gap: 10px;
          font-size: 13px;
        }

        .escNav a {
          min-height: 34px;
          display: inline-flex;
          align-items: center;
          border: 1px solid rgba(143, 168, 203, 0.2);
          border-radius: 999px;
          padding: 7px 10px;
          color: var(--esc-muted);
          background: rgba(143, 168, 203, 0.05);
        }

        .escDemoShell {
          width: min(100%, 1220px);
          margin: 0 auto;
          padding: 24px;
        }

        .escNotice {
          margin: 0 0 14px;
          border: 1px solid rgba(143, 168, 203, 0.28);
          border-radius: 12px;
          padding: 10px 12px;
          background: rgba(143, 168, 203, 0.08);
          color: var(--esc-muted);
          font-size: 13px;
          font-weight: 800;
          line-height: 1.45;
        }

        .escHero {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 18px;
          margin-bottom: 18px;
          border: 1px solid var(--esc-line);
          border-radius: 22px;
          padding: clamp(18px, 4vw, 30px);
          background:
            linear-gradient(135deg, rgba(16, 23, 32, 0.98), rgba(14, 23, 36, 0.9)),
            var(--esc-panel);
          box-shadow: 0 20px 44px rgba(0, 0, 0, 0.22);
        }

        .escHeroText {
          min-width: 0;
        }

        .escEyebrow,
        .escPanelKicker {
          margin: 0 0 6px;
          color: var(--esc-cyan);
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0;
          text-transform: uppercase;
        }

        .escHero h1 {
          margin: 0;
          font-size: clamp(40px, 8vw, 82px);
          line-height: 0.96;
          letter-spacing: 0;
        }

        .escHero p {
          max-width: 760px;
          margin: 12px 0 0;
          color: var(--esc-muted);
          font-size: 16px;
          line-height: 1.7;
        }

        .escHero .escEyebrow {
          margin-top: 0;
        }

        .escLivePill {
          flex: 0 0 auto;
          min-height: 40px;
          display: inline-flex;
          align-items: center;
          gap: 9px;
          border: 1px solid rgba(143, 168, 203, 0.28);
          border-radius: 999px;
          padding: 9px 12px;
          background: rgba(13, 20, 29, 0.72);
          color: var(--esc-muted);
          font-size: 13px;
          font-weight: 900;
        }

        .escLivePill span {
          width: 9px;
          height: 9px;
          border-radius: 999px;
          background: #72e06a;
          box-shadow: 0 0 0 6px rgba(114, 224, 106, 0.14);
        }

        .escDemoGrid {
          display: grid;
          grid-template-columns: minmax(0, 1.26fr) minmax(330px, 0.74fr);
          gap: 18px;
          align-items: start;
        }

        .escSideStack {
          min-width: 0;
          display: grid;
          gap: 18px;
        }

        .escPanel {
          min-width: 0;
          border: 1px solid var(--esc-line);
          border-radius: 20px;
          padding: 18px;
          background: rgba(16, 23, 32, 0.96);
          box-shadow: 0 16px 34px rgba(0, 0, 0, 0.2);
        }

        .escPanelHeader {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 14px;
        }

        .escPanelHeader h2 {
          margin: 0;
          font-size: 26px;
          line-height: 1.04;
          letter-spacing: 0;
        }

        .escProgressText,
        .escVoteCount {
          display: inline-flex;
          align-items: center;
          min-height: 34px;
          border: 1px solid rgba(143, 168, 203, 0.22);
          border-radius: 999px;
          padding: 7px 10px;
          color: var(--esc-gold);
          background: rgba(13, 20, 29, 0.72);
          font-size: 13px;
          font-weight: 900;
          white-space: nowrap;
        }

        .escNameCard {
          display: grid;
          gap: 12px;
          border: 1px solid rgba(143, 168, 203, 0.18);
          border-radius: 14px;
          padding: 14px;
          background: var(--esc-panel-soft);
        }

        .escNameCard label {
          display: grid;
          gap: 8px;
          color: var(--esc-muted);
          font-size: 13px;
          font-weight: 900;
        }

        .escNameCard input {
          width: 100%;
          min-height: 46px;
          border: 1px solid rgba(143, 168, 203, 0.24);
          border-radius: 10px;
          padding: 0 12px;
          background: rgba(7, 12, 18, 0.7);
          color: var(--esc-text);
          font: inherit;
          font-weight: 800;
          outline: none;
        }

        .escNameCard input:focus {
          border-color: rgba(90, 166, 255, 0.68);
          box-shadow: 0 0 0 3px rgba(90, 166, 255, 0.14);
        }

        .escParticipantChips,
        .escControlButtons,
        .escVotingFooter {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .escParticipantChips button {
          min-height: 36px;
          border: 1px solid rgba(143, 168, 203, 0.22);
          border-radius: 999px;
          padding: 7px 11px;
          background: rgba(143, 168, 203, 0.08);
          color: var(--esc-text);
          font: inherit;
          font-size: 13px;
          font-weight: 900;
          cursor: pointer;
        }

        .escParticipantChips button.active {
          border-color: rgba(237, 244, 255, 0.32);
          background: var(--esc-blue);
          color: #0f1722;
        }

        .escProgressBar,
        .escResultBar {
          height: 8px;
          overflow: hidden;
          border-radius: 999px;
          background: rgba(39, 43, 52, 0.92);
        }

        .escProgressBar {
          margin: 14px 0;
        }

        .escProgressBar i,
        .escResultBar i {
          display: block;
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, var(--esc-blue-strong), var(--esc-gold), var(--esc-hot));
          transition: width 180ms ease;
        }

        .escActList,
        .escRankingList {
          display: grid;
          gap: 12px;
        }

        .escActCard {
          min-width: 0;
          display: grid;
          grid-template-columns: minmax(180px, 0.9fr) minmax(0, 1.35fr);
          align-items: center;
          gap: 14px;
          border: 1px solid rgba(143, 168, 203, 0.18);
          border-radius: 14px;
          padding: 14px;
          background: var(--esc-panel-strong);
        }

        .escActMain {
          min-width: 0;
          display: grid;
          grid-template-columns: auto minmax(0, 1fr) auto;
          align-items: center;
          gap: 11px;
        }

        .escActNumber,
        .escRankNumber {
          display: grid;
          place-items: center;
          border-radius: 999px;
          background: rgba(143, 168, 203, 0.12);
          color: var(--esc-gold);
          font-weight: 950;
        }

        .escActNumber {
          width: 40px;
          height: 40px;
          font-size: 13px;
        }

        .escActMain h3 {
          margin: 0 0 3px;
          font-size: 17px;
          line-height: 1.15;
        }

        .escActMain p,
        .escRankBody p,
        .escVotingFooter p,
        .escStorageInfo span {
          margin: 0;
          color: var(--esc-muted);
          line-height: 1.45;
        }

        .escSelectedScore {
          display: grid;
          place-items: center;
          width: 36px;
          height: 36px;
          border: 1px solid rgba(143, 168, 203, 0.18);
          border-radius: 10px;
          background: rgba(13, 20, 29, 0.72);
          color: var(--esc-muted);
          font-size: 14px;
        }

        .escSelectedScore.active {
          border-color: rgba(255, 209, 102, 0.5);
          background: var(--esc-gold);
          color: #151515;
        }

        .escScoreGrid {
          min-width: 0;
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          gap: 7px;
        }

        .escScoreGrid button {
          min-width: 0;
          min-height: 38px;
          border: 1px solid rgba(143, 168, 203, 0.18);
          border-radius: 9px;
          background: rgba(143, 168, 203, 0.08);
          color: var(--esc-text);
          font: inherit;
          font-size: 13px;
          font-weight: 950;
          cursor: pointer;
          transition: transform 160ms ease, border-color 160ms ease, background-color 160ms ease;
        }

        .escScoreGrid button:hover,
        .escScoreGrid button:focus-visible,
        .escParticipantChips button:hover,
        .escPrimaryButton:hover,
        .escSecondaryButton:hover {
          transform: translateY(-1px);
        }

        .escScoreGrid button.selected {
          border-color: rgba(237, 244, 255, 0.35);
          background: var(--esc-gold);
          color: #151515;
          box-shadow: 0 8px 18px rgba(255, 209, 102, 0.12);
        }

        .escVotingFooter {
          align-items: center;
          justify-content: space-between;
          margin-top: 14px;
        }

        .escVotingFooter p {
          flex: 1 1 220px;
          font-size: 13px;
          font-weight: 800;
        }

        .escPrimaryButton,
        .escSecondaryButton {
          min-height: 42px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          padding: 10px 14px;
          text-decoration: none;
          font: inherit;
          font-size: 14px;
          font-weight: 950;
          line-height: 1.1;
          text-align: center;
          cursor: pointer;
          transition: transform 160ms ease, border-color 160ms ease, background-color 160ms ease;
        }

        .escPrimaryButton {
          border: 1px solid rgba(237, 244, 255, 0.3);
          background: var(--esc-blue);
          color: #0f1722;
          box-shadow: 0 10px 24px rgba(20, 30, 44, 0.24);
        }

        .escSecondaryButton {
          border: 1px solid rgba(143, 168, 203, 0.24);
          background: rgba(143, 168, 203, 0.08);
          color: var(--esc-text);
        }

        .escRankRow {
          min-width: 0;
          display: grid;
          grid-template-columns: auto minmax(0, 1fr);
          gap: 11px;
          border: 1px solid rgba(143, 168, 203, 0.18);
          border-radius: 14px;
          padding: 12px;
          background: var(--esc-panel-strong);
        }

        .escRankRow.podium {
          background: linear-gradient(90deg, rgba(255, 209, 102, 0.13), rgba(19, 29, 43, 0.96));
        }

        .escRankNumber {
          width: 34px;
          height: 34px;
          align-self: start;
          background: var(--esc-gold);
          color: #151515;
        }

        .escRankBody {
          min-width: 0;
          display: grid;
          gap: 6px;
        }

        .escRankTop {
          min-width: 0;
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 10px;
        }

        .escRankTop strong {
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 16px;
        }

        .escRankTop span {
          flex: 0 0 auto;
          color: var(--esc-gold);
          font-weight: 950;
        }

        .escRankBody small {
          color: var(--esc-muted);
          font-weight: 800;
        }

        .escStorageInfo {
          display: grid;
          gap: 4px;
          border: 1px solid rgba(143, 168, 203, 0.18);
          border-radius: 14px;
          padding: 14px;
          background: var(--esc-panel-soft);
        }

        .escStorageInfo strong {
          color: var(--esc-text);
        }

        .escControlButtons {
          margin-top: 14px;
        }

        .escControlButtons .escPrimaryButton,
        .escControlButtons .escSecondaryButton {
          flex: 1 1 170px;
        }

        @media (max-width: 980px) {
          .escDemoGrid {
            grid-template-columns: 1fr;
          }

          .escActCard {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 680px) {
          .escDemoHeader {
            align-items: flex-start;
            flex-direction: column;
            padding: 12px 16px;
          }

          .escNav {
            width: 100%;
            justify-content: flex-start;
          }

          .escDemoShell {
            padding: 16px;
          }

          .escHero {
            flex-direction: column;
            border-radius: 18px;
          }

          .escHero h1 {
            font-size: clamp(34px, 15vw, 58px);
          }

          .escPanel {
            border-radius: 16px;
            padding: 14px;
          }

          .escPanelHeader {
            align-items: flex-start;
            flex-direction: column;
          }

          .escScoreGrid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }

          .escVotingFooter,
          .escControlButtons {
            align-items: stretch;
            flex-direction: column;
          }

          .escPrimaryButton,
          .escSecondaryButton {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}
