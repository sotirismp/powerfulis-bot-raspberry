import { sendMessage } from "./sendMessage.js";

class RequestQueue {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
  }
  addRequest(request) {
    this.queue.push(request);
    if (!this.isProcessing) this.processQueue();
  }
  async processQueue() {
    this.isProcessing = true;
    while (this.queue.length > 0) {
      const request = this.queue.shift();
      await this.handleRequest(request);
    }
    this.isProcessing = false;
  }
  async handleRequest(request) {
    return new Promise((resolve) => resolve(request()));
  }
}

const requestQueue = new RequestQueue();

export const addMessage = (text, msg) => {
  requestQueue.addRequest(() => sendMessage(text, msg));
};

export default RequestQueue;
