import React, { useState } from 'react'
import '../styles/modal.scss'
import { MdOutlineClose } from 'react-icons/md'
import Button from './Button'
import { addTodo } from '../redux/reducers/todoSlice'
import { v4 as uuid } from 'uuid'
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast'

function TodoModal({ modalOpen, setModalOpen }) {
    const [title, setTitle] = useState('')
    const [status, setStatus] = useState('incompleted')
    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault()
        if (title && status) {
            dispatch(addTodo({
                id: uuid(),
                title,
                status,
                time: new Date().toLocaleString()
            }))
            toast.success('Task Added Sucessfully')
            setModalOpen(false)
        } else {
            toast.error("Title shouldn't be empy")
        }
    }
    return (
        modalOpen && ( 
            <div className='wrapper'>
                <div className='container'>
                    <div className='closeButton'
                        onClick={() => setModalOpen(false)}
                        onKeyDown={() => setModalOpen(false)}
                        tabIndex={0}
                        role='button'
                    >
                        <MdOutlineClose />
                    </div>
                    <form className='form' onSubmit={(e) => handleSubmit(e)}>
                        <h1 className='formTitle'>Add Task</h1>
                        <label htmlFor='title'>
                            Title
                            <input type='text'
                                id='title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)} />
                        </label>
                        <label htmlFor='status'>
                            Status
                            <select name='status' id='status' value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="incompleted">Incompleted</option>
                                <option value="completed">Completed</option>
                            </select>
                        </label>
                        <div className='buttonContainer'>
                            <Button type='submit' variant='primary'>Add Task</Button>
                            <Button type='button' variant='secondary' onClick={() => setModalOpen(false)}>Cancel</Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    )
}

export default TodoModal