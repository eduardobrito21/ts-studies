// A quick tour of the utility types.

type User = { id: number; name: string; email: string };

type UserUpdate = Partial<User>;     // every field optional
type UserPreview = Pick<User, "id" | "name">;
type UserSansEmail = Omit<User, "email">;

const update: UserUpdate = { name: "Grace" };   // fine
const preview: UserPreview = { id: 1, name: "Ada" };
const sansEmail: UserSansEmail = { id: 1, name: "Ada" };

console.log({ update, preview, sansEmail });

// ReturnType and Parameters peel apart function types.
function makeUser(id: number, name: string): User {
  return { id, name, email: `${name.toLowerCase()}@example.com` };
}

type MakeUserArgs = Parameters<typeof makeUser>;   // [number, string]
type MakeUserResult = ReturnType<typeof makeUser>; // User

const args: MakeUserArgs = [1, "Ada"];
const made: MakeUserResult = makeUser(...args);
console.log(made);

// Record is how you say "dict".
const counts: Record<string, number> = {};
counts["apple"] = 3;
counts["banana"] = 5;
console.log("counts:", counts);
