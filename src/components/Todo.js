import React from 'react'
import moment from 'moment'
import { TodoContext } from '../context'
import firebase from '../firebase'

function Todo({todo}){
    // STATE
    const [hover, setHover] = React.useState(false)

    // CONTEXT
    const { selectedTodo, setSelectedTodo} = React.useContext(TodoContext)

    const handleDelete = todo => {
        deleteTodo(todo)

        if(selectedTodo === todo){
            setSelectedTodo(undefined)
        }
    }

    const deleteTodo = todo => {
        firebase
            .firestore()
            .collection('todos')
            .doc(todo.id)
            .delete()
    }

    const checkTodo = todo => {
        firebase
            .firestore()
            .collection('todos')
            .doc(todo.id)
            .update({
                checked : !todo.checked
            })
    }

    const repeatNextDay = todo => {
        const nextDayDate = moment(todo.date, 'MM/DD/YYYY').add(1, 'days')

        const repeatedTodo = {
            ...todo,
            checked : false,
            date : nextDayDate.format('MM/DD/YYYY'),
            day : nextDayDate.format('d')
        }

        delete repeatedTodo.id

        firebase
            .firestore()
            .collection('todos')
            .add(repeatedTodo)
    }

    return (
        <div className='Todo'>
            <div
                className="todo-container"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <div
                    className="check-todo"
                    onClick={ () => checkTodo(todo)}
                >
                    {
                        todo.checked ?
                        <span className="checked">
                            <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M14.72,8.79l-4.29,4.3L8.78,11.44a1,1,0,1,0-1.41,1.41l2.35,2.36a1,1,0,0,0,.71.29,1,1,0,0,0,.7-.29l5-5a1,1,0,0,0,0-1.42A1,1,0,0,0,14.72,8.79ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" fill='#808080'/></svg>
                        </span>
                        :
                        <span className="unchecked">
                            <svg width="21px" height="21px" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg"><circle cx="10.5" cy="10.5" fill="none" r="8" stroke="#808080" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </span>
                    }
                </div>
                <div
                    className="text"
                    onClick={ () => setSelectedTodo(todo)}
                >
                    <p style={{color : todo.checked ? '#bebebe' : '#000000'}}>{todo.text}</p>
                    <span>{todo.time} - {todo.projectName}</span>
                    <div className={`line ${todo.checked ? 'line-through' : ''}`}></div>
                </div>
                <div
                    className="add-to-next-day"
                    onClick={() => repeatNextDay(todo)}    
                >
                    {
                        todo.checked &&
                        <span>
                            <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <g id="🔍-System-Icons" stroke="#808080" stroke-width="1" fill="#808080" fill-rule="#808080">
                            <g id="ic_fluent_arrow_clockwise_24_filled" fill="#212121" fill-rule="nonzero">
                            <path d="M19.3256388,3.99316659 L19.3256388,7.43711872 C19.3256388,7.97509751 18.8895208,8.41121548 18.3515421,8.41121548 L14.9075899,8.41121548 C14.3696111,8.41121548 13.9334932,7.97509751 13.9334932,7.43711872 C13.9334932,6.89913993 14.3696111,6.46302196 14.9075899,6.46302196 L15.7082249,6.46201556 C13.0893599,4.89552831 9.64593272,5.24025899 7.38998411,7.4962076 C4.72712497,10.1590667 4.72712497,14.4764144 7.38998411,17.1392736 C10.0528433,19.8021327 14.3701909,19.8021327 17.0330501,17.1392736 C18.653762,15.5185616 19.3321961,13.2302945 18.9064884,11.0206756 C18.8047125,10.4924117 19.1504494,9.9816634 19.6787133,9.87988745 C20.2069773,9.7781115 20.7177256,10.1238484 20.8195015,10.6521123 C21.3662554,13.4900166 20.4933812,16.4341042 18.4106309,18.5168544 C14.9869549,21.9405305 9.43607929,21.9405305 6.01240326,18.5168544 C2.58872723,15.0931784 2.58872723,9.54230278 6.01240326,6.11862674 C9.10976938,3.02126062 13.9481725,2.72605125 17.3774144,5.23299861 L17.3774453,3.99316659 C17.3774453,3.4551878 17.8135633,3.01906983 18.3515421,3.01906983 C18.8895208,3.01906983 19.3256388,3.4551878 19.3256388,3.99316659 Z"></path>
                                    </g>
                                </g>
                            </svg>
                        </span>
                    }
                </div>
                <div
                    className="delete-todo"
                    onClick={ () => handleDelete(todo)}
                >
                    {
                        (hover || todo.checked) &&
                        <span>
                           <svg width='20px' height='20px' version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	                        viewBox="0 0 457.503 457.503">
                                <g><g><path d="M381.575,57.067h-90.231C288.404,25.111,261.461,0,228.752,0C196.043,0,169.1,25.111,166.16,57.067H75.929
                                c-26.667,0-48.362,21.695-48.362,48.362c0,26.018,20.655,47.292,46.427,48.313v246.694c0,31.467,25.6,57.067,57.067,57.067
                                h195.381c31.467,0,57.067-25.6,57.067-57.067V153.741c25.772-1.02,46.427-22.294,46.427-48.313
                                C429.936,78.761,408.242,57.067,381.575,57.067z M165.841,376.817c0,8.013-6.496,14.509-14.508,14.509
                                c-8.013,0-14.508-6.496-14.508-14.509V186.113c0-8.013,6.496-14.508,14.508-14.508c8.013,0,14.508,6.496,14.508,14.508V376.817z
                                M243.26,376.817c0,8.013-6.496,14.509-14.508,14.509c-8.013,0-14.508-6.496-14.508-14.509V186.113
                                c0-8.013,6.496-14.508,14.508-14.508c8.013,0,14.508,6.496,14.508,14.508V376.817z M320.679,376.817
                                c0,8.013-6.496,14.509-14.508,14.509c-8.013,0-14.509-6.496-14.509-14.509V186.113c0-8.013,6.496-14.508,14.509-14.508
                                s14.508,6.496,14.508,14.508V376.817z" fill='#808080'/>
                            </g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
                        </svg>
                        </span>
                    }
                </div>
            </div>
        </div>
    )
}

export default Todo