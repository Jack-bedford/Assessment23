import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../utils/supabase';
import './App.css';

function Scps() { 
  const [scpData, setScpData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { Name } = useParams();
  {/* useeffect simply grabs the data from scp table in supabase */}
  useEffect(() => { 
    async function fetchData() { 
      const { data, error } = await supabase
        .from('SCP')
        .select()
        .eq('ScpNumber', Name)
        .single();

      if (error) {
        console.error('Error fetching SCP:', error);
      } else {
        setScpData(data);
      }
      setLoading(false);
    }

    fetchData();
  }, [Name]);

  if (loading) return <p>Loading...</p>;
  if (!scpData) return <p>No item found.</p>;

  // Determine Bootstrap background class based on SCP class
  let bgColorClass;
  switch (scpData.ScpClass?.toLowerCase()) {
    case 'safe':
      bgColorClass = 'bg-success';
      break;
    case 'euclid':
      bgColorClass = 'bg-danger';
      break;
    case 'keter':
      bgColorClass = 'bg-dark';
      break;
    default:
      bgColorClass = 'bg-secondary';
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center text-white position-relative text-center bg-dark">
      <div className="position-relative d-inline-block BoxWidth">
        {/* Image grab from its store in github  I used chatgpt for the image class so it checks if there is an image if there isnt it adds some spaces*/}
        <div className="w-100">
        <img
          className="img-fluid w-100"
          src={`https://raw.githubusercontent.com/Jack-bedford/6210images/main/images/${scpData.Image}`}
          alt={scpData.ScpNumber}
          onError={(e) => {
            e.target.style.display = 'none';
            const fallback = document.createElement('div');
            fallback.style.height = '300px';
            fallback.className = 'w-100 bg-secondary';
            e.target.parentNode.appendChild(fallback);
          }}
          style={{ minHeight: '300px', objectFit: 'cover' }}
        />
        </div>
        <div className="fade"></div>
        <div className="position-absolute top-50 start-50 translate-middle text-white p-3 rounded">
          <h2 className="ShadowOveride">{scpData.ScpNumber}</h2>
          <h3 className={`d-inline px-3 py-1 rounded ${bgColorClass} text-white`}>
            {scpData.ScpClass}
          </h3>
        </div>
      </div>

      <br />
      <br />

      <p className="BoxWidth">
        <strong>Containment Procedure:</strong> {scpData.Procedure}
      </p>

      <p className="BoxWidth">
        <strong>Description:</strong> {scpData.Description}
      </p>

      <p className="BoxWidth">
        <strong>Reference:</strong> {scpData.Reference}
      </p>

      <div className="border border-secondary rounded p-3 m-3 BoxWidth">
        <p> {/* Little footnote for added flavor */}
          <strong>
            PLEASE BE REMINDED THAT ALL INFORMATION PERTAINING TO THE SCP FOUNDATION, ITS CONSTITUENTS, AND ITS MEMBERS IS STRICTLY PROHIBITED AND LEGALLY PUNISHABLE IF REVEALED TO THE GREATER PUBLIC.
          </strong>
        </p>
      </div>
    </div>
  );
}

export default Scps;
