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
    const [desc, setDesc] = useState('')
    const [status, setStatus] = useState('incomplete')
    const dispatch = useDispatch()

    useEffect(() => {
        if (type === 'update' && todo) {
            setTitle(todo.title)
            setStatus(todo.status)
            setDesc(todo.desc)
        } else {
            setTitle('')
            setStatus('incomplete')
            setDesc('')
        }
    }, [type, todo, modalOpen])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (title === '' || desc === '') {
            toast.error('Please enter a title and description')
            return;
        }
        if (title && status) {
            if (type === 'add') {
                dispatch(addTodo({
                    id: uuid(),
                    title,
                    status,
                    desc,
                    time: new Date().toLocaleString()
                }))
                toast.success('Task Added Sucessfully')
            }
            if (type === 'update') {
                if (todo.title !== title || todo.status !== status || todo.desc !== desc) {
                    dispatch(updateTodo({ ...todo, title, status, desc }))
                } else {
                    toast.error('No changes found')
                    return
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
                        <label htmlFor='desc'>
                            Description
                            <input type='text'
                                id='desc'
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)} />
                        </label>
                        <label htmlFor='status'>
                            Status
                            <select name='status' id='status' value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="incomplete">Incomplete</option>
                                <option value="complete">Complete</option>
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