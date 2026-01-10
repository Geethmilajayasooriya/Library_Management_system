export async function updateUserData(updatedRow) {
  if (!updatedRow.member_id) {
    throw new Error("Member ID is required to update data.");
  }

  try {
    const response = await fetch(`http://localhost:8080/member/${encodeURIComponent(updatedRow.member_id)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        member_id: updatedRow.member_id,
        name: updatedRow.name,
        email: updatedRow.email,
        
        phone: updatedRow.phone,
        address: updatedRow.address,
        
       
        status: updatedRow.status,
        join_date: updatedRow.join_date,

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



