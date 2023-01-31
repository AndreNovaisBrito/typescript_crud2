"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const password = process.env.DB_PASSWORD;
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://andrenovais:" + password + "@cluster0.umpebah.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect((err) => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});
if (!process.env.PORT) {
    process.exit(1);
}
const PORT = parseInt(process.env.PORT, 10);
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    res.send('Typescript and node works');
});
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Define a user schema
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
// Create a model from the user schema
const User = mongoose_1.default.model("User", userSchema);
// POST endpoint for creating a user
app.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const user = new User(userData);
        yield user.save();
        res.status(201).send(user);
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
// GET endpoint for retrieving all users
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User.find();
        res.send(users);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
// GET endpoint for retrieving a single user by ID
app.get('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findById(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.send(user);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
// PUT endpoint for updating a user
app.put('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.send(user);
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
// DELETE endpoint for deleting a user
app.delete('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.send(user);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
function sayHelloWorld() {
    console.log("\n");
    console.log("*** Hello World from Type Script code. ***");
    console.log("\n");
}
sayHelloWorld();
