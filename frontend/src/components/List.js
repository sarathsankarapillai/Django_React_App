import './List.css';
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import styles from './set.module.css';


const List = () => {
    const [task,setTask]=useState('');
    const [check,setCheck]=useState(false);
    const [list,setList]=useState([]);
    const [date, setDate] = useState('');
    const [errors,setErrors]=useState(null);
    const navigate=useNavigate();
   
  



    const handleSubmit=(e) => {
        e.preventDefault();
        
        axios.post('http://127.0.0.1:8000/api/',{"task": task,
            "completed": check,
            "due_date": date})

            .then(response => {
                console.log('Item Added successfully', response.data);
                navigate(0); 
                
            })

        .catch(error=>console.log(error))

    }





    const deleteItem = (id) => {
        axios.delete('http://127.0.0.1:8000/api/',{ data: { id: id }})
        
          .then(response => {
            console.log('Item deleted successfully', response.data);
            navigate(0); 
            
            
            
          })
          .catch(error => {
            console.error('There was an error deleting the item:', error);
          });
      };


    


    
    
    
    
    
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/api/')
        .then(res=>{
            console.log(res.data.completed)
            
            setList(res.data)
            console.log(res)
            setErrors(null);
        })
        
        .catch(err=>{
            if (err.response){
                setErrors('Unable to fetch data');
                console.log(err)
            }
            else{
                setErrors(err.message);
            }
        })

        },[])
    
    
    
    
    
    
    return ( 
          
    <div className="body">
      
        {errors && <div>{errors}</div>}


        <div className={styles.form_container}>


        <form onSubmit={handleSubmit} className={styles.form}>
            <input type="text" className='add_input' required value={task} onChange={(e)=>setTask(e.target.value)} placeholder='Add ToDo'/>
            <label className='list_label'>Status</label>
            <input type="checkbox"   checked={check}  onChange={(e)=>setCheck(e.target.checked)}/>
            <input type="date" className='add_date'  required value={date} onChange={(e)=>setDate(e.target.value)}/>
            <label className='list_label'>Due Date</label>
            <button type="submit" className={styles.add_button}>Add List</button>
        </form>
        </div>
       
       

        
        {list.map((lists)=> (
            <div className={styles.list_container} key={lists.id} >
                <table className={styles.table}>
                    
                    <tr>
                    <td >
                        <p className='list_data'>{lists.task}</p>
                        
                        
                    <div className={styles.button_container}> 
                     <button className="button_edit"><Link className='link'  to={`/update/${lists.id}`}>Edit</Link></button>
                        <button className="button_delete" onClick={()=>deleteItem(lists.id)}>Delete</button>
                        <p className={styles.due_p}>{lists.due_date}</p>
                        <p className={styles.status_ind}>{lists.completed ? 'Completed' : 'Not Completed'}</p>
                        </div>
                        
                        </td>
                        </tr>
                    </table>
            </div> 

                
                    
                   
                    
                
                
               
                
            ))}
            </div>
            
        
       
     );
}
 
export default List;    