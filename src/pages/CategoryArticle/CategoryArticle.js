import React from 'react'
import {useParams} from 'react-router-dom'
import { db } from '../../Config/firebaseConfig';
//need some functions from firestore
import {collection, getDocs, query, where} from 'firebase/firestore'

function CategoryArticle() {
    //grab the parameter in the url
    const {categoryName} = useParams();
    //when page loads show only articles of this category
    
    //create state to hold articles
    const [articles, setArticles] = React.useState([])
    
    React.useEffect(
        ()=>{
            //make a reference to articles collection
            const articleRef = collection(db, 'articles')

            //set up query to filter the data
            //want data where category == categoryName
            const q = query(articleRef, where("category", "==", categoryName))
            //retrieve documents from this collection
            //getDocs(articleRef)
            getDocs(q,articleRef)
            .then(res =>{
                //console.log(res.docs[0].data())
                //this is needed to add the id
                //and create an array that you can use for state
                const articles = res.docs.map(item =>(
                    {
                        id: item.id,
                        ...item.data()
                    }
                ))
                console.log(articles)
                //store in state
                setArticles(articles)
                
            })
            .catch(err => console.log(err))

        }, [categoryName]
    )
  return (
    <div className="category-articles">
        {
            articles.length === 0?
            <p>No {categoryName} articles</p>
            :
            articles?.map(item=>(<p key={item.id}>
                {item?.title}
                </p>))

        }
        

    </div>
  )
}

export default CategoryArticle
