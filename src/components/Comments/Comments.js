import React from 'react'
import './Comments.css'
import {auth, db} from '../../Config/firebaseConfig'
import {useAuthState} from 'react-firebase-hooks/auth'
import {collection, getDocs, query, addDoc, onSnapshot, where, deleteDoc, doc} from 'firebase/firestore'
import {toast} from 'react-toastify'

function Comments({articleId}) {

    //get user data
    const [user] = useAuthState(auth);

    //create state for the new comment
    const [newComment, setNewComment] = React.useState('')

    const [comments, setComments] = React.useState([])
    //show all comments for this article when the page loads
    React.useEffect(
        ()=>{
            //create ref to comments
            const commentsRef = collection(db, 'comments')
            //get the comments
            // getDocs(commentsRef)
            // .then(res =>{
            //     //convert to array
            //     const comments = res.docs.map(item =>(
            //         {
            //             id: item.id,
            //             ...item.data()
            //         }
            //     )) 
            //     //store in state
            //     setComments(comments)
            // })
            // .catch(err =>console.log(err))

            //filter to only get comments for this article
            const q = query(commentsRef, where('articleId', '==', articleId))

            onSnapshot(q, (snapshot)=>{
                //convert to array
                const comments = snapshot.docs.map(item =>(
                    {
                        id: item.id,
                        ...item.data()
                    }
                ))
                    //save to state
                    setComments(comments)
            })

        }, []
    )

    const addNewComment = (e) =>{
        e.preventDefault();
        console.log(newComment);
        // add a new document to comments colleciton
        //collection will be created the first time
        //the data will be articleId, newComment and user info
        //create ref to comments collection
        const commentsRef = collection(db, 'comments')
        //add a document with the data
        addDoc(commentsRef, {
            userId: user?.uid, 
            articleId: articleId, 
            content: newComment,
        username: user?.displayName
    })
    .then(res =>{
        toast('Comment added!', {type:'success', autoClose: 1500})
        //clear the input
        setNewComment('')

    })
    .catch(err => console.log(err))

    }

    const deleteComment = (id) =>{
        //needs the id of the comment to delete
        console.log(id)
        //delete this doc
        deleteDoc(doc(db, 'comments', id))
        .then (res =>{
            toast('Comment deleted!', {type:'warning', autoClose: 1500})
        })
        .catch(err => console.log(err))
    }

  return (

    //need an input for comments
    <div>
        <div className='comments-container'>
          {
            comments.map(item=>
            <div className='comment'
            key={item.id}>
                <p><span>{item.username}</span>{item.content}</p>
                {
                    //each comment has a uid
                    //compare with userId of the comment to see if I can delete
                    user?.uid === item.userId?
                    <button onClick={()=>deleteComment(item.id)}>Delete</button>
                    :
                    null
                }
            </div>
            
            )
          }
        </div>
        {
            user?
            <form onSubmit={addNewComment}>
                <input type='text' placeholder='add comment'
                onChange={e=>setNewComment(e.target.value)} 
                value={newComment}/>
            </form>
            :
            <p>Please log in to make comments.</p>
        }
        
    </div>
  )
}

export default Comments
