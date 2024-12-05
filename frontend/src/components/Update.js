import style from './test.module.css';
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const Update = () => {

    const [update,setUpdate]=useState('');
    const [status,setStatus]=useState(false);
    const [date,setDate]=useState('');
    const navigate=useNavigate();

    const {id}=useParams();
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/api/'+id)
        .then(res=>{
            setUpdate(res.data.task);
            setStatus(res.data.completed)
            setDate(res.data.due_date)
            console.log(res.data);
        })
    },[id])

    const handleUpdate=(e) => {
        e.preventDefault();
        
        axios.put('http://127.0.0.1:8000/api/',{"id":id,"task": update,
            "completed": status,
            "due_date": date})

            .then(response => {
                console.log('Item Updated successfully', response.data);
                navigate('/')
                
                
            })

        .catch(error=>console.log(error))

    }


    

    return ( 
        <div className={style.cont}>
            <form  onSubmit={handleUpdate} className={style.todo_form}>
                <table className={style.todo_table}>
                <tr className={style.todo_tr}>
                <label className={style.todo_label} >TODO</label>
                <input type="text" value={update} onChange={(e)=>setUpdate(e.target.value)} />
                </tr>
                <tr className={style.todo_tr}>

                
                <label className={style.todo_label}>Status</label>
                <input type="checkbox" checked={status} onChange={(e)=>setStatus(e.target.checked)} />
                </tr>

                <tr className={style.todo_tr}>

               
               <label className={style.todo_label}>Date</label>
                <input type="date" defaultValue={date} onChange={(e)=>setDate(e.target.value)}/>
                
                </tr>
                <tr className={style.todo_tr}>
                <button type='submit' className={style.button}>Update</button>
                </tr>
                </table>

            </form>
        </div>
     );
}
 
export default Update;
