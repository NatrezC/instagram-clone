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
          <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl}
        })
      }

      <Post username ="staytuned96"  caption="Wow it works" imageUrl="/images/reactpic.png"/>
      <Post username ="ajeatslocal"  caption="You are getting good at this" imageUrl="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/20190503-delish-pineapple-baked-salmon-horizontal-ehg-450-1557771120.jpg?crop=0.669xw:1.00xh;0.173xw,0&resize=640:*"/>
      <Post />
      <Post />
      {/*Post */}
      {/*Post */}
    </div>
  );
}

export default App;
