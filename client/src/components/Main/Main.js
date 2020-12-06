import React, { useEffect, useRef } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./Main.css";
function Main({ location }) {
  const ENDPOINT = "https://liveboard-backend.herokuapp.com/";
  //const ENDPOINT = "http://localhost:5000";
  const canvasRef = useRef(null);
  const colorsRef = useRef(null);
  const socketRef = useRef();
  //useRef is used to get the values of the dom element
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socketRef.current = io.connect(ENDPOINT);
    socketRef.current.emit("join", { name, room }, (error) => {
      if (error) {
        //alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    const canvas = canvasRef.current; // getting the data of the canvas
    //const test = colorsRef.current; // getting colors values
    const context = canvas.getContext("2d"); // geting 2d of the canvas

    const colors = document.getElementsByClassName("color"); //all colors

    const current = {
      color: "black",
    }; // default black

    // helper that will update the current color
    const onColorUpdate = (e) => {
      current.color = e.target.className.split(" ")[1];
    };

    // loop through the color elements and add the click event listeners

    for (let i = 0; i < colors.length; i++) {
      colors[i].addEventListener("click", onColorUpdate, false);
    }
    let drawing = false;

    //drawing the line
    const drawLine = (x0, y0, x1, y1, color, emit) => {
      context.beginPath();
      context.moveTo(x0, y0);
      context.lineTo(x1, y1);
      context.strokeStyle = color;
      context.lineWidth = 3;
      context.stroke();
      context.closePath();

      if (!emit) {
        return;
      }

      const w = canvas.width;
      const h = canvas.height;

      socketRef.current.emit("drawing", {
        x0: x0 / w,
        y0: y0 / h,
        x1: x1 / w,
        y1: y1 / h,
        color,
      });
    };
    // geeting mouse and touch actions
    const onMouseDown = (e) => {
      drawing = true;
      current.x = e.clientX || e.touches[0].clientX; //Set Starting X
      current.y = e.clientY || e.touches[0].clientY; //Set Starting Y
    };

    const onMouseMove = (e) => {
      if (!drawing) {
        return;
      }
      drawLine(
        current.x, //Starting X
        current.y, //Starting Y
        e.clientX || e.touches[0].clientX, //Current X
        e.clientY || e.touches[0].clientY, //Current Y
        current.color, //Color Chosen
        true
      );
      current.x = e.clientX || e.touches[0].clientX;
      current.y = e.clientY || e.touches[0].clientY;
    };

    const onMouseUp = (e) => {
      if (!drawing) {
        return;
      }

      drawing = false;
      drawLine(
        current.x,
        current.y,
        e.clientX || e.touches[0].clientX,
        e.clientY || e.touches[0].clientY,
        current.color,
        true
      );
    };

    //To throttle the number of event calls..

    const throttle = (callback, delay) => {
      let previousCall = new Date().getTime();
      return function () {
        const time = new Date().getTime();

        if (time - previousCall >= delay) {
          previousCall = time;
          callback.apply(null, arguments);
        }
      };
    };

    canvas.addEventListener("mousedown", onMouseDown, false);
    canvas.addEventListener("mouseup", onMouseUp, false);
    canvas.addEventListener("mouseout", onMouseUp, false);
    canvas.addEventListener("mousemove", throttle(onMouseMove, 10), false);

    //for mobile
    canvas.addEventListener("touchstart", onMouseDown, false);
    // canvas.addEventListener("touchend", onMouseUp, false);
    canvas.addEventListener("touchcancel", onMouseUp, false);
    canvas.addEventListener("touchmove", throttle(onMouseMove, 10), false);

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", onResize, false);
    onResize();

    // socket.io
    const onDrawingEvent = (data) => {
      const w = canvas.width;
      const h = canvas.height;
      drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
    };

    socketRef.current.on("drawing", onDrawingEvent);
  }, []);
  const clearScreen = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  };
  return (
    <div>
      <canvas ref={canvasRef} className="canvas" />
      <div ref={colorsRef} className="colors">
        <div className="color black" />
        <div className="color red" />
        <div className="color green" />
        <div className="color blue" />
        <div className="color yellow" />
      </div>

      <div className="clear">
        <button onClick={() => clearScreen()}>Clear</button>
      </div>
    </div>
  );
}

export default Main;
