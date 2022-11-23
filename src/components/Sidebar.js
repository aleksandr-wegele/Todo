import React from 'react'
import { TodoContext } from '../context'

function Sidebar({ children }){
    // CONTEXT
    const { setSelectedTodo } = React.useContext(TodoContext)

    // REF
    const sidebarRef = React.useRef()

    React.useEffect(() => {
        document.addEventListener('click', handleClick)

        return () => document.removeEventListener('click', handleClick)
    })

    const handleClick = e => {
        if(e.target === sidebarRef.current || sidebarRef.current.contains(e.target)){
            setSelectedTodo(undefined)
        }
    }

    return (
        <div
            className='Sidebar'
            ref={sidebarRef}
        >
            {children}
        </div>
    )
}

export default Sidebar