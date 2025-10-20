// index.js
import express from 'express'
import cors  from 'cors'
import db from './module/index.js'
import userRouter from './router/user.router.js'
import contactRouter from './router/contact.router.js'
import cookieParser from 'cookie-parser'
import upload from './middleware/upload.js'
import imageRouter  from './router/image.router.js'
import riderRouter from './router/rider.router.js'
import vehicleRouter from './router/vehicle.router.js'
import { verifyToken } from './middleware/verifyToken.js'
// import path  from 'path'

const app = express()
const PORT = process.env.PORT || 5000

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:9000",
  "http://localhost:8000",
  "http://192.168.1.109:3000"
];

app.use(
  cors({
    origin: allowedOrigins,
    // origin: ["*"],
    credentials: true
  })
);
app.use(express.json()) // Parse JSON bodies
app.use(express.urlencoded({ extended: true })) // Parse URL-encoded bodies

app.use('/api/images', imageRouter);
app.use(cookieParser());
// Routes
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded.');
  res.send(`File uploaded successfully: ${req.file.filename}`);
});
app.get('/', (req, res) => {
  res.send('Hello World! Express is running.')
})

// Example API route
app.get('/api/example', (req, res) => {
  res.json({ message: 'This is an example API response.' })
})
app.get("/api/logout",  (req, res)=>{
    try {
      res.clearCookie("access_token", {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
      });
      res.clearCookie("refresh_token", {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
      });
      res.status(200).json({status:'success',message:'Logout successful.' });
    } catch (err) {
      res.status(500).json({ error: err.message,status:'fail',message:'something went wrong' });
    }
});
app.use('/api/users', userRouter)
app.use('/api/contact', contactRouter)
app.use('/api/riders', verifyToken, riderRouter)
app.use('/api/vehicles', verifyToken, vehicleRouter)

app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' })
})

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

// db.sequelize.authenticate({ alter: true }).then(() => {
//   console.log("DB connected...");
// });
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
