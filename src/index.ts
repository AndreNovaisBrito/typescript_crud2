import express, {Express, Request, Response} from 'express';
import mongoose from 'mongoose';
import cors from "cors";
import helmet from "helmet";

import * as dotenv from "dotenv";

dotenv.config();
const password = process.env.DB_PASSWORD;
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://andrenovais:"+password+"@cluster0.umpebah.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect((err: Error) => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

if (!process.env.PORT) {
    process.exit(1);
 }
 
 const PORT: number = parseInt(process.env.PORT as string, 10);

const app: Express = express();
// app.get('/', (req: Request, res: Response)=>{
//     res.send('Typescript and node works');
// });
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
  });

// Define a user schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  });
  
  // Create a model from the user schema
  const User = mongoose.model("User", userSchema);
  
  // POST endpoint for creating a user
  app.post('/create-user', async (req: Request, res: Response) => {
    try {
      const userData = req.body.name;
      console.log(userData);
      const user = new User(userData);
      await user.save();
      res.status(201).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  // GET endpoint for retrieving all users
  app.get('/users', async (req: Request, res: Response) => {
    try {
      const users = await User.find();
      res.send(users);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  // GET endpoint for retrieving a single user by ID
  app.get('/users/:id', async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  // PUT endpoint for updating a user
  app.put('/users/:id', async (req: Request, res: Response) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  // DELETE endpoint for deleting a user
  app.delete('/users/:id', async (req: Request, res: Response) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });

