import {createContext, useState, useEffect} from 'react'

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
        const res = await fetch("/feedback?_sort=id&_order=desc")
        const data = await res.json()

        setFeedback(data)
        setIsLoading(false)
     }

     const deleteFeedback = async (id) => {
        if(window.confirm('delete?')){
            await fetch(`/feedback/${id}`, { method: 'DELETE' })

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
    const updateFeedback = async(id, updItem) => {
        const response = await fetch(`/feedback/${id}`,{
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updItem)
        })

        const data = await response.json()
        setFeedback(feedback.map((item)=> item.id === id ? {...item, ...data}: item))
    } 
    // Add feedback
  const addFeedBack = async (newFeedback) => {
    const response = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFeedback),
    })

    const data = await response.json()

    setFeedback([data, ...feedback])
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