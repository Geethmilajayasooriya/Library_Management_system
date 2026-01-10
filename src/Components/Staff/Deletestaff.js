export async function deleteUserData(updatedRow) {
  if (!updatedRow.staff_id) {
    throw new Error("staff ID is required to update data.");
  }

  try {
    const response = await fetch(`http://localhost:8080/staff/${encodeURIComponent(updatedRow.staff_id)}`, {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Update failed:", response.status, errorText);  // log status and body
      throw new Error(`Failed to update book data: ${response.status} - ${errorText}`);
    }

    return response.json();
  } catch (err) {
    console.error("delete  error:", err.message);
    throw err;  
  }
} 



