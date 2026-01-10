import Table from 'react-bootstrap/Table';
import { useEffect,useState } from 'react';
import Button from 'react-bootstrap/Button';
import{updateUserData} from'./Updatelending';
import Modellending from './Modellending';
import { AddUserData } from './Addlendetails';
import Addlending from './Addlending';
import { deleteUserData } from './Deletelending';

function Lendingconsole({data,fetchData})

{
    const Lh = ["lending_id","book_id","member_id","staff_id","issue_date","due_date","return_date","status"];
     const [lending, setlending] = useState([]);
       const [selectrow, setSelectrow] = useState(null);
     const [showedit, setShowedit] = useState(false);
     const [showadd, setShowadd] = useState(false);
     useEffect(() => {
       console.log("📦 Received data in Bookconsole:", data);
       if (Array.isArray(data)) {
         setlending(data);
       } else {
         console.warn("⚠️ data is not an array", data);
         setlending([]);
       }
     }, [data]);


       const handleedit=(row) =>
          {
           setSelectrow(row);
           setShowedit(true);
         
          }
     
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
        setlending((prevbooks) => prevbooks.filter((s) => s.id !== rowToDelete.lending_id));
          alert("Deleted successfully!");
        fetchData();
      } catch (err) {
        console.error("Delete failed:", err);
        alert("Failed to delete: " + err.message);
      }
    };
            

     
          const handleclose= () =>
     {
             setShowedit(false);
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

       const handlecloseadd = () => setShowadd(false); // for add modal
     
     
    return(
        <>
        <div className='d-flex justify-content-end p-3'><Button variant="primary"onClick={() => setShowadd(true)}>ADD</Button></div>
         <Table striped bordered hover>
        <thead>
          <tr>
            {Lh.map((heading, index) => (
                
              <th key={index}>{heading}</th>
            ))}
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
            {data.map((d,i)=>
            {
                return(
                <tr key={i}>
                    <td>{d.lending_id}</td>
                     <td>{d.book_id}</td>
                    
                      <td>{d.member_id}</td>
                      <td>{d.staff_id}</td>
                      <td>{d.issue_date}</td>
                      <td>{d.due_date}</td>
                      <td>{d.return_date}</td>
                      <td>{d.status}</td>
                     
                    <td><Button variant="success"  onClick={() => handleedit(d)}>
                  EDIT
                </Button></td>
                    <td><Button variant="danger"onClick= {() => handleDelete(d)}>
                  DELETE
                </Button></td>

               </tr>
            );
 
            })}
        </tbody>
        </Table>

          <Modellending
        show={showedit}
        handleclose={handleclose}
        handleupdate= {handleupdate}
        selectrow={selectrow}
      />

      <Addlending
        show={showadd}
        handleclose={handlecloseadd}
        handleadd={handleadd}
      />
        </>
    )

}

export default Lendingconsole;