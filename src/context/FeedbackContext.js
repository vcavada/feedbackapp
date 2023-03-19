import {createContext, useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import FeedbackItem from '../components/FeedbackItem'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
     const [feedback, setFeedback] = useState([
        {
            id:1,
            text:"tst ds",
            rating:10
        }
     ])
     
     const [FeedbackEdit,setFeedbackEdit] = useState({
        item: {},
        edit: false,
     })

     const deleteFeedback = (id) => {
        if(window.confirm('delete?')){
             setFeedback(feedback.filter((item)=>item.id !== id))
        }
    }
    //set item to be updated
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit:  true
        })
    }

    //update item
    const updateFeedback = (id, updItem) => {
        setFeedback(feedback.map((item)=> item.id === id ? {
            item, updItem}: item))
    } 
    //add feedback
    const addFeedBack = (newFeedback) =>{
        newFeedback.id=uuidv4()
        setFeedback([newFeedback,...feedback])
    }
    
    return <FeedbackContext.Provider 
    value ={{
        feedback,
        FeedbackEdit,
        deleteFeedback,
        addFeedBack,
        editFeedback,
        updateFeedback
    }}>

     {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext