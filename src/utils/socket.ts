import { Socket, io } from 'socket.io-client';

class socketIo {
  static _instance: Socket | null;

  static getInstance() {
    return this._instance;
  }

  static connect(query: { token: string }) {
    if (!this._instance) {
      this._instance = io(import.meta.env.VITE_BASE_WEBSOCKET, {
        query,
      }).on('connect', () => {
        console.log('已经成功链接上socket');
      });
    }
    return this._instance;
  }

  static emit(event: string, data: unknown) {
    if (this._instance) {
      this._instance.emit(event, data);
    }
  }

  static disconnect() {
    if (this._instance) {
      this._instance.disconnect();
      this._instance = null;
    }
  }
}

export default socketIo;
