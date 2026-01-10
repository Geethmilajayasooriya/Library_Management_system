import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';

function Modellending({show, selectrow, handleclose, handleupdate })

{
    const [lendetail,setlenndetail] = useState({
         member_id: '',
           lending_id: '',
           book_id: '',
             staff_id: '',
              issue_date: '',
               due_date: '',
    
    return_date: '',
    status: '',
    });

    useEffect(() => {
    if (selectrow) {
      setlenndetail({
        lending_id: String(selectrow.lending_id || ''),
        book_id: String(selectrow.book_id || ''),
        member_id: String(selectrow.member_id || ''),
        staff_id: String(selectrow.staff_id || ''),
        
        status: selectrow.status || '',
       
        issue_date: selectrow.issue_date ? selectrow.issue_date.slice(0, 10) : '',
         due_date: selectrow. due_date ? selectrow. due_date.slice(0, 10) : '',
          return_date: selectrow.return_date ? selectrow.return_date.slice(0, 10) : '',
      });
    } else {
      setlenndetail({
         member_id: '',
           lending_id: '',
           book_id: '',
             staff_id: '',
              issue_date: '',
               due_date: '',
    
    return_date: '',
    status: '',
      
      });
    }
  }, [selectrow]);

  const handleonchange = (e) => {   
    const { name, value } = e.target;
    setlenndetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Modal show={show} onHide={handleclose}>
      <Modal.Header closeButton>
        <Modal.Title>EDIT LENDING DATA</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {[
  
  { label: 'BOOK_ID', name: 'book_id' },
  { label: 'MEMBER_ID', name: 'member_id' },
  { label: 'STAFF_ID', name: 'staff_id' },
 
 
  { label: 'Status', name: 'status' },
  { label: 'issue Date', name: 'issue_date' },
  { label: ' due Date', name: 'due_date' },
  { label: 'return  Date', name: 'return_date' },
].map(({ label, name }) => {
  let inputType = 'text';
  if (name === 'issue_date'||name === 'due_date'||name === 'return_date') inputType = 'date';
  else if (name === 'book_id' ||name === 'member_id'|| name === 'staff_id' ) inputType = 'number';
   

  return (
    <FloatingLabel key={name} controlId={`floating-${name}`} label={label} className="mb-3">
      <Form.Control
        type={inputType}
        name={name}
        value={lendetail[name]}
        onChange={handleonchange}
        placeholder={label}
      />
    </FloatingLabel>
  );
})
}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleclose}>
          CLOSE
        </Button>
        <Button variant="primary" onClick={() => handleupdate(lendetail)}>
          UPDATE
        </Button>
      </Modal.Footer>
    </Modal>
  );
}


export default  Modellending;