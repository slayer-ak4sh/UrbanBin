import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let stompClient = null;

export const connect = (token, onConnect, onError) => {
  const wsUrl = import.meta.env.VITE_WS_URL || 'http://localhost:8080/ws';
  
  stompClient = new Client({
    webSocketFactory: () => new SockJS(wsUrl),
    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },
    debug: (str) => {
      console.log('STOMP: ' + str);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    onConnect: () => {
      console.log('WebSocket Connected');
      if (onConnect) onConnect();
    },
    onStompError: (frame) => {
      console.error('STOMP error:', frame);
      if (onError) onError(frame);
    },
  });

  stompClient.activate();
  return stompClient;
};

export const subscribe = (topic, callback) => {
  if (stompClient && stompClient.connected) {
    return stompClient.subscribe(topic, (message) => {
      const data = JSON.parse(message.body);
      callback(data);
    });
  }
  return null;
};

export const disconnect = () => {
  if (stompClient) {
    stompClient.deactivate();
    stompClient = null;
  }
};

export const getClient = () => stompClient;
