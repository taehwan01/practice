// import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  let logo = "ReactBlog";
  let [title, setTitle] = useState(["Man's Outdoor", "Woman's Outdoor", "Children Outdoor"]); //리스트 제목
  let [likes, setLikes] = useState([0, 0, 0]); //리스트 좋아요 수
  let [date, setDate] = useState(["2022.8.20", "2022.8.20", "2022.8.20"]);
  let [modal, setModal] = useState(false); //modal visibility false/true
  let [titleIndex, setIndex] = useState(0); //몇번째 리스트
  let [userInput, setInput] = useState(""); //사용자 입력
  let today = new Date();

  return (
    <div className="App">
      <div className="black-nav">
        <h4>{logo}</h4>
      </div>
      <button
        onClick={() => {
          let copyTitle = [...title];
          copyTitle.sort();
          setTitle(copyTitle);
        }}
      >
        SORT
      </button>
      <button
        onClick={() => {
          let copyTitle = []; //'...title' = 'man's ...' without []
          for (let i = 0; i < title.length; i++) {
            if (i === 0) {
              copyTitle[i] = title[title.length - 1];
            } else {
              copyTitle[i] = title[i - 1];
            }
          }
          setTitle(copyTitle);
        }}
      >
        CHANGE
      </button>
      {title.map(function (a, i) {
        return (
          <div className="list" key={i}>
            <h4
              onClick={() => {
                setModal(true);
                setIndex(i);
              }}
            >
              {title[i]}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  let copyLikes = [...likes];
                  copyLikes[i]++;
                  setLikes(copyLikes);
                }}
              >
                👍
              </span>
              {likes[i]}
            </h4>
            <p>{date[i]}</p>
            <button
              onClick={() => {
                let copyTitle = [...title];
                let copyLikes = [...likes];
                let copyDate = [...date];
                copyTitle.splice(i, 1);
                copyLikes.splice(i, 1);
                copyDate.splice(i, 1);
                setTitle(copyTitle);
                setLikes(copyLikes);
                setDate(copyDate);
              }}
            >
              ERASE
            </button>
          </div>
        );
      })}
      <input
        onChange={(e) => {
          setInput(e.target.value);
        }}
      ></input>
      <button
        onClick={(e) => {
          if (userInput === "") {
            alert("다시.");
          } else {
            let copyTitle = [...title];
            let copyLikes = [...likes];
            let copyDate = [...date];
            copyTitle.unshift(userInput);
            copyLikes.unshift(0);
            copyDate.unshift(today.getFullYear() + "." + today.getMonth() + "." + today.getDate());
            setTitle(copyTitle);
            setLikes(copyLikes);
            setDate(copyDate);
          }
        }}
      >
        ADD
      </button>
      {modal === true ? (
        <Modal color="orange" title={title} titleIndex={titleIndex} setModal={setModal} setTitle={setTitle} />
      ) : null}
    </div>
  );
}

function Modal(props) {
  return (
    <div className="modal" style={{ background: props.color }}>
      <h4>{props.title[props.titleIndex]}</h4>
      <p>Date</p>
      <p>Detail</p>
      <button
        onClick={() => {
          props.setModal(false);
        }}
      >
        CLOSE
      </button>
    </div>
  );
}

export default App;
