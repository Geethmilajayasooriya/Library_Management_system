
import './App.css';
import ColorSchemesExample from './Components/ColorSchemesExample';


import { useState ,useEffect} from 'react';


import Bookconsole from './Components/Book/Bookconsole';
import Memberconsole from './Components/Member/Memberconsole';
import Firstpage from './Components/Firstpage';
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom';
import Staffconsole from './Components/Staff/Staffconsole';
import Lendingconsole from './Components/Lending/Lendingconsole';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import { useNavigate } from 'react-router-dom';




function App() {
 
    const [bookData, setBookData] = useState([]);
const [staffData, setstaffData] = useState([]);
    const [memberData, setmemberData] = useState([]);
     const [lendingData, setlendingData] = useState([]);
     const [loggedIn, setLoggedIn] = useState(false); //  Track login
     const [user, setUser] = useState(null); // store logged-in user
 
  const fetchData = async () => {
  try {
    const response = await fetch('http://localhost:8080/book');
    const data = await response.json();
    console.log("Fetched book data:", data); 
    setBookData(data);
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

  useEffect(() => {
    fetchData();
  }, []);

  

  const fetchstaff = async () => {
  try {
    const response = await fetch('http://localhost:8080/staff');
    const data = await response.json();
    console.log("Fetched staff data:", data); 
    setstaffData(data);
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

  useEffect(() => {
    fetchstaff();
  }, []);


  const fetchMem = async () => {
  try {
    const response = await fetch('http://localhost:8080/member');
    const data = await response.json();
    console.log("Fetched book data:", data); 
    setmemberData(data);
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

  useEffect(() => {
    fetchMem();
  }, []);


   const fetchlen = async () => {
  try {
    const response = await fetch('http://localhost:8080/lending');
    const data = await response.json();
    console.log("Fetched book data:", data); 
    setlendingData(data);
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

  useEffect(() => {
    fetchlen();
  }, []);

  return (
    <>
    
     
    <BrowserRouter>
   
    <ColorSchemesExample/>
    <Routes>
      <Route path='/' element={<Login onSuccess={(user) => { setLoggedIn(true); setUser(user); console.log(user); }} />}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/home' element={<Firstpage user={user} />} />
      <Route path='/book' element={<Bookconsole data={bookData} fetchData={fetchData} />}/>
      <Route path='/member' element={<Memberconsole data ={memberData}  fetchData = {fetchMem}> </Memberconsole>}/>
      <Route path='/staff' element={<Staffconsole data ={staffData}  fetchData = {fetchstaff} ></Staffconsole>}/>
      <Route path='/lending' element={<Lendingconsole data ={lendingData}  fetchData = {fetchlen}/>}/>
      <Route path='/contact' element={<Contact/>}/>

    </Routes>
    <Footer />





</BrowserRouter>




     
         



   
    </>
  );
}

export default App;
