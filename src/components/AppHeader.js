import React, { useState } from 'react'
import Button, { SelectButton } from './Button'
import '../styles/app.scss'
import TodoModal from './TodoModal'

function AppHeader() {
    const [modalOpen, setModalOpen] = useState(false)
    return (
        <div className='appHeader'>
            <Button variant='primary'
                onClick={() => setModalOpen(true)}
            >
                Add Task
            </Button>
            <SelectButton id='status'>
                <option value='All'>ALL</option>
                <option value='incompleted'>Incompleted</option>
                <option value='completed'>Completed</option>
            </SelectButton>
            <TodoModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </div>
    )
}

export default AppHeader