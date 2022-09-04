import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { MdDelete, MdEdit } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { deleteTodo, updateTodo } from '../redux/reducers/todoSlice'
import '../styles/todoitem.scss'
import { getClasses } from '../utils/getClasses'
import CheckButton from './CheckButton'

import TodoModal from './TodoModal'
function TodoItem({ todo }) {
    const dispatch = useDispatch()
    const [checked, setChecked] = useState(false)
    const [updateModalOpen, setUpdateModalOpen] = useState(false)

    useEffect(() => {
        if (todo.status === 'complete') {
            setChecked(true)
        } else {
            setChecked(false)
        }
    }, [todo.status])

    const handleCheck = () => {
        setChecked(!checked);
        dispatch(
            updateTodo({ ...todo, status: checked ? 'incomplete' : 'complete' })
        );
    };

    const handleDelete = () => {
        dispatch(deleteTodo(todo.id))
        toast.success('Todo Deleted Sucessfully')
    }
    const handleUpdate = () => {
        setUpdateModalOpen(true)
    }


    return (
        <>
            <div className='item'>
                <div className='todoDetails'>
                    <CheckButton checked={checked} handleCheck={handleCheck} />
                    <div className='texts'>
                        <p className={getClasses([
                            'todoText',
                            todo.status === 'complete' && 
                            ['todoText--completed'],
                        ])}
                        >
                            Title: {todo.title}
                        </p>
                        <p className='texts'>Description: {todo.desc}</p>
                        <p className='time'>Time: {todo.time}</p>
                    </div>
                </div>
                <div className='todoActions'>
                    <div className='icon' onClick={handleDelete}>
                        <MdDelete />
                    </div>
                    <div className='icon' onClick={handleUpdate}>
                        <MdEdit />
                    </div>
                </div>
            </div>
            <TodoModal todo={todo} type='update' modalOpen={updateModalOpen} setModalOpen={setUpdateModalOpen} />
        </>
    )
}

export default TodoItem