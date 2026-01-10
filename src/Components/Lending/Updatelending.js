export async function updateUserData(updatedRow) {
  if (!updatedRow.member_id) {
    throw new Error("Member ID is required to update data.");
  }

  try {
    const response = await fetch(`http://localhost:8080/lending/${encodeURIComponent(updatedRow.lending_id)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
         lending_id: updatedRow.lending_id,
          book_id: updatedRow.book_id,
        member_id: updatedRow.member_id,
         staff_id: updatedRow.staff_id,
        issue_date: updatedRow.issue_date,
         due_date: updatedRow.due_date,
          return_date: updatedRow.return_date,
        status: updatedRow.status,
       

      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Update failed:", response.status, errorText);  // log status and body
      throw new Error(`Failed to update student data: ${response.status} - ${errorText}`);
    }

    return response.json();
  } catch (err) {
    console.error("Update error:", err.message);
    throw err;  
  }
} 



