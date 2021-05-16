import React, { useState } from 'react';
import './App.css';

//import Components
import Post from './components/Post'

function App() {
  const [posts, setPosts] = useState([
    {
      username: "staytuned96",
        caption: "Wow it works", 
        imageUrl: "/images/reactpic.png"
    },
    {
      username: "staytuned96",
        caption: "Wow it works", 
        imageUrl: "/images/reactpic.png"
    }
  ]);
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
        posts.map(post => {
          <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        })
      }
    </div>
  );
}

export default App;
