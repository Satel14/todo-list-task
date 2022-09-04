import React from 'react'
import '../styles/title.scss'
function PageTitle({ children, ...rest }) {
    return (
        <p className='title'{...rest}>{children}</p>
    )
}

export default PageTitle