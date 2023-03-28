import React from 'react'
import "./Banner.css"
import {db} from '../../Config/firebaseConfig'
//need some functions from firestore
import {collection, getDocs, query, orderBy, limit} from 'firebase/firestore'
//import { FaRegArrowAltCircleLeft } from 'react-icons/fa'
import {Link} from 'react-router-dom'

//this component will show the 5 most recent articles
function Banner() {

    //create state
    const [mainArticle, setMainArticle] = React.useState('')
    const [otherArticles, setOtherArticles] = React.useState([])
    //get data when the page loads
    React.useEffect(
        ()=>{
            //make a reference to articles collection
            const articleRef = collection(db, 'articles')

            //set up query to filter the data
            const q = query(articleRef, orderBy("createdAt", "desc"),limit(5))
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
                //console.log(articles)
                //store in state
                setMainArticle(articles[0])
                //put the rest in the otherArticles
                setOtherArticles(articles.splice(1))
            })
            .catch(err => console.log(err))


        }, []
    )
  return (
    <div className="banner-container">
        <Link to={`/article/${mainArticle?.id}`} 
        className="main-article-container"
            style={{backgroundImage:`url(${mainArticle?.imageUrl})`}}>
            <div className="banner-info">
                <h2>{mainArticle?.title}</h2>
                <p>{mainArticle?.createdAt?.toDate().toDateString()}</p>
            </div>

        </Link>
        <div className="other-articles-container">
            {
                otherArticles.map(item =>(
                    <Link to={`/article/${item?.id}`}
                    className="other-article-item" 
                         key={item?.id} style={{backgroundImage:`url(${item?.imageUrl})`}}>
                        <div className="banner-info">
                            <h3>{item?.title}</h3>
                            <small>{item?.createdAt?.toDate().toDateString()}</small>
                        </div>
                    </Link>
                ))
            }

        </div>

    </div>
  )
}

export default Banner