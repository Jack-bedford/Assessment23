import {useState, useEffect} from 'react';
import {supabase} from './supabase';

function AdminPanel()
{
    const [items, setItems] = useState([]);
    const [newRecord, setNewRecord] = useState({
        ScpNumber: '',
        ScpClass: '',
        Procedure: '',
        Description: '',
        Reference: '',
        Image: ''
    });

    const [editRecord, setEditRecord] = useState(null);

    return(
        <>
        </>
    )
}

export default AdminPanel;