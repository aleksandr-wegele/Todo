import React from 'react'
import moment from 'moment'
import firebase from '../firebase'

export function useTodos(){
    const [todos, setTodos] = React.useState([])

    React.useEffect(() => {
        let unsubscribe = firebase
        .firestore()
        .collection('todos')
        .onSnapshot( snapshot => {
            const data = snapshot.docs.map( doc => {
                return {
                    id : doc.id,
                    ...doc.data()
                }
            })
            setTodos(data)
        })

        return () => unsubscribe()
    }, [])

    return todos
}

export function useFilterTodos(todos, selectedProject){
    const [filteredTodos, setFilteredTodos] = React.useState([])

    React.useEffect( () => {
        let data;
        const todayDateFormated = moment().format('MM/DD/YYYY')

        if(selectedProject === 'Сегодня'){
            data = todos.filter(todo => todo.date === todayDateFormated)
        }else if(selectedProject === 'Следующие 7 дней'){
            data = todos.filter(todo => {
                const todoDate = moment(todo.date, 'MM/DD/YYYY')
                const todayDate = moment(todayDateFormated, 'MM/DD/YYYY')

                const diffDays = todoDate.diff(todayDate, 'days')

                return diffDays >=0 && diffDays < 7
            })
        }else if( selectedProject === 'Все дни'){
            data = todos
        }else{
            data = todos.filter(todo => todo.projectName === selectedProject)
        }

        setFilteredTodos(data)
    }, [todos, selectedProject])

    return filteredTodos
}

export function useProjects(){
    const [projects, setProjects] = React.useState([])

    React.useEffect(() => {
        let unsubscribe = firebase
        .firestore()
        .collection('projects')
        .onSnapshot( snapshot => {
            const data = snapshot.docs.map( doc => {
                return {
                    id : doc.id,
                    name : doc.data().name
                }
            })
            setProjects(data)
        })

        return () => unsubscribe()
    }, [])

    return projects
}

export function useProjectsWithStats(projects, todos){
    const [projectsWithStats, setProjectsWithStats] = React.useState([])

    React.useEffect(() => {
        const data = projects.map((project) => {
            return {
                numOfTodos : todos.filter( todo => todo.projectName === project.name && !todo.checked).length,
                ...project
            }
        })

        setProjectsWithStats(data)
    }, [projects, todos])

    return projectsWithStats
}