import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { MdDelete, MdEdit } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { deleteTodo } from '../redux/reducers/todoSlice'
import style from '../styles/todoitem.scss'
import { getClasses } from '../utils/getClasses'
import TodoModal from './TodoModal'
function TodoItem({ todo }) {
    const dispatch = useDispatch()
    const [updateModalOpen, setUpdateModalOpen] = useState(false)
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
                    [ ]
                    <div className='texts'>
                        <p className={getClasses([
                            style.todoText,
                            todo.status === 'complete' && style
                            ['todoText--completed'],
                        ])}
                        >
                            {todo.title}
                        </p>
                        <p className='time'>{todo.time}</p>
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
            <TodoModal todo={todo} type='update' modalOpen={updateModalOpen} setModalOpen={setUpdateModalOpen}/>
        </>
    )
}

export default TodoItem