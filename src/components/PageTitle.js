import React from 'react'
import '../styles/title.scss'
function PageTitle({ children, ...rest }) {
    return (
        <p className='title'>{children}</p>
    )
}

export default PageTitle