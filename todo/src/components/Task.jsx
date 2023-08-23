import React from 'react'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { remove } from '../slices/todoslice';

const Task = ({task, id, handleEdit}) => {
    const tasks = useSelector(state=>state.todo.todo);
    const dispatch = useDispatch();
    return (
        <div className='w-full transition-bg duration-200 p-3 hover:bg-zinc-900 rounded-lg bg-zinc-800 text-xl'>   
            <div className='flex justify-between break-all items-center'>
                <p className=''>{task}</p>
                <div className='flex items-center gap-2'>
                    <AiOutlineEdit onClick={()=>handleEdit(id)} className='cursor-pointer' />
                    <AiOutlineDelete onClick={()=>dispatch(remove(id))} className='cursor-pointer'/>
                </div>
            </div>
        </div>
    )
}

export default Task
