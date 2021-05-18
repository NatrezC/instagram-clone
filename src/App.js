import React, { useState, useEffect } from 'react';
import './App.css';
import { auth, db } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Post from './components/Post'
import { Button, Input } from '@material-ui/core';

//styling for Modal
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function App() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has logged in
        console.log(authUser);
        setUser(authUser);

        if (authUser.displayName) {
          //don't update username

        } else {
          //if we just created someone
          return authUser.updateProfile({
            displayName: username,
          });
        }
      } else {
        //user has logged out
        setUser(null)
      }
    })

    return () => {
      //perform some cleanup action
      unsubscribe();
    }
  }, [user, username]);


  //useEffect -> Runs a piece of code based on a specific condition
  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      //every time a new post is added, this code runs
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id, //for docs be  single id
        post: doc.data() //docs data
      })));
    })
  }, []) //bracket means run this code once when page refresh..ONLY ONCE WITH THIS BRACKET
  const signUp = (event) => {
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
      .then()
      .catch((error) => alert(error.message))
  }

  return (
    <div className="app">
      <Modal
        open={open}
        onClose={()=> setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">

          <center>
            <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
            />
          </center>
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e)=> setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signUp}>Sign Up</Button>
          </form>
          
        </div>
      </Modal>
      {/*Header*/}
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
          />
      </div>
      <Button onClick={()=> setOpen(true)}>Sign Up</Button>

      <h1>Hello Clever Programmers</h1>

      {
        posts.map(({ id, post }) => {
          return(
            <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
          )
        })
        
      }

      
      {/*Post */}
      {/*Post */}
    </div>
  );
}

export default App;
