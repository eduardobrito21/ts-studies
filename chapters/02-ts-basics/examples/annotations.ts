// Basic TypeScript annotations.

type User = {
  id: number;
  name: string;
  email: string | null;
  roles: readonly string[];
};

function describeUser(u: User): string {
  const emailPart = u.email ?? "no email";
  return `${u.name} (#${u.id}) — ${emailPart} — roles: ${u.roles.join(", ")}`;
}

const ada: User = {
  id: 1,
  name: "Ada",
  email: "ada@example.com",
  roles: ["admin", "editor"],
};

console.log(describeUser(ada));

// Literal union: only these three strings are legal.
type Status = "pending" | "active" | "done";
function isTerminal(s: Status): boolean {
  return s === "done";
}
console.log("active terminal?", isTerminal("active"));
console.log("done terminal?", isTerminal("done"));
