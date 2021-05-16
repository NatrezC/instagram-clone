import React, { useState, useEffect } from 'react';
import './App.css';
import { db } from './firebase';


//import Components
import Post from './components/Post'

function App() {
  const [posts, setPosts] = useState([]);

  //useEffect -> Runs a piece of code based on a specific condition
  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      //every time a new post is added, this code runs
      setPosts(snapshot.docs.map(doc => doc.data()))
    })
  }, []) //bracket means run this code once when page refresh..ONLY ONCE WITH THIS BRACKET

  return (
    <div className="app">
      {/*Header*/}
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
          />
      </div>

      <h1>Hello Clever Programmers</h1>

      {
        posts.map((post) => {
          return(
            <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
          )
        })
        
      }

      
      {/*Post */}
      {/*Post */}
    </div>
  );
}

export default App;
