import React, { useState, useEffect } from 'react'
import '../styles/modal.scss'
import { MdOutlineClose } from 'react-icons/md'
import Button from './Button'
import { addTodo, updateTodo } from '../redux/reducers/todoSlice'
import { v4 as uuid } from 'uuid'
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast'

function TodoModal({ type, modalOpen, setModalOpen, todo }) {
    const [title, setTitle] = useState('')
    const [status, setStatus] = useState('incompleted')
    const dispatch = useDispatch()
    useEffect(() => {
        if (type === 'update' && todo) {
            setTitle(todo.title)
            setStatus(todo.status)
        } else {
            setTitle('')
            setStatus('incompleted')
        }
    }, [type, todo, modalOpen])
    const handleSubmit = (e) => {
        e.preventDefault()
        if (title === '') {
            toast.error('Please enter a title')
            return;
        }
        if (title && status) {
            if (type === 'add') {
                dispatch(addTodo({
                    id: uuid(),
                    title,
                    status,
                    time: new Date().toLocaleString()
                }))
                toast.success('Task Added Sucessfully')
            }
            if (type === 'update') {
                if (todo.title !== title || todo.status !== status) {
                    dispatch(updateTodo({ ...todo, title, status }))
                } else {
                    toast.error('No changes found')
                }
            }
            setModalOpen(false)
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
                        <h1 className='formTitle'> {type === 'update' ? 'Update' : 'Add'} Task</h1>
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
                            <Button type='submit' variant='primary'>{type === 'update' ? 'Update' : 'Add'} Task</Button>
                            <Button type='button' variant='secondary' onClick={() => setModalOpen(false)}>Cancel</Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    )
}

export default TodoModal