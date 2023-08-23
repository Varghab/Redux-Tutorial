import './App.css';
import {AiOutlineEdit, AiOutlinePlus} from 'react-icons/ai'
import Task from './components/Task';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { add, edit, clear, localInit } from './slices/todoslice'

function App() {
  const [current, setCurrent] = useState('');
  const [editMode, setEditMode] = useState({editMode:false});
  const tasks = useSelector(state => state.todo.todo);
  const dispatch = useDispatch();
  const handleEdit = (id) =>{
    const task = tasks.find((e)=>e.id===id);
    setCurrent(task.todo);
    setEditMode({editMode:true, id:id})
  }

  const onEdit = (current) =>{
    dispatch(edit({todo:current, id:editMode.id}));
    setEditMode({editMode:false});
    setCurrent("");
  }

  const addHandler = (current) =>{
    dispatch(add(current))
  }

  useEffect(()=>{
    dispatch(localInit());
  },[])

  return (
    <div className="flex justify-center items-center h-screen w-full bg-zinc-900 text-neutral-200">
      <div className="max-w-full w-96 bg-zinc-950 p-4 rounded-xl shadow-2xl shadow-purple-800 ">
        <section className=" max-h-[500px] relative overflow-auto" >
          <div>
            <h1 className="text-2xl font-bold" >Todo App</h1>
            <div className="mt-4 flex w-full items-center gap-2" >
              <input onChange={(e)=>setCurrent(e.target.value)} value={current} className="p-2 text-black text-lg outline-none rounded-lg w-full" placeholder="Add your tasks"></input>
              {editMode.editMode? <AiOutlineEdit onClick={()=>onEdit(current)} className='rounded-full text-2xl cursor-pointer' /> :<AiOutlinePlus onClick={()=>{current.length>0&&addHandler(current);setCurrent('')}} className='rounded-full text-2xl cursor-pointer' />}
            </div>
          </div>
          <div className='mt-4'>
            <h2 className='text-xl '>All Tasks</h2>
            <hr className='mt-2 border-neutral-400'></hr>
          </div>
          {/* All task here */}
          <div className='flex flex-col mt-4 gap-2 min-h-[200px]'>
            {tasks.length>0?tasks.map((task)=><Task id={task.id} handleEdit={handleEdit} key={task.id} task={task.todo} />):<p className='text-neutral-500'>No tasks to show!</p>}        
          </div>
          <div className='w-full pt-4'>
            <button onClick={()=>dispatch(clear())} className='px-4 py-2 bg-zinc-800 hover:bg-zinc-900 cursor-pointer rounded-full'>
              Clear All
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
