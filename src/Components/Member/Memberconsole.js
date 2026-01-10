import Table from 'react-bootstrap/Table';
import { useEffect,useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modelmember from './Modelmember';
import{updateUserData} from'./Updatemember';
import { deleteUserData } from './Deletemember';
import { AddUserData } from './Addmemdetails';
import Addmember from './Addmember';

function Memberconsole({data,fetchData})

{
    const THM = ["member_id","name","email","contact no","address","join date","status"];
    const [members, setmembers] = useState([]);
     const [selectrow, setSelectrow] = useState(null);
     const [showedit, setShowedit] = useState(false);
      const [showadd, setShowadd] = useState(false);
   

      useEffect(() => {
       console.log("📦 Received data in Bookconsole:", data);
       if (Array.isArray(data)) {
         setmembers(data);
       } else {
         console.warn("⚠️ data is not an array", data);
         setmembers([]);
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

     const handleclose= () =>
{
        setShowedit(false);
};


const handleDelete = async (rowToDelete) => {
      try {
        await deleteUserData(rowToDelete);
        // Update local students state to remove deleted row
        setmembers((prevbooks) => prevbooks.filter((s) => s.id !== rowToDelete.member_id));
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
  const handlecloseadd = () => setShowadd(false); // add modal


    return(
        <>
         <div className='d-flex justify-content-end p-3'><Button variant="primary"onClick={() => setShowadd(true)}>ADD</Button></div>
        <Table striped bordered hover>
        <thead>
          <tr>
            {THM.map((he, index) => (
                
              <th key={index}>{he}</th>
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
                    <td>{d.member_id}</td>
                     <td>{d.name}</td>
                      <td>{d.email}</td>
                      <td>{d.phone}</td>
                      <td>{d.address}</td>
                      <td>{d.join_date}</td>
                      <td>{d.status}</td>
                     
                    <td><Button variant="success" onClick={() => handleedit(d)}>
                  EDIT
                </Button></td>
                    <td><Button variant="danger"onClick ={() => handleDelete(d)}>
                  DELETE
                </Button></td>

               </tr>
            );
 
            })}
        </tbody>


         </Table>
          <Modelmember
        show={showedit}
        handleclose={handleclose}
        handleupdate= {handleupdate}
        selectrow={selectrow}
      />

      <Addmember
        show={showadd}
        handleclose={handlecloseadd}
        handleadd={handleadd}
      />

        </>
    )


}

export  default Memberconsole;