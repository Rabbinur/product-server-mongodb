const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const cors = require("cors");
const { json } = require("express");
const port = process.env.Port || 5000;

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Simple Node server running");
});

//mongodb

// username:dbuser1
//password: hG6ggAKsgBc05jFe

const uri =
  "mongodb+srv://dbuser1:hG6ggAKsgBc05jFe@cluster0.pauaaue.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const userCollection = client.db("product").collection("users");

    //for check to store mongodb
    // const user = {
    //   name: "Shams",
    //   email: "shams.cse.bubt@gmail.com",
    // };
    // const result = await userCollection.insertOne(user);
    // console.log(result);

    /*------------ 
   to find multiple user 
   for access client side
   to show ui interface 
   */
    app.get("/users", async (req, res) => {
      const cursor = userCollection.find({});
      const users = await cursor.toArray();
      res.send(users);
    });

    //to store data into mongodb from client side
    app.post("/users", async (req, res) => {
      const user = req.body;
      // users.push(user);
      const result = await userCollection.insertOne(user); //set asynnc to arrow funtoin
      console.log(result);
      user._id = result.insertedId;
      res.send(user);
    });
  } finally {
  }
}
run().catch((err) => console.log(err));

//
/*

// for client side node server create a object
const users = [
  {
    id: 1,
    name: "Rabbinur",
    email: "rabbinur345@gmail.com",
  },
  {
    id: 2,
    name: "Rabbinur123",
    email: "rabbinur12345@gmail.com",
  },
  {
    id: 3,
    name: "Rabbinur852",
    email: "rabbinur852345@gmail.com",
  },
];
*/
//for sending the user interface showing
// app.get("/users", (req, res) => {
//   // for query by user for searching
//   if (req.query.name) {
//     const search = req.body.name;
//     const filtered = users.filter((usr) =>
//       usr.name.toLowerCase().indexOf(search)
//     );
//     res.send(filtered);
//   } else {
//     res.send(users);
//   }
// });
//set for input user to users objects to store
// app.post("/users", (req, res) => {
//   const user = req.body;
//   user.id = users.length + 1;
//   users.push(user);
//   console.log(user);
//   res.send(user);
//   console.log(user);
//   console.log("post api called");
// });
app.listen(port, () => {
  console.log(`Simple not server running on port ${port}`);
});
