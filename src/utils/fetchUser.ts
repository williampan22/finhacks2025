async function fetchUser(emailOrId: { email?: string; id?: string; }) {
  try {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emailOrId),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    const user = await response.json();
    console.log(user);
    return user;
  } catch (error) {
    console.error(error.message);
  }
}

// // Example: Fetch user by email
// fetchUser({ email: "user@example.com" });
//
// // Example: Fetch user by ID
// fetchUser({ id: "678c374c89749bd8a8d497ab" });
