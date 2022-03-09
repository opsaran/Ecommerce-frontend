import React, { useEffect, useReducer, useRef, useState } from "react";
import axios from "axios";

export interface PostsInterface {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default function Test() {
  const [posts, setPosts] = useState<PostsInterface[]>([]);
  useEffect(() => {
    async function fetchDetails() {
      const postResult = await axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((result) => result.data);
      setPosts(postResult);
    }
    fetchDetails();
  }, []);

  return (
    <div>
      <h2>Okay</h2>
      {posts.map((post) => {
        return (
          <div key={post.id}>
            <div>Titile:{post.title}</div>
            <div>Body: {post.body}</div>
            <br />
          </div>
        );
      })}
      {JSON.stringify(posts)}
    </div>
  );
}
