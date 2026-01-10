import Table from 'react-bootstrap/Table';
import{updateUserData} from'./Updatestaff';
import { useEffect,useState } from 'react';
import Modelstaff from './Modelstaff';
import { AddUserData } from './Addstaffdetails';
import Addstaff from './Addstaff';
import { deleteUserData } from './Deletestaff';


import Button from 'react-bootstrap/Button';

function Staffconsole ({data,fetchData})
{
    const THS = ["staff_id","name","email","contact no","Role","join date","status"];
     const [selectrow, setSelectrow] = useState(null);
         const [showedit, setShowedit] = useState(false);
         const [staff, setstaff] = useState([]);
         const [showadd, setShowadd] = useState(false);

         useEffect(() => {
                console.log("📦 Received data in Bookconsole:", data);
                if (Array.isArray(data)) {
                  setstaff(data);
                } else {
                  console.warn("⚠️ data is not an array", data);
                  setstaff([]);
                }
              }, [data]);

    const handlecloseadd = () => setShowadd(false); // add modal

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
     

         

     const handleclose= () =>
{
        setShowedit(false);
};


const handleDelete = async (rowToDelete) => {
      try {
        await deleteUserData(rowToDelete);
        // Update local students state to remove deleted row
        setstaff((prevs) => prevs.filter((s) => s.id !== rowToDelete.staff_id));
          alert("Deleted successfully!");
        fetchData();
      } catch (err) {
        console.error("Delete failed:", err);
        alert("Failed to delete: " + err.message);
      }
    };



    return(
        <>
        <div className='d-flex justify-content-end p-3'><Button variant="primary"onClick={() => setShowadd(true)}>ADD</Button></div>
     <Table striped bordered hover>
        <thead>
          <tr>
            {THS.map((st, index) => (
                
              <th key={index}>{st}</th>
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
                    <td>{d.staff_id}</td>
                     <td>{d.name}</td>
                      <td>{d.email}</td>
                      <td>{d.phone}</td>
                      <td>{d.role}</td>
                      <td>{d.join_date}</td>
                      <td>{d.status}</td>
                     
                    <td><Button variant="success"onClick={() => handleedit(d)}>
                  EDIT
                </Button></td>
                    <td><Button variant="danger" onClick ={() => handleDelete(d)}>
                  DELETE
                </Button></td>

               </tr>
            );
 
            })}
        </tbody>


        </Table>
           <Modelstaff
        show={showedit}
        handleclose={handleclose}
        handleupdate= {handleupdate}
        selectrow={selectrow}
      />

        <Addstaff
        show={showadd}
        handleclose={handlecloseadd}
        handleadd={handleadd}
      />

      </>
        )


}
export default Staffconsole;