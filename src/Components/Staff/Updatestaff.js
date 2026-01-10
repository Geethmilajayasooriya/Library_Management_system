export async function updateUserData(updatedRow) {
  if (!updatedRow.staff_id) {
    throw new Error("Staff ID is required to update data.");
  }

  try {
    const response = await fetch(`http://localhost:8080/staff/${encodeURIComponent(updatedRow.staff_id)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        staff_id: updatedRow.staff_id,
        name: updatedRow.name,
        email: updatedRow.email,
        
        phone: updatedRow.phone,
        role: updatedRow.role,
        
       
        status: updatedRow.status,
        join_date: updatedRow.join_date,

      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Update failed:", response.status, errorText);  // log status and body
      throw new Error(`Failed to update staff  data: ${response.status} - ${errorText}`);
    }

    return response.json();
  } catch (err) {
    console.error("Update error:", err.message);
    throw err;  
  }
} 



