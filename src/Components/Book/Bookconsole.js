import Table from 'react-bootstrap/Table';
import { useEffect,useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modelbook from './Modelbook';
import{updateUserData} from'./Updatebook';
import { deleteUserData } from './Deletebook';
import { AddUserData } from './ADDdetails';
import Addbook from './Addbook';

 

function Bookconsole ({data,fetchData})
{
    const TH = ["book_id", "title", "author","publisher","isbn","genre","language","copies_total","copies_available","location","added-date"];
    const [selectrow, setSelectrow] = useState(null);
  const [showedit, setShowedit] = useState(false);
  const [books, setbooks] = useState([]);
   const [showadd, setShowadd] = useState(false);

  

     
    useEffect(() => {
  console.log("📦 Received data in Bookconsole:", data);
  if (Array.isArray(data)) {
    setbooks(data);
  } else {
    console.warn("⚠️ data is not an array", data);
    setbooks([]);
  }
}, [data]);

 const handlecloseadd = () => setShowadd(false); // for add modal


    const handleedit=(a)=>
    {
        setSelectrow(a);
       setShowedit(true);
       

    }
const handleclose= () =>
{
        setShowedit(false);
};

const handleupdate = async (updatedRow) => {
    try {
      const result = await updateUserData(updatedRow);
      console.log("Backend result:", result);

      if (result.success) {
        alert("Update successful!");
        setShowedit(false);
        fetchData(); // refresh data from backend
      } else {
        alert("Update failed: " + (result.error || result.message));
      }
    } catch (err) {
      alert("Exception while updating: " + err.message);
    }
  };
   const handleDelete = async (rowToDelete) => {
      try {
        await deleteUserData(rowToDelete);
        // Update local students state to remove deleted row
        setbooks((prevbooks) => prevbooks.filter((s) => s.id !== rowToDelete.book_id));
          alert("Deleted successfully!");
        fetchData();
      } catch (err) {
        console.error("Delete failed:", err);
        alert("Failed to delete: " + err.message);
      }
    };

const handleadd = async (updatedRow) => {
    try {
      const result = await AddUserData(updatedRow);
      console.log("Backend result:", result);

      if (result.success) {
        alert("ADD successful!");
        setShowedit(false);
        fetchData(); // refresh data from backend
      } else {
        alert("ADD failed: " + (result.error || result.message));
      }
    } catch (err) {
      alert("Exception while updating: " + err.message);
    }
  };

    return(
        <>
         <div className='d-flex justify-content-end p-3'><Button variant="primary"onClick={() => setShowadd(true)}>ADD</Button></div>
        <Table striped bordered hover>
        <thead>
          <tr>
            {TH.map((heading, index) => (
                
              <th key={index}>{heading}</th>
            ))}
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
            {books.map((d,i)=>
            {
                return(
                <tr key={i}>
                    <td>{d.book_id}</td>
                     <td>{d.title}</td>
                      <td>{d.author}</td>
                      <td>{d.publisher}</td>
                      <td>{d.isbn}</td>
                      <td>{d.genre}</td>
                      <td>{d.language}</td>
                     <td>{d.copies_total}</td> 
                     <td>{d.copies_available}</td>
                    <td>{d.shelf_location}</td>
                    <td>{d.added_date}</td>
                    <td><Button variant="success" onClick={() => handleedit(d)}>
                  EDIT
                </Button></td>
                    <td><Button variant="danger" onClick= {() => handleDelete(d)}>
                  DELETE
                </Button></td>

               </tr>
            );
 
            })}
        </tbody>
        
          
      </Table>
      <Modelbook
        show={showedit}
        handleclose={handleclose}
        handleupdate= {handleupdate}
        selectrow={selectrow}
      />
<Addbook
        show={showadd}
        handleclose={handlecloseadd}
        handleadd={handleadd}
      />


        </>
    )


}

export default  Bookconsole;