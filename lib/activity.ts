/**
 * lib/activity.ts — GitHub activity snapshot for the home page.
 *
 * Pulled from the GitHub API (commit and issue search, authenticated, so it
 * includes the private Botinfy repos). Commits are default-branch only and
 * include merge commits, the same way GitHub's contribution graph counts them.
 * Static on purpose: private repos need a token, so this is refreshed by hand.
 */

import type { Bilingual } from "./i18n";

export type ActivityTotal = {
  key: string;
  label: Bilingual;
  value: number;
};

export type ActivityRow = {
  id: string;        // project id in lib/projects.ts, links to /projects/[id]
  name: string;
  commits: number;
  prs: number;
};

export const ACTIVITY = {
  period: { es: "2 sep – 2 nov 2026", en: "Sep 2 – Nov 2, 2026" } as Bilingual,

  totals: [
    { key: "commits", label: { es: "Commits", en: "Commits" }, value: 804 },
    { key: "prs", label: { es: "Pull requests", en: "Pull requests" }, value: 298 },
    { key: "issues", label: { es: "Issues", en: "Issues" }, value: 34 },
    { key: "repos", label: { es: "Repositorios", en: "Repositories" }, value: 14 },
  ] satisfies ActivityTotal[],

  // Projects with the most commits in the period. Roda sums roda-app + roda-web,
  // Million Box sums million-box + million-box-ecommerce.
  byProject: [
    { id: "roda", name: "Roda", commits: 324, prs: 67 },
    { id: "million-box", name: "Million Box", commits: 183, prs: 122 },
    { id: "blackout-tracker", name: "BlackoutTracker", commits: 93, prs: 43 },
    { id: "picko-pdv", name: "Picko PdV", commits: 87, prs: 21 },
    { id: "reino-aromas", name: "Reino Aromas", commits: 35, prs: 16 },
  ] satisfies ActivityRow[],

  note: {
    es: "Repos públicos y privados (org Botinfy y propios). Commits en la rama principal de cada repo, contados como los cuenta GitHub. Fuente: API de GitHub.",
    en: "Public and private repos (Botinfy org and my own). Default-branch commits, counted the way GitHub counts them. Source: GitHub API.",
  } as Bilingual,
};
