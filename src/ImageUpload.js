import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { storage, db } from './firebase';

function ImageUpload({ username }) {
    const [caption, setCaption] = useState('');
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState(null)

    const handleChange = (e) => {
        if (e.target.files[0]) { //get the first file you selected
            setImage(e.target.files[0]); //set Image to what you selected
        }
    }

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        
        uploadTask.on(
            'state_changed', (snapshot) => {
                //progress function...
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100 //progress bar that gives you how long from 0 to 100
                );
                setProgress(progress);
        },
            (error) => {
                //Error function...
                console.log(error);
            }, 
            () => {
                //complete function...
                storage
                    .ref('images')
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        // post image inside db
                        db.collection('posts').add({
                            //timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: url,
                            username: username
                        });
                        setProgress(0);
                        setCaption('');
                        setImage(null);

                    });
            }
        )
    }

    return (
        <div>
            {/* I want to have... */}
            {/* Caption Input */}
            {/* File picker */}
            {/* Post button */}
            <progress value={progress} max="100"/>
            <input type="text" placeholder="Enter a caption" onChange={event => setCaption(event.target.value)} value={caption}/>
            <input type="file" onChange={handleChange} />
            <Button className="imageUpload__button" onClick={handleUpload}>Upload</Button>
        </div>
    )
}

export default ImageUpload
