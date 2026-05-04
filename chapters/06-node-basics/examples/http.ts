// Fetch JSON from a public API using the global `fetch`.
// Requires internet access. If offline, this will just throw.

type RepoInfo = {
  full_name: string;
  description: string | null;
  stargazers_count: number;
};

function isRepoInfo(x: unknown): x is RepoInfo {
  return (
    typeof x === "object" &&
    x !== null &&
    "full_name" in x &&
    typeof (x as Record<string, unknown>)["full_name"] === "string"
  );
}

const res = await fetch("https://api.github.com/repos/microsoft/typescript");
if (!res.ok) {
  throw new Error(`HTTP ${res.status} ${res.statusText}`);
}

const data: unknown = await res.json();
if (!isRepoInfo(data)) {
  throw new Error("unexpected response shape");
}

console.log(data.full_name);
console.log(data.description ?? "(no description)");
console.log(`★ ${data.stargazers_count}`);
