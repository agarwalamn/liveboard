import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import io, { Socket } from 'socket.io-client';

import { Users } from '../Playground';
import { useToolSettings } from 'hooks/context/useToolsSettings';

import styles from './Canvas.module.scss';
import CursorIcon from 'assets/cursor.svg';

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
  usersInRoom: Users[];
  updateUserInCurrentRoom: (_: Users[]) => void;
}

const Canvas = ({
  name,
  room,
  usersInRoom,
  updateUserInCurrentRoom,
}: CanvasProps) => {
  // state variables
  const [userPointerCordinates, setUserPointerCordinates] =
    useState<Record<string, { x: number; y: number }>>();

  // references
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let socketRef = useRef<any>();

  const { color, stroke } = useToolSettings();

  const ENDPOINT =
    process.env.NEXT_PUBLIC_LIVEBOARD_BACKEND_URL || 'http://localhost:5000';

  const handleErrors = (msg: string) => {
    toast(`⛔ ${msg}`);
  };

  const moveCursor = (name: string, x: number, y: number) => {
    setUserPointerCordinates({
      ...userPointerCordinates,
      [name]: {
        x,
        y,
      },
    });
  };

  //useRef is used to get the values of the dom element
  useEffect(() => {
    socketRef.current = io(ENDPOINT, { transports: ['websocket'] }) as Socket;

    socketRef.current.on('connect_error', (err: any) => {
      console.log(`connect_error due to ${err}`);
    });

    socketRef.current.emit('join', { name, room }, (error: string) => {
      if (error) handleErrors(error);
    });
  }, [ENDPOINT, name, room]);

  useEffect(() => {
    const canvas = canvasRef.current; // getting the data of the canvas
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

    const onMovePointerEvent = (name: string, x: number, y: number) => {
      moveCursor(name, x, y);
      socketRef.current.emit('sharecursor', {
        name,
        x,
        y,
      });
    };

    // geeting mouse and touch actions
    const onMouseDown = (e: any) => {
      drawing = true;
      current.x = e.clientX || e.touches[0].clientX; //Set Starting X
      current.y = e.clientY || e.touches[0].clientY; //Set Starting Y
    };

    const onMouseMove = (e: any) => {
      onMovePointerEvent(name, e.clientX, e.clientY);
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

  useEffect(() => {
    const showJoinNotification = ({ message }: { message: string }) => {
      toast(message);
    };

    socketRef.current.on('sharecursor', ({ name, x, y }: any) =>
      moveCursor(name, x, y),
    );
    socketRef.current.on('notification', showJoinNotification);
  }, [socketRef]);

  useEffect(() => {
    socketRef.current.on('users', updateUserInCurrentRoom);
  }, [updateUserInCurrentRoom]);

  return (
    <div className={styles.canvasContainer}>
      <canvas ref={canvasRef} className="canvas" />
      <div className={styles.pointerContainer}>
        {usersInRoom.map((user) => (
          <div
            key={user.id}
            className={styles.pointer}
            style={
              user.name !== name
                ? {
                    top: `${
                      userPointerCordinates
                        ? userPointerCordinates[user.name]?.y
                        : 0
                    }px`,
                    left: `${
                      userPointerCordinates
                        ? userPointerCordinates[user.name]?.x
                        : 0
                    }px`,
                  }
                : { display: 'none' }
            }
          >
            <CursorIcon />
            <div className={styles.userPointer}>{user.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Canvas;
