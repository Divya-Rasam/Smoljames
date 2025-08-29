
// The address of this server connected to the network is: URL -> http://localhost:1234
// IP -> 127.0.0.1:1234


// Setup
const express = require('express');        // library that helps us create servers easily.
const app = express();                        // our "server application".
const PORT = 1234;                             // the number where our server listens.            You will visit http://localhost:1234 to connect to it.


// Fake data
let data = ['divya']      // Just an array acting like a database for now. Initially it has one element: "divya".





// Middleware                    extra functions that run before your request hits your endpoints.
app.use(express.json())            // express.json() makes sure that whenever someone sends JSON data (like { "name": "zoro" }), it is automatically converted into a JavaScript object inside req.body                        Without this, req.body would be undefined








// ENDPOINT - HTTP VERBS (methods) && ROUTES (or paths)
// The method informs the nature of request and the route is a further subdirectory (basically we direct the request to the body of code to respond appropriately, and these locations or routes are called endpoints)

// console.log(`This is an extra line`)





// Type 1 - Website endpoints (these endpoints are for sending back html and they typically come when a user enters a url in a browser)

// app.get('/', (req, res) => {
//     // this is endpoint no 1 - /
//     console.log('Yay, I hit an endpoint.', req.method)
//     res.sendStatus(201)
// })

app.get('/', (req, res) => {                                      // GET / → When you open http://localhost:1234/, this code runs.
    console.log('User requested the homepage website')
    res.send(`
        <body style="background:pink; color:blue">
            <h1>DATA:</h1>
            <p>${JSON.stringify(data)}</p>                               // Shows the current data array.
            <a href="/dashboard">Dashboard</a>
        </body>
        <script>console.log('This is my script')</script>
        `)
})

app.get('/dashboard', (req, res) => {                           // GET /dashboard → When you open http://localhost:1234/dashboard, you see the "Dashboard" page.
    console.log('ohh now I hit the dashboard endpoint')
    res.send(`
        <body>
            <h1>Dashboard</h1>
            <a href="/">Home</a>

        </body>`);
})


// Type 2 - API endpoints (non visual)                          machine-readable,  These are for applications or frontend apps to talk to your backend.

// CRUD - method 
// Create-post Read-get Update-put Delete-delete

// a) Read data
app.get('/api/data', (req, res) => {                          // GET /api/data → sends back the data array in JSON.
    console.log('This one was for data')
    res.status(599).send(data);
})


// b) Add data
app.post('/api/data', (req, res) => {                    // POST /api/data → used to add a new name to the array.   Example: sending { "name": "zoro" }
    // someone wants to create a user  (for example when they click a sign up button)
    // the user clicks the sign up button after entering their credentials and their browser is wired up to send out a network request to the server to handle that action 
    const newEntry = req.body                                   // express.json() ensures req.body becomes { name: "zoro" }    
    console.log(newEntry);
    data.push(newEntry.name)
    res.sendStatus(201);                                     // 201 → means Created (standard success code for POST).
})


// c) Delete data
app.delete('/api/data', (req, res) => {                 // DELETE /api/data → removes the last element of the array.
    data.pop()                                              // Example: If ['divya', 'zoro'] exists, after delete → ['divya'].
    console.log('We deleted the element off the end of the array')
    res.sendStatus(203);
})





// Start the server

app.listen(PORT, () => console.log(`Server has started on: ${PORT}`));