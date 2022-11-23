import React from 'react'

function User(){

    return (
        <div className='User'>
            <div className="logo">
                <img src='img/avatar.png' alt="logo" />
            </div>
            <div className='info'>
                <p>My todo</p>
                <a href="/">Выйти!</a>
            </div>
        </div>
    )
}

export default User