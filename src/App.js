import React, { useState, useEffect } from 'react';
import './App.css';
import { auth, db } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Post from './components/Post'
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed';

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
  const [openSignIn, setOpenSignIn] = useState(false)
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
    db.collection('posts')/*.orderBy('timestamp', 'desc')*/.onSnapshot(snapshot => {
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
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((error) => alert(error.message))
  }

  const signIn = (event) => {
    event.preventDefault(); //won't refresh on it's own
    auth.signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message))
    setOpenSignIn(false);
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
      <Modal
        open={openSignIn}
        onClose={()=> setOpenSignIn(false)}
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
            <Button type="submit" onClick={signIn}>Sign In</Button>
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
      {user ? (
        <Button onClick={()=> auth.signOut()}>Logout</Button>
      ) : (
          <div className="app__loginContainer">
            <Button onClick={()=> setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={()=> setOpen(true)}>Sign Up</Button>
          </div>
      )}
      </div>

      <div className="app__posts">
      {
        posts.map(({ id, post }) => {
          return(
            <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
          )
        })
        
        }
        
        <InstagramEmbed
          url='https://www.instagram.com/p/CO1tZi1l0T9/'
          maxWidth={320}
          hideCaption={false}
          containerTagName='div'
          protocol=''
          injectScript
          onLoading={() => {}}
          onSuccess={() => {}}
          onAfterRender={() => {}}
          onFailure={() => {}}
        />

      </div>


      {user?.displayName ? (
        <ImageUpload username={user.displayName }/>
      ) : (
          <h3>Login first to upload</h3>
      )}

    </div>
  );
}

export default App;
