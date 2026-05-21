function getUserRole(input) {
  try {
    // Step 1: Parse user-provided JSON
    const user = JSON.parse(input);

    // Step 2: Validate expected structure
    if (!user.role) {
      throw new Error("Missing role field");
    }

    // Step 3: Enforce allowed roles
    if (user.role !== "admin" && user.role !== "user") {
      throw new Error("Invalid role value");
    }

    return user.role;

  } catch (error) {
    // Step 4: Handle all failures safely
    console.error("Invalid user input:", error.message);
    return "user"; // safe default
  }
}

getUserRole('{"name": "alice"}');
