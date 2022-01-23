import { useToolSettings } from 'hooks/context/useToolsSettings';
import React, { useEffect, useRef, MutableRefObject } from 'react';
import io, { Socket } from 'socket.io-client';

import styles from './Canvas.module.scss';

interface SocketPayload {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  color: string;
  name: string;
  emit?: boolean;
  stroke: number;
}

interface CanvasProps {
  name: string;
  room: string;
}

const Canvas = ({ name, room }: CanvasProps) => {
  const ENDPOINT = 'http://localhost:5000';
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let socketRef = useRef<any>();
  const { color, stroke } = useToolSettings();

  const handleErrors = (msg: string) => {
    console.log(msg);
  };
  console.log(socketRef.current);
  //useRef is used to get the values of the dom element
  useEffect(() => {
    socketRef.current = io(ENDPOINT, { transports: ['websocket'] }) as Socket;
    console.log(socketRef.current);

    socketRef.current.on('connect_error', (err: any) => {
      console.log(`connect_error due to ${err}`);
    });

    socketRef.current.emit('join', { name, room }, (error: Error) => {
      if (error)
        handleErrors('We are facing technical difficulties try again later');
    });
  }, [ENDPOINT, name, room]);

  useEffect(() => {
    const canvas = canvasRef.current; // getting the data of the canvas
    //const test = colorsRef.current; // getting colors values
    if (!canvas) return;
    const context = canvas.getContext('2d'); // geting 2d of the canvas

    if (!context) return;

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', onResize, false);
    onResize();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current; // getting the data of the canvas
    if (!canvas) return;
    const context = canvas.getContext('2d'); // geting 2d of the canvas
    if (!context) return;

    const current: any = {};
    let drawing = false;

    const drawLine = ({
      x0,
      y0,
      x1,
      y1,
      color,
      name,
      emit,
      stroke,
    }: SocketPayload) => {
      context.beginPath();
      context.moveTo(x0, y0);
      context.lineTo(x1, y1);
      context.strokeStyle = color;
      context.lineWidth = stroke;
      context.stroke();
      context.closePath();

      if (!emit) {
        return;
      }

      const w = canvas.width;
      const h = canvas.height;

      socketRef.current.emit('drawing', {
        x0: x0 / w,
        y0: y0 / h,
        x1: x1 / w,
        y1: y1 / h,
        color,
        name,
        stroke,
      });
    };
    // geeting mouse and touch actions
    const onMouseDown = (e: any) => {
      console.log('dar');
      drawing = true;
      current.x = e.clientX || e.touches[0].clientX; //Set Starting X
      current.y = e.clientY || e.touches[0].clientY; //Set Starting Y
    };

    const onMouseMove = (e: any) => {
      if (!drawing) {
        return;
      }
      drawLine({
        x0: current.x, //Starting X
        y0: current.y, //Starting Y
        x1: e.clientX || e.touches[0].clientX, //Current X
        y1: e.clientY || e.touches[0].clientY, //Current Y
        color,
        name,
        stroke,
        emit: true,
      });
      current.x = e.clientX || e.touches[0].clientX;
      current.y = e.clientY || e.touches[0].clientY;
    };

    const onMouseUp = (e: any) => {
      if (!drawing) {
        return;
      }

      drawing = false;
      drawLine({
        x0: current.x,
        y0: current.y,
        x1: e.clientX || e.touches[0].clientX,
        y1: e.clientY || e.touches[0].clientY,
        color: color,
        stroke,
        name,
        emit: true,
      });
    };

    //To throttle the number of event calls..

    const throttle = (callback: any, delay: number) => {
      let previousCall = new Date().getTime();
      return function () {
        const time = new Date().getTime();

        if (time - previousCall >= delay) {
          previousCall = time;
          callback.apply(null, arguments);
        }
      };
    };

    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mouseout', onMouseUp, false);
    canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);

    //for mobile
    canvas.addEventListener('touchstart', onMouseDown, false);
    // canvas.addEventListener("touchend", onMouseUp, false);
    canvas.addEventListener('touchcancel', onMouseUp, false);
    canvas.addEventListener('touchmove', throttle(onMouseMove, 10), false);

    const onDrawingEvent = (data: any) => {
      const w = canvas.width;
      const h = canvas.height;
      drawLine({
        x0: data.x0 * w,
        y0: data.y0 * h,
        x1: data.x1 * w,
        y1: data.y1 * h,
        color: data.color,
        stroke: data.stroke,
        name: data.name,
      });
    };

    socketRef.current.on('drawing', onDrawingEvent);
  }, [color, name, stroke]);

  const clearScreen = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
  };
  return (
    <div className={styles.canvasContainer}>
      <canvas ref={canvasRef} className="canvas" />
    </div>
  );
};

export default Canvas;
