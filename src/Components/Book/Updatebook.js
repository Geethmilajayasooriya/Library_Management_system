export async function updateUserData(updatedRow) {
  if (!updatedRow.book_id) {
    throw new Error("Student ID is required to update data.");
  }

  try {
    const response = await fetch(`http://localhost:8080/book/${encodeURIComponent(updatedRow.book_id)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        book_id: updatedRow.book_id,
        title: updatedRow.title,
        author: updatedRow.author,
        publisher: updatedRow.publisher,
        isbn: updatedRow.isbn,
        genre: updatedRow.genre,
        language: updatedRow.language,
        copies_total: updatedRow.copies_total,
        copies_available: updatedRow.copies_available,
        shelf_location: updatedRow.shelf_location,
        added_date: updatedRow.added_date,

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



