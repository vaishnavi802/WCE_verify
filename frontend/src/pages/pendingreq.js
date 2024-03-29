import React from 'react';
import { useState, useEffect, } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Pendingreq = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const [data, setData] = useState([])
    useEffect(() => {
        const requestData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/verification/admin/pendingreq', {
                    headers: {
                        "Authorization": `Bearer ${user.token}`
                    }
                });
                if (response.status === 200) {
                    setData(response.data.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        requestData()
    }, [])
    return (
        <>
            <div className="container-table">
                <ul className="responsive-table">
                    <li className="table-header">
                        <div className="col mcol-1">Sr no</div>
                        <div className="col mcol-2">Company Name</div>
                        <div className="col mcol-3">Company Email</div>
                        <div className="col mcol-4">Student Count</div>
                        <div className="col mcol-5">Status</div>
                    </li>
                    {
                        data.length === 0 && <div className='bigBlurText' >No Pending Requests</div>
                    }
                    {data.map((item, index) => {
                        return (
                            <li className="table-row" onClick={() => navigate('pendingstudents', { state: { unqId: item._id } })} key={index}>
                                <div className="col mcol-1" data-label="Sr no">{index + 1}</div>
                                <div className="col mcol-2" data-label="Company Name">{item.orgName}</div>
                                <div className="col mcol-3" data-label="Company Email">{item.orgEmail}</div>
                                <div className="col mcol-4" data-label="Student Count">{item.studentsCount}</div>
                                {<div className="col mcol-5" data-label="Status" style={{ color: "red" }}>Pending</div>}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    );
};

export default Pendingreq;