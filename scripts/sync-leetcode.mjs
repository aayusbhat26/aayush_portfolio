import fs from "node:fs";
import path from "node:path";

const USERNAME = process.env.LEETCODE_USERNAME ?? "Aayush_Kumar_Bhat_08";
const ENDPOINT = "https://leetcode.com/graphql";
const TARGET = path.join("src", "data", "leetcode.json");

const query = `
  query userStats($username: String!) {
    matchedUser(username: $username) {
      contestBadge { name }
      submitStatsGlobal {
        acSubmissionNum { difficulty count }
      }
      userCalendar {
        streak
        totalActiveDays
        submissionCalendar
      }
    }
    userContestRanking(username: $username) {
      attendedContestsCount
      rating
      globalRanking
      totalParticipants
      topPercentage
    }
  }
`;

const response = await fetch(ENDPOINT, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Referer: `https://leetcode.com/u/${USERNAME}/`,
    "User-Agent": "Mozilla/5.0 (compatible; portfolio-record-sync/1.0)",
  },
  body: JSON.stringify({ query, variables: { username: USERNAME } }),
});

if (!response.ok) {
  throw new Error(`LeetCode returned ${response.status}`);
}

const payload = await response.json();
if (payload.errors?.length) {
  throw new Error(payload.errors.map((error) => error.message).join("; "));
}

const user = payload.data?.matchedUser;
const contest = payload.data?.userContestRanking;
if (!user || !contest) {
  throw new Error("LeetCode response did not include user stats");
}

const counts = Object.fromEntries(
  user.submitStatsGlobal.acSubmissionNum.map((row) => [
    row.difficulty.toLowerCase(),
    row.count,
  ])
);

const solved = counts.all;
const easy = counts.easy ?? 0;
const medium = counts.medium ?? 0;
const hard = counts.hard ?? 0;

if (solved !== easy + medium + hard) {
  throw new Error(
    `Difficulty counts do not add up: ${solved} !== ${easy + medium + hard}`
  );
}

const calendar = JSON.parse(user.userCalendar.submissionCalendar ?? "{}");
const oneYearAgo = Math.floor(Date.now() / 1000) - 365 * 24 * 60 * 60;
const submissionsLastYear = Object.entries(calendar).reduce(
  (total, [timestamp, count]) =>
    Number(timestamp) >= oneYearAgo ? total + Number(count) : total,
  0
);

const record = {
  username: USERNAME,
  solved,
  easy,
  medium,
  hard,
  rating: Math.round(contest.rating),
  badge: user.contestBadge?.name ?? null,
  attendedContests: contest.attendedContestsCount,
  globalRanking: contest.globalRanking,
  totalParticipants: contest.totalParticipants,
  topPercentage: contest.topPercentage,
  activeDays: user.userCalendar.totalActiveDays,
  currentStreak: user.userCalendar.streak,
  submissionsLastYear,
  syncedAt: new Date().toISOString(),
  profileUrl: `https://leetcode.com/u/${USERNAME}/`,
};

let previous = null;
try {
  previous = JSON.parse(fs.readFileSync(TARGET, "utf8"));
} catch {
  previous = null;
}

const comparable = (value) => {
  if (!value) return "";
  const rest = { ...value };
  delete rest.syncedAt;
  return JSON.stringify(rest);
};

if (previous && comparable(previous) === comparable(record)) {
  record.syncedAt = previous.syncedAt;
}

fs.mkdirSync(path.dirname(TARGET), { recursive: true });
fs.writeFileSync(TARGET, `${JSON.stringify(record, null, 2)}\n`);
console.log(
  `Synced ${solved} solved (${easy}/${medium}/${hard}), rating ${record.rating}, top ${record.topPercentage}%`
);
