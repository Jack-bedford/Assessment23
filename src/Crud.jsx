import './App.css';
import supabase from '../utils/supabase';
import React, { useEffect, useState } from 'react';


function Create(){}
function Update(){}
function Delete(){}


function CRUD() { 
    const [scps, setScps] = useState([]); 
    const [selectedSCP, setSelectedSCP] = useState('');  //This Deterems which scp is deleted or updated 
    const [scpData, setScpData] = useState({ //This Shows the data from the selected scp 
        ScpNumber: '',
        ScpClass: '',
        Procedure: '',
        Description: '',
        Reference: ''
    });

    useEffect(() => {
        // Fetch all SCP numbers for dropdown
        async function fetchScpList() {
        const { data, error } = await supabase.from('SCP').select('ScpNumber');
        if (!error) setScps(data);
        }

        fetchScpList();
    }, []);

    async function handleSelectChange(e) { //async due to await function 
        const scpNum = e.target.value;
        setSelectedSCP(scpNum);
    
        const { data, error } = await supabase 
          .from('SCP')
          .select()
          .eq('ScpNumber', scpNum)
          .single();
    
        if (!error && data) {
          setScpData(data);
        }
      }
    
      function handleChange(e) { 
        setScpData({ ...scpData, [e.target.name]: e.target.value });
      }
    
      async function handleUpdate(e) { // Handles the update (takes the data in the form and changes the original in the supabase)
        e.preventDefault();
        const { error } = await supabase
          .from('SCP') // the table name
          .update(scpData) 
          .eq('ScpNumber', selectedSCP);
    
        if (!error) alert('SCP updated successfully!');
      }


      async function handleNew(e) { // Handles a new scp creation 
        e.preventDefault();
    
        const { error } = await supabase
          .from('SCP')
          .insert([scpData]);
    
        if (!error) {
          alert('SCP created successfully!');
          // Reset form after success
          setScpData({
            ScpNumber: '',
            ScpClass: '',
            Procedure: '',
            Description: '',
            Reference: '',
          });
        } else {
          console.error(error);
          alert('Failed to create SCP.');
        }
      }

      async function handleDelete(e) { // Handles a deleted scp
        e.preventDefault();
      
        const { error } = await supabase
          .from('SCP')
          .delete()
          .eq('ScpNumber', selectedSCP);
      
        if (!error) {
          alert('SCP deleted successfully!');
        } else {
          console.error('Error deleting SCP:', error);
          alert('Failed to delete SCP.');
        }
      }

    
      

//Bootstrap CRUD page
//Two forms one for new and one for update and delete
      return ( 
        <div className="BoxWidth text-start text-white">
             <h4>Create:</h4>
      <form className="mb-4" onSubmit={handleNew}> 
        <div className="mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="SCP Number"
            value={scpData.ScpNumber}
            onChange={(e) =>
              setScpData({ ...scpData, ScpNumber: e.target.value })
            }
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="SCP Class"
            value={scpData.ScpClass}
            onChange={(e) =>
              setScpData({ ...scpData, ScpClass: e.target.value })
            }
          />
        </div>
        <div className="mb-2">
          <textarea
            className="form-control"
            rows="2"
            placeholder="Containment Procedure"
            value={scpData.Procedure}
            onChange={(e) =>
              setScpData({ ...scpData, Procedure: e.target.value })
            }
          />
        </div>
        <div className="mb-2">
          <textarea
            className="form-control"
            rows="2"
            placeholder="Description"
            value={scpData.Description}
            onChange={(e) =>
              setScpData({ ...scpData, Description: e.target.value })
            }
          />
        </div>
        <div className="mb-2">
          <textarea
            className="form-control"
            rows="2"
            placeholder="Reference"
            value={scpData.Reference}
            onChange={(e) =>
              setScpData({ ...scpData, Reference: e.target.value })
            }
          />
        </div>
        <button type="submit" className="btn btn-success">
          Create SCP
        </button>
      </form>
    
          <h4>Update:</h4>
    
          {/* Dropdown menu */}
          <div className="mb-3">
            <label className="form-label">Select SCP to update:</label>
            <select
              className="form-select"
              value={selectedSCP}
              onChange={handleSelectChange}
            >
              <option value="">-- Choose SCP --</option>
              {scps.map((scp) => (
                <option key={scp.ScpNumber} value={scp.ScpNumber}>
                  {scp.ScpNumber}
                </option>
              ))}
            </select>
          </div>
    
          {/* Update form (only if something selected) */}
          {selectedSCP && (
            <form onSubmit={handleUpdate}>
              <div className="mb-2">
                <input
                  type="text"
                  className="form-control"
                  name="ScpClass"
                  value={scpData.ScpClass}
                  onChange={handleChange}
                  placeholder="SCP Class"
                />
              </div>
              <div className="mb-2">
                <textarea
                  className="form-control"
                  name="Procedure"
                  value={scpData.Procedure}
                  onChange={handleChange}
                  placeholder="Containment Procedure"
                />
              </div>
              <div className="mb-2">
                <textarea
                  className="form-control"
                  name="Description"
                  value={scpData.Description}
                  onChange={handleChange}
                  placeholder="Description"
                />
              </div>
              <div className="mb-2">
                <textarea
                  className="form-control"
                  name="Reference"
                  value={scpData.Reference}
                  onChange={handleChange}
                  placeholder="Reference"
                />
              </div>
                <button type="submit" name="action" value="update" className="btn btn-warning">
                    Update SCP
                </button>
                <button onClick={handleDelete} value="delete" className="btn btn-danger m-3">
                    Delete SCP
                </button>
            </form>
          )}
      </div>
    );
}
    
    

export default CRUD;
