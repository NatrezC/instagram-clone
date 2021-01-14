import React from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar'


function Post() {
    return (
        <div className="post">
            {/* header => avatar => & username */}
            <Avatar
                className="post__avatar"
                alt='Nafehwi'
                src="/static/images/avatar/1.jpg"
                />
            <h3>Username</h3>

            {/* image */}
            <img className="post__image" src="/images/reactpic.png" />

            {/* username & caption*/}
            <h4 className="post__text"><strong>staytuned96</strong> What a great day to code</h4>

        </div>
    )
}

export default Post
