import React, { useState } from "react";
import { Link } from "react-router-dom";
import GithubBtn from "../Github/GithubBtn";
import "./Join.css";
function Join() {
  const [name, setName] = useState();
  const [room, setRoom] = useState();

  return (
    <div className="joinOuterContainer">
      <GithubBtn />
      <div className="joinInnerContainer">
        <div className="heading">Create/Join</div>
        <form className="joinForm mt-20">
          <input
            type="text"
            name="name"
            id="name"
            className="joinInput "
            placeholder="Enter creative name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="text"
            name="room"
            id="lobby"
            className="joinInput mt-20"
            placeholder="Enter room id"
            value={room}
            onChange={(e) => {
              setRoom(e.target.value);
            }}
          />
          <Link
            onClick={(e) => (!name || !room ? e.preventDefault() : null)}
            to={`/draw?name=${name}&room=${room}`}
          >
            <button className={"button mt-20"} type="submit">
              Create/Join
            </button>
          </Link>
        </form>
      </div>
      <div className="joinInnerContainer" id="orDivider">
        OR
      </div>
      <div className="joinInnerContainer">
        <div className="heading">Join Global</div>
        <form className="joinForm mt-20">
          <input
            type="text"
            name="name"
            className="joinInput"
            placeholder="Enter creative name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Link
            onClick={(e) => (!name ? e.preventDefault() : null)}
            to={`/draw?name=${name}&room=global`}
          >
            <button className={"button mt-20"} type="submit">
              Join
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Join;
