import {createContext, useState, useEffect} from 'react'
import {v4 as uuidv4} from 'uuid'
import FeedbackItem from '../components/FeedbackItem'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [isLoading,setIsLoading] = useState(true)
     const [feedback, setFeedback] = useState([])     
     const [feedbackEdit,setFeedbackEdit] = useState({
        item: {},
        edit: false,
     })

     useEffect(()=>{
        fetchFeedback()
     },[])

     const fetchFeedback = async () => {
        const res = await fetch("http://localhost:3001/feedback?_sort=id&_order=desc")
        const data = await res.json()

        setFeedback(data)
        isLoading(false)
     }

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
        setFeedback(feedback.map((item)=> item.id === id ? {...item, ...updItem}: item))
    } 
    //add feedback
    const addFeedBack = (newFeedback) =>{
        newFeedback.id=uuidv4()
        setFeedback([newFeedback,...feedback])
    }
    
    return <FeedbackContext.Provider 
    value ={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedBack,
        editFeedback,
        updateFeedback
    }}>

     {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext