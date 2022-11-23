import React from 'react'
import { useTodos, useProjects, useFilterTodos, useProjectsWithStats } from '../hooks'

const TodoContext = React.createContext()

function TodoContextProvider({children}){
    const defaultProject = 'Сегодня'
    const [selectedProject, setSelectedProject] = React.useState(defaultProject)
    const [selectedTodo, setSelectedTodo] = React.useState(undefined)

    const todos = useTodos()
    const projects = useProjects()
    const projectsWithStats = useProjectsWithStats(projects, todos)
    const filteredTodos = useFilterTodos(todos, selectedProject)

    return (
        <TodoContext.Provider
            value={
                {
                    defaultProject,
                    selectedProject,
                    setSelectedProject,
                    todos : filteredTodos,
                    projects : projectsWithStats,
                    selectedTodo,
                    setSelectedTodo
                }
            }
        >
            {children}
        </TodoContext.Provider>
    )
}

export { TodoContextProvider, TodoContext }