import './App.css';

//import Components
import Post from './components/Post'

function App() {
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

      <Post username ="staytuned96"  caption="Wow it works" imageUrl="/images/reactpic.png"/>
      <Post username ="ajeatslocal"  caption="You are getting good at this" imageUrl="/images/reactpic.png"/>
      <Post />
      <Post />
      {/*Post */}
      {/*Post */}
    </div>
  );
}

export default App;
