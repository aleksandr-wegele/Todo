import React from 'react';
import TodoForm from './TodoForm';
import { TodoContext } from '../context';
import moment from 'moment';
import firebase from '../firebase';

function EditTodo(){
    // STATE
    const [text, setText] = React.useState('');
    const [day, setDay] = React.useState(new Date());
    const [time, setTime] = React.useState(new Date());
    const [todoProject, setTodoProject] = React.useState('');

    // CONTEXT
    const { selectedTodo, projects } = React.useContext(TodoContext)


    function handleSubmit(e){

    }
    return (
        <div>
            {
                selectedTodo &&
                <div className='EditTodo'>
                    <div className="header">
                        Редактировать задачу
                    </div>
                    <div className="container">
                        <TodoForm
                            handleSubmit={handleSubmit}
                            text={text}
                            setText={setText}
                            day={day}
                            setDay={setDay}
                            time={time}
                            setTime={setTime}
                            todoProject={todoProject}
                            setTodoProject={setTodoProject}
                            projects={projects}
                        />
                    </div>
                </div>
            }
        </div>
    )
}

export default EditTodo