import React from 'react'
import './Likes.css'
import {FaHeart, FaRegHeart} from "react-icons/fa"
import {db, auth} from '../../Config/firebaseConfig'
import {useAuthState} from 'react-firebase-hooks/auth'
//need some functions from firestore
import {collection, doc, getDocs, addDoc, deleteDoc, query, where} from 'firebase/firestore'



function Likes({articleId}) {

    //get user data
    const [user] = useAuthState(auth);

    // create state for likes
    const [isLiked, setIsLiked] = React.useState(false)

    const [likeCount, setLikeCount] = React.useState(0)

    //when page loads we need to find out if this user has liked this article so we can set isLiked appropriately
    React.useEffect(
        ()=>{
            //did this user like this article?
            const likesRef = collection(db, 'likes')
            //make sure there is a user
            if (user){
                //set up query to find this specific doc
                const q = query(likesRef, where('articleId', '==', articleId),
        where('userId', '==', user?.uid)) 
        // see if there is a match
        getDocs(q, likesRef)
        .then(res =>{
            //match if size is greater than 0
            if (res.size > 0){
                //that means this user likes this article
                setIsLiked(true)
            }
        }) 
        .catch(err => console.log(err))
    }

        //now let's find out the like count
        //make a query to count the likes for this article
        const q2 = query(likesRef, where('articleId', '==', articleId)) 
        getDocs(q2, likesRef)
        .then(res =>{
            console.log(res.size)
            //this is the number of likes
            setLikeCount(res.size)
        })

        .catch(err => console.Console(err))

        }, [isLiked, user]
    )


        const handleLike = () =>{
        // console.log('Like')
        //should only work if user is logged in
        if (user){
            //create ref to likes collection
            const likesRef = collection(db, 'likes')
            //add a document with articleId and userId
            addDoc(likesRef, {
                userId: user?.uid,
                articleId: articleId,
            })
            .then(res =>{
             setIsLiked(true)   
            })
            .catch(err => console.log(err))
        }
    }

    const handleUnlike = () =>{
    //    console.log('unlike')
       //make sure user is logged in
       if (user){
        // console.log('userid', user.uid)
        // console.log('articleId', articleId)
        //find the doc in likes with this userId AND articleId
        const likesRef = collection(db, 'likes')
        //set up a query to find this specific doc
        const q = query(likesRef, where('articleId', '==', articleId),
        where('userId', '==', user?.uid))
        
        //now get the match
        getDocs(q, likesRef)
        .then(res =>{
            console.log(res.size)
            console.log(res.docs[0].id)
            //this is the id of the record to delete
            //now delete this doc from collection
            const likesId = res.docs[0].id
            deleteDoc(doc(db, 'likes', likesId))
            .then(res =>{
                //show as unliked
                setIsLiked(false)
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
       }
    }


    

  return (
    <div>
      {
            isLiked?
            <div className='like-icon'>
                <FaHeart onClick={handleUnlike} />
                <span>{likeCount}</span>
            </div>
            :
            <div className='like-icon'>
            <FaRegHeart onClick={handleLike}/>
            <span>{likeCount}</span>
            </div>
      }
    </div>
  )
}

export default Likes
