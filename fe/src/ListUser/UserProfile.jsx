import React, { useEffect, useState } from "react";
import { userAPI } from "../services/UserService";
import {getUserProfile} from "../services/UserService"
import { Button, Form, Input, notification } from "antd";
import axios from "axios";
import { response } from "express";

function UserProfiles() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:1000/profile')
        .then(response => response.json())
        .then(json => setPosts(json))
        .then(json => setLoading(false))
    },[])
    
    
    return(
        <div className="posts">
            {loading && <div className="loading"><img className="rotate" src={logo}/><h2>Loading...</h2></div>}
        <div className="grid">
            {posts.map([post =>(
                <div className="box" data-aos='zoom-in' key={post.id}>
                   
                    <h2>User Information</h2>
                    <p><strong>Username:</strong> {post.}</p>
                    <p><strong>Email:</strong> </p>
                    <p><strong>Address:</strong> </p>
      
                </div>
            ))}
        </div>
        
    </div>
    )
}

export default UserProfiles;