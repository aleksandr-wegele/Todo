import React from 'react'
import Modal from './Modal'
import ProjectForm from './ProjectForm'
import firebase from '../firebase'

function AddNewProject(){
    // STATE
    const [showModal, setShowModal] = React.useState(false)
    const [projectName, setProjectName] = React.useState('')

    function handleSubmit(e){
        e.preventDefault()

        if( projectName ){
            const projectsRef = firebase.firestore().collection('projects')

            projectsRef
                .where('name', '==', projectName)
                .get()
                .then( querySnapshot => {
                    if(querySnapshot.empty){
                        projectsRef
                            .add(
                                {
                                    name : projectName
                                }
                            )
                    }else{
                        alert('Проект уже существует!')
                    }
                })
                
            setShowModal(false)
            setProjectName('')
        }
    }

    return (
        <div className='AddNewProject'>
            <div className="add-button">
                <span onClick={() => setShowModal(true)}>
                <svg width='20px' height="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	 viewBox="0 0 455 455">
                <polygon points="455,212.5 242.5,212.5 242.5,0 212.5,0 212.5,212.5 0,212.5 0,242.5 212.5,242.5 212.5,455 242.5,455 242.5,242.5 
                  455,242.5 "/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
                  </svg>

                </span>
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal}>
                <ProjectForm
                    handleSubmit={handleSubmit}
                    heading='Новый проект!'
                    value={projectName}
                    setValue={setProjectName}
                    setShowModal={setShowModal}
                    confirmButtonText='+ Добавить проект'
                />
            </Modal>
        </div>
    )
}

export default AddNewProject