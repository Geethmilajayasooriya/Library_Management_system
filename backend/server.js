const express = require('express')
const mysql = require('mysql2')


const cors =  require('cors')
const bcrypt = require('bcrypt');


const app =express()
app.use(cors())
app.use(express.json()); 

const db =mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Kbgt@2001",
    database:"Library"
})
app.get('/',(re,res)=>
{
    return res.json("from backend side");
})
//book
app.get('/book',(re,res)=>
{
    const sql = " SELECT * FROM book";
    db.query(sql,(err,data)=>
    {
        if(err)
        {
            return res.json(err);
        }
        else{
           return res.json(data); 
        }
    })
})


app.patch('/book/:book_id', (req, res) => {
  const bookId = req.params.book_id;

  let {
    title,
    author,
    publisher,
    isbn,
    genre,
    language,
    copies_total,
    copies_available,
    shelf_location,
    added_date,
  } = req.body;

  // Convert copies to numbers
  copies_total = Number(copies_total);
  copies_available = Number(copies_available);

  // Validate numeric fields
  if (isNaN(copies_total) || isNaN(copies_available)) {
    return res.status(400).json({ error: "copies_total and copies_available must be valid numbers" });
  }

  // added_date - expected to be a string in 'YYYY-MM-DD' 
  
  
  const sql = `
    UPDATE book SET 
      title = ?, 
      author = ?, 
      publisher = ?, 
      isbn = ?, 
      genre = ?, 
      language = ?, 
      copies_total = ?, 
      copies_available = ?, 
      shelf_location = ?, 
      added_date = ?
    WHERE book_id = ?
  `;

  const values = [
    title,
    author,
    publisher,
    isbn,
    genre,
    language,
    copies_total,
    copies_available,
    shelf_location,
    added_date,
    bookId,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Update error:", err);
      return res.status(500).json({ error: "Database error while updating book." });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Book not found." });
    }
    res.json({ success: true, message: "Book updated successfully." });
  });
});

app.delete('/book/:book_id', (req, res) => {
  const bookId = req.params.book_id;

  // Step 1: Delete from lending table first
  const deleteLending = "DELETE FROM lending WHERE book_id = ?";
  db.query(deleteLending, [bookId], (lendingErr, lendingResult) => {
    if (lendingErr) {
      console.error("Lending delete error:", lendingErr.sqlMessage);
      return res.status(500).json({ error: "Failed to delete from lending table." });
    }

    // Step 2:  delete from book table
    const deleteBook = "DELETE FROM book WHERE book_id = ?";
    db.query(deleteBook, [bookId], (bookErr, bookResult) => {
      if (bookErr) {
        console.error("Book delete error:", bookErr.sqlMessage);
        return res.status(500).json({ error: "Failed to delete book." });
      }

      if (bookResult.affectedRows === 0) {
        return res.status(404).json({ error: "Book not found." });
      }

      res.json({ success: true, message: "Book and related lending records deleted successfully." });
    });
  });
});

app.post('/book', (req, res) => {
    console.log("Incoming request body:", req.body); 
  const { title,
    author,
    publisher,
    isbn,
    genre,
    language,
    copies_total,
    copies_available,
    shelf_location,
    added_date, } = req.body;
  console.log("Add student request body:", req.body);
  const sql = 'INSERT INTO book (title,author,publisher,isbn,genre,language, copies_total,copies_available,shelf_location,added_date) VALUES ( ?, ?,?,?,?,?,?,?,?,?)';
  db.query(sql, [ title,
    author,
    publisher,
    isbn,
    genre,
    language,
    copies_total,
    copies_available,
    shelf_location,
    added_date,], (err, result) => {
    if (err) {
      console.error("Error adding book:", err);
      return res.status(500).json({ success: false, error: 'Failed to add book' });
    }
    res.json({ success: true, id: result.insertId });
  });
})
//member
app.get('/member', (req, res) => {
  const sql = "SELECT * FROM member";
  db.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
});

app.patch('/member/:member_id', (req, res) => {
  const memId = req.params.member_id;

  let {
    name,
    email,
    phone,
    address,
    join_date,
    status,
  } = req.body;

  
  
  const sql = `
    UPDATE member SET 
      name = ?, 
      email = ?, 
      phone= ?, 
      address= ?, 
     
      
      join_date = ?,
       status =?
    WHERE member_id = ?
  `;

  const values = [
    name,
    email,
    phone,
    address,
    join_date,
    status,
    memId,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Update error:", err.sqlMessage)  
    
      return res.status(500).json({ error: "Database error while updating  member." });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "member not found." });
    }
    res.json({ success: true, message: "member updated successfully." });
  });
});

app.delete('/member/:member_id', (req, res) => {
  const memId = req.params.member_id;

  // Step 1: Delete from lending table first
  const deleteLending = "DELETE FROM lending WHERE member_id = ?";
  db.query(deleteLending, [memId], (lendingErr, lendingResult) => {
    if (lendingErr) {
      console.error("Lending delete error:", lendingErr.sqlMessage);
      return res.status(500).json({ error: "Failed to delete from lending table." });
    }

    // Step 2: Now delete from book table
    const Deletemember = "DELETE FROM member WHERE member_id = ?";
    db.query(Deletemember, [memId], (memErr, memResult) => {
      if (memErr) {
        console.error("member delete error:", memErr.sqlMessage);
        return res.status(500).json({ error: "Failed to delete member." });
      }

      if (memResult.affectedRows === 0) {
        return res.status(404).json({ error: "member  not found." });
      }

      res.json({ success: true, message: "Member and related lending records deleted successfully." });
    });
  });
});

app.post('/member', (req, res) => {
    console.log("Incoming request body:", req.body); 
  const { name,
    email,
    phone,
    address,
    join_date,
    status,
     } = req.body;
  console.log("Add member request body:", req.body);
  const sql = 'INSERT INTO member ( name,email,phone,address,join_date,status) VALUES ( ?, ?,?,?,?,?)';
  db.query(sql, [  name,
    email,
    phone,
    address,
    join_date,
    status,
    ], (err, result) => {
    if (err) {
      console.error("Error adding member:", err);
      return res.status(500).json({ success: false, error: 'Failed to add book' });
    }
    res.json({ success: true, id: result.insertId });
  });
})

//staff
app.get('/staff', (req, res) => {
  const sql = "SELECT * FROM staff";
  db.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
});


app.patch('/staff/:staff_id', (req, res) => {
  const staffId = req.params.staff_id;

  let {
    name,
    email,
    phone,
    role,
    join_date,
    status,
  } = req.body;

  
  
  const sql = `
    UPDATE staff SET 
      name = ?, 
      email = ?, 
      phone= ?, 
      role= ?, 
     
      
      join_date = ?,
       status =?
    WHERE staff_id = ?
  `;

  const values = [
    name,
    email,
    phone,
    role,
    join_date,
    status,
    staffId,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Update error:", err.sqlMessage)  
    
      return res.status(500).json({ error: "Database error while updating  member." });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "member not found." });
    }
    res.json({ success: true, message: "member updated successfully." });
  });
});


// POST /staff — Add new staff
app.post('/staff', (req, res) => {
  const {
    name,
    email,
    phone,
    role,
    join_date,
    status
  } = req.body;

  const sql = `
    INSERT INTO staff (name, email, phone, role, join_date, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [name, email, phone, role, join_date, status], (err, result) => {
    if (err) {
      console.error("Error adding staff:", err.sqlMessage);
      return res.status(500).json({ success: false, error: "Failed to add staff" });
    }
    res.json({ success: true, id: result.insertId });
  });
});


app.delete('/staff/:staff_id', (req, res) => {
  const stId = req.params.staff_id;

  // Step 1: Delete from lending table first
  const deleteLending = "DELETE FROM lending WHERE staff_id = ?";
  db.query(deleteLending, [stId], (lendingErr, lendingResult) => {
    if (lendingErr) {
      console.error("Lending delete error:", lendingErr.sqlMessage);
      return res.status(500).json({ error: "Failed to delete from lending table." });
    }

    // Step 2: Now delete from book table
    const Deletemember = "DELETE FROM staff WHERE staff_id = ?";
    db.query(Deletemember, [stId], (memErr, memResult) => {
      if (memErr) {
        console.error("staff delete error:", memErr.sqlMessage);
        return res.status(500).json({ error: "Failed to delete staff." });
      }

      if (memResult.affectedRows === 0) {
        return res.status(404).json({ error: "staff  not found." });
      }

      res.json({ success: true, message: "staff and related lending records deleted successfully." });
    });
  });
});


//Lending
app.get('/lending', (req, res) => {
  const sql = "SELECT * FROM lending";
  db.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
});



app.patch('/lending/:lending_id', (req, res) => {
  const slenId = req.params.lending_id;

  let {
    book_id,
    member_id,
    staff_id,
    issue_date,
    due_date,
    return_date,
    status,
   
  } = req.body;

  
  
  const sql = `
    UPDATE lending  SET 
       book_id=? , 
      member_id = ?, 
      staff_id= ?, 
      issue_date= ?, 
     
      
      due_date = ?,
       return_date = ?,
       status =?
    WHERE lending_id = ?
  `;

  const values = [
    book_id,
    member_id,
    staff_id,
    issue_date,
    due_date,
    return_date,
    status,
    slenId,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Update error:", err.sqlMessage) 
    
      return res.status(500).json({ error: "Database error while updating  lending." });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "lending  not found." });
    }
    res.json({ success: true, message: "lending updated successfully." });
  });
});



app.post('/lending', (req, res) => {
  const {
   book_id,
    member_id,
    staff_id,
    issue_date,
    due_date,
    return_date,
    status,
  } = req.body;

  const sql = `
    INSERT INTO lending(book_id, member_id, staff_id, issue_date, due_date, return_date,status)
    VALUES (?, ?, ?, ?, ?, ?,?)
  `;

  db.query(sql, [book_id, member_id, staff_id, issue_date, due_date, return_date,status], (err, result) => {
    if (err) {
      console.error("Error adding lending:", err.sqlMessage);
      return res.status(500).json({ success: false, error: "Failed to add lending" });
    }
    res.json({ success: true, id: result.insertId });
  });
});


app.delete('/lending/:lending_id', (req, res) => {
  const lenId = req.params.lending_id;
    // Step 2: Now delete from book table
    const Deletemember = "DELETE FROM lending WHERE lending_id = ?";
    db.query(Deletemember, [lenId], (memErr, memResult) => {
      if (memErr) {
        console.error("lending delete error:", memErr.sqlMessage);
        return res.status(500).json({ error: "Failed to delete lending." });
      }

      if (memResult.affectedRows === 0) {
        return res.status(404).json({ error: "staff  not found." });
      }

      res.json({ success: true, message: "staff and related lending records deleted successfully." });
    });
  });
  app.post('/users', (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, result) => {
    if (err) {
      console.error("Login error:", err);
      return res.status(500).json({ success: false, error: "Database error" });
    }

    if (result.length === 0) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const user = result[0];
    const stored = user.password || '';
    // If password field is bcrypt hash (starts with $2), compare with bcrypt
    if (stored.startsWith('$2')) {
      bcrypt.compare(password, stored, (bcryptErr, same) => {
        if (bcryptErr) {
          console.error('Bcrypt compare error:', bcryptErr);
          return res.status(500).json({ success: false, error: 'Server error' });
        }
        if (same) {
          const userSafe = { ...user };
          delete userSafe.password;
          res.json({ success: true, message: "Login successful", user: userSafe });
        } else {
          return res.status(401).json({ success: false, message: "Invalid email or password" });
        }
      });
    } else {
      // Backward compatibility: stored password is plaintext
      if (password === stored) {
        // Re-hash and update the user's password in DB
        bcrypt.hash(password, 10, (hashErr, newHash) => {
          if (hashErr) {
            console.error('Hash update error:', hashErr);
          } else {
            db.query('UPDATE users SET password = ? WHERE id = ?', [newHash, user.id], (uErr) => {
              if (uErr) console.error('Password update DB error:', uErr);
            });
          }
        });
        const userSafe = { ...user };
        delete userSafe.password;
        res.json({ success: true, message: "Login successful", user: userSafe });
      } else {
        return res.status(401).json({ success: false, message: "Invalid email or password" });
      }
    }
  });
});

// Register new user
app.post('/users/register', (req, res) => {
  const { name, email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  // Check for existing user
  const checkSql = "SELECT * FROM users WHERE email = ?";
  db.query(checkSql, [email], (checkErr, checkResult) => {
    if (checkErr) {
      console.error("Register check error:", checkErr);
      return res.status(500).json({ success: false, error: "Database error" });
    }

    if (checkResult.length > 0) {
      return res.status(409).json({ success: false, message: "Email already registered" });
    }

    // Ensure 'name' column exists (some DBs may not have it)
    db.query("SHOW COLUMNS FROM users LIKE 'name'", (colErr, colRes) => {
      if (colErr) {
        console.error('Column check error:', colErr);
        return res.status(500).json({ success: false, error: 'Database error' });
      }

      const doInsert = () => {
        // Hash the password before inserting
        bcrypt.hash(password, 10, (hashErr, hashed) => {
          if (hashErr) {
            console.error('Hash error:', hashErr);
            return res.status(500).json({ success: false, error: 'Server error' });
          }
          const insertSql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
          db.query(insertSql, [name || null, email, hashed], (insertErr, insertResult) => {
            if (insertErr) {
              console.error("Register error:", insertErr);
              const errMsg = insertErr.sqlMessage || insertErr.message || 'Failed to register user';
              return res.status(500).json({ success: false, error: errMsg });
            }

            res.json({ success: true, message: "User registered successfully", id: insertResult.insertId });
          });
        });
      };

      if (colRes.length === 0) {
        db.query("ALTER TABLE users ADD COLUMN name VARCHAR(255)", (alterErr) => {
          if (alterErr) {
            console.error('Alter table error:', alterErr);
            return res.status(500).json({ success: false, error: 'Database error' });
          }
          doInsert();
        });
      } else {
        doInsert();
      }
    });
  });
});

// Simple contact endpoint (stores or sends messages — currently logs and returns success)
app.post('/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Name, email and message are required' });
  }

  console.log('Contact message received:', { name, email, subject, message });

  // TODO: integrate with email service or DB; for now, respond success
  res.json({ success: true, message: 'Message received' });
});








app.listen(8080,()=>
{
    console.log("listening");

}) 


