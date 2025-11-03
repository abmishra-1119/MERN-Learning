// import { createServer } from "http";
// import { randomUUID } from "crypto";
// import url from "url";


// let users = [
//     { id: "1", name: "Abhishek", age: 25 },
//     { id: "2", name: "Gautam", age: 25 }
// ]

// const server = createServer((req, res) => {
//     const parsedUrl = url.parse(req.url, true)
//     const { path } = parsedUrl
//     const method = req.method
//     const sendJson = (status, data) => {
//         res.writeHead(status, { "content-type": "application/json" })
//         res.end(JSON.stringify(data))
//     }

//     if (method === 'GET' && path === "/users") {
//         return sendJson(200, users)
//     }
//     if (method === 'POST' && path === "/users") {
//         const id = randomUUID()
//         let data = ''
//         req.on('data', (chunk) => (data += chunk))
//         req.on('end', () => {
//             const newUser = JSON.parse(data)
//             newUser.id = id;
//             users.push(newUser)
//             sendJson(201, users)
//         })
//         return
//     }
//     if (method === 'PUT' && path.startsWith('/users')) {
//         const id = path.split('/')[2]
//         let data = ''
//         const finduser = users.findIndex((user) => user.id === id)
//         console.log(finduser);

//         if (finduser === -1) {
//             return sendJson(404, { message: "User Not Found" })
//         }
//         req.on('data', (chunk) => (data += chunk))
//         req.on('end', () => {
//             const newUser = JSON.parse(data)
//             newUser.id = id;
//             users[finduser] = newUser
//             sendJson(201, users)
//         })
//         return
//     }

//     if (method === 'PUT' && path.startsWith('/users')) {
//         const id = path.split('/')[2]
//         let data = ''
//         const finduser = users.findIndex((user) => user.id === id)
//         if (finduser === -1) {
//             return sendJson(404, { message: "User Not Found" })
//         }
//         req.on('data', (chunk) => (data += chunk))
//         req.on('end', () => {
//             const newUser = JSON.parse(data)
//             newUser.id = id;
//             users[finduser] = newUser
//             sendJson(201, users)
//         })
//         return
//     }
//     if (method === 'DELETE' && path.startsWith('/users')) {
//         const id = path.split('/')[2]
//         const finduser = users.findIndex((user) => user.id === id)
//         if (finduser === -1) {
//             return sendJson(404, { message: "User Not Found" })
//         }
//         users.splice(finduser, 1)
//         sendJson(200, users)
//         return
//     }

//     if (method === 'GET' && path.startsWith('/users')) {
//         const id = path.split('/')[2]
//         const finduser = users.findIndex((user) => user.id === id)
//         if (finduser === -1) {
//             return sendJson(404, { message: "User Not Found" })
//         }
//         sendJson(200, users[finduser])
//         return
//     }
//     sendJson(404, { message: "Path Not Found" })
// })


// const PORT = 3000;

// server.listen(PORT, () => {
//     console.log('Server is running on port 3000')
// })


import express from "express";
import { randomUUID } from "crypto";

const app = express();
app.use(express.json());

let users = [
    { id: "1", name: "Abhishek", age: 25 },
    { id: "2", name: "Gautam", age: 24 }
];

const logCheck = (req, res, next) => {
    if (req.path === '/favicon.ico') {
        return next()
    }
    res.on('finish', () => {
        console.log(req.method, req.path, res.statusCode);
    })
    next()
}

const validation = (req, res, next) => {
    const { name, age } = req.body;
    if (!name) {
        return res.status(400).json({ message: "Name is required" })
    } else if (!age) {
        return res.status(400).json({ message: "Age is required" })
    }
    next()
}

app.use(logCheck)

app.get("/users", (req, res) => {
    res.json(users)
});

app.get("/users/:id", (req, res) => {
    const user = users.find(u => u.id === req.params.id);
    if (!user) return res.status(404).json({ message: "User Not Found" });
    res.json(user);
});

app.post("/users", validation, (req, res) => {
    const newUser = { id: randomUUID(), ...req.body };
    users.push(newUser);
    res.status(201).json(newUser);
});

app.put("/users/:id", validation, (req, res) => {
    const idx = users.findIndex(u => u.id === req.params.id);
    if (idx === -1) return res.status(404).json({ message: "User Not Found" });
    users[idx] = {...users[idx], ...req.body };
    res.json(users[idx]);
});

app.delete("/users/:id", (req, res) => {
    users = users.filter(u => u.id !== req.params.id);
    res.json({ message: "User deleted" });
});

app.listen(3000, () => console.log("Express server running on port 3000"));