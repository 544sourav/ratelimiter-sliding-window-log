# 🚦 Rate Limiter Middleware (Express + Redis)

This project implements a **Rate Limiting Middleware** in Node.js using **Express** and **Redis**.  
It protects APIs by preventing clients (per IP) from making too many requests in a short time.  

We use the **Sliding Window Log algorithm** for precise request throttling.

---

## 📌 Features
- ⏱ Accurate **Sliding Window Log** algorithm  
- 🌍 Per-IP rate limiting  
- ⚡ Redis for fast, distributed request tracking  
- 🛡 Prevents API abuse & DoS attacks  
- 🔧 Configurable window size & request limit  

---

## 🛠 Tech Stack
- [Node.js](https://nodejs.org/) (v18+)  
- [Express.js](https://expressjs.com/)  
- [Redis](https://redis.io/)  
- [Docker](https://www.docker.com/) (optional, for running Redis)  

---

## 📂 Project Structure
```bash
rate-limiter/
│── index.js        # Express app
│── middleware.js   # Rate limiter logic
│── package.json
│── README.md
```

---

## ⚙️ Setup

### 1. Clone repo & install dependencies
```bash
git clone <your-repo-url>
cd rate-limiter
npm install
```

### 2. Start Redis
Run locally:
```bash
redis-server
```

Or with Docker:
```bash
docker run -d --name redis -p 6379:6379 redis
```

### 3. Start the server
```bash
node index.js
```

Server will run at:
```
http://localhost:3000
```

---

## 📬 Testing

### With Postman
- Start the server  
- Make repeated GET requests to `http://localhost:3000/`  
- After exceeding the limit, you’ll get:
```json
{ "error": "Too many requests, please try again later." }
```

### With Curl
```bash
curl -i http://localhost:3000/
```

---

## 📖 Algorithm
We use the **Sliding Window Log algorithm**:  
- Each request timestamp is stored in a Redis **sorted set**.  
- Old requests (outside the time window) are automatically removed.  
- If the number of requests in the window exceeds the allowed limit → the request is blocked.  

This provides **precise throttling** compared to fixed windows.

---

## ✅ Example
- Limit: **5 requests / 10 seconds**  
- User sends 6th request within 10s → blocked.  
- After 10s, old requests expire → user can send again.  

