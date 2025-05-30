import React, { useEffect } from 'react'; 
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom'; 
import NavMenu from './NavMenu.jsx'; // Navmenu at the top of the page displays crud and scps
import Scp from './scp.jsx'; // Importing the selected scp from supabase
import Home from './home.jsx'; 
import './App.css'; //css
import supabase from '../utils/supabase'; // imports supabase information and password ( THIS IS MY SUPABASE.JS  CONFIG (BUT MADE AS SUPABASE RECOMMENDS))
import CRUD from './Crud'; // importing a new page called Crud (create read ...) 

function ScpWrapper() {  //Tell the Scp page which scp to formatt
  const { Name } = useParams();
  return <Scp Name={Name} />; 
}

function App() {
  useEffect(() => {
    async function test() {
      const { data, error } = await supabase
        .from('SCP')
        .select('ScpNumber');
      console.log('SCP data:', data);
      console.error('SCP error:', error);
    }

    test();
  }, []);

  return (
    // Page order
    <Router>
      <div className="bg-dark p-3">
        <NavMenu />
      </div>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scp/:Name" element={<ScpWrapper />} />
          <Route path="/Crud" element={<CRUD />} /> {/* ✅ This is required */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// I GOT SO PISSED OFF AT SOMEPOINT AND MY CODE BECAME A MESS BECAUSE I COULDNT FIGURE OUT WHY THE TABLE RETURNED NO DATA
// TURNS OUT I DIDNT DISABLE RLS IN THE TABLE EDITOR ON SUPABASE LOL (only a short 4 hours)