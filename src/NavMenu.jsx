import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import supabase from '../utils/supabase';

function NavMenu() {
  const [scps, setScps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchScps() {
      const { data, error } = await supabase
      .from('SCP')
      .select()
      .order('ScpNumber', { ascending: true });

      if (error) {
        console.error('Error fetching SCPs:', error);
      } else {
        setScps(data || []);
      }
      setLoading(false);
    }

    fetchScps();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light sticky-top bg-dark border-bottom text-white">
      <div className="container-fluid">
        <Link className="navbar-brand text-white" to="/">SCP Foundation</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button> 

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {loading ? (
              <li className="nav-item text-white">
                <div className="spinner-border text-white" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div> {/* this grabs the scp instances number and displays it along the navbar */}
              </li> 
            ) : scps.length > 0 ? ( 
              scps.map(scp => (
                <li key={scp.ScpNumber} className="nav-item">
                  <NavLink
                    to={`/scp/${scp.ScpNumber}`}
                    className="nav-link text-white"
                    activeclassname="active"
                  >
                    {scp.ScpNumber}
                  </NavLink>
                </li>
              ))
            ) : (
              <li className="nav-item text-white">No SCPs found.</li> 
            )}
          </ul>
        </div>
        <div className="container-fluid">
          <Link className="navbar-brand text-white" to="/Crud">CRUD</Link> {/* Crud page link displayed at the end */}
        </div>
      </div>
    </nav>
  );
}

export default NavMenu;
