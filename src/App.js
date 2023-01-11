import { Button, Card } from "antd";
import React, { useEffect, useState } from "react";
import "./App.css";
import {ArrowLeftOutlined} from "@ant-design/icons"

function App() {
  const [user, setUser] = useState([]);
  const [post, setPost] = useState([]);
  const [comment, setComment] = useState([]);
  const [showScreen1, setShowScreen1] = useState(true);
  const [userTitleData, setUserTitleData] = useState([]);
  
  useEffect(() => {
    const fetchData = () => {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((json) => setUser(json));
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((json) => setPost(json));
    };
    fetchData();
  }, []);

  useEffect(() => {
    const arr = [];
    if (user.length > 0 && post.length > 0) {
      post.map((item, index) => {
        let obj = {};
        user.filter((s, i) => {
          if (s.id === item.userId) {
            obj["username"] = s.username;
            obj["title"] = item.title;
            obj["postId"] = item.id;
          }
        });
        arr.push(obj);
      });
      setUserTitleData(arr);
    }
  }, [user, post]);

  const callCommentEvent = (e, item) => {
    setComment([]);
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${item.postId}`)
      .then((response) => response.json())
      .then((json) => setComment(json));
    setShowScreen1(false);
  };

  return (
    <div>
      {showScreen1 ? (
        <>
        <h2>NAME & TITLE</h2>
          {userTitleData
            ? userTitleData.map((item, index) => {
                return (
                  <Card title={item.username} hoverable={true} style={{margin:30 ,backgroundColor:"skyblue"}} onClick={(e) => callCommentEvent(e, item)}>
                    <div>{item.title}</div>
                  </Card>
                );
              })
            : "No data"}
        </>
      ) : (
        <div>
          <Button onClick={() => setShowScreen1(true)}><ArrowLeftOutlined />Back</Button>
          <h2>COMMENTS</h2>
          <>
            {comment
              ? comment.map((data, i) => {
                  return (
                    <Card title={data.name} style={{margin:30 ,backgroundColor:"skyblue"}}>
                      <div>{data.body}</div>
                    </Card>
                  );
                })
              : "Loading......."}
          </>
        </div>
      )}
    </div>
  );
}

export default App;
