export const AddUserData = async (user) => {
  try {
      console.log("🚀 Sending user:", user);
    const response = await fetch("http://localhost:8080/member", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error(`Failed to add student: ${response.status} - ${await response.text()}`);
    }

    return { success: true };
  } catch (err) {
    console.error("Add error:", err);
    return { success: false, error: err.message };
  }
};
