const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();
const uri = `mongodb+srv://a${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster1.rqnkebz.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run(value) {
  try {
   await client.connect();
  } finally {
    // await client.close();
  }
}
    const express = require('express');
    const app = express();
    const port = 3000;
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    const transaction = require('./models/transaction.js')

    app.post('/add', (req, res) => {
       const {transType,title,amount,category,date} = req.body
       const {userId} = req.query
       addTransaction(transType,title,amount,category,date,userId)  
    })

    app.get('/get', (req, res) => {
      const month = req.query.month;
      const userId = req.query.userId
      const data = getTransactionsByMonth(month,userId)
      data.then((result) => {
        res.send(result);
      })
    })

    app.get("/gettotal" , (req,res) => {
      const {month,userId} = req.query
      const data = getTransactionsByMonth(month,userId)
      data.then((result) => {
        const [income,expense] = count(result)
        res.send({income,expense})

      })
    })

    app.listen(port, () => {
      console.log(`Сервер Express працює на порту ${port}`);
    });


app.get('/getbycategory', (req, res) => {
  const {month,userId,category} = req.query
  const data = getByCategory(category,month,userId)
  data.then((result) => {
    res.send(result);
  })
})


app.post('/register', (req, res) => {
  const {email,password} = req.body
  addUser(email,password)
  const user = login(email,password)
  user.then((result) => {
    res.send(result);
  })
})

app.get('/login', (req, res) => {
  const {email,password} = req.query
  const user = login(email,password)
  user.then((result) => {
    res.send(result);
  })
})

app.get("/getcategoriesvalues", (req,res) => {
  const {month,userId} = req.query
  const data = getCategoriesValues(month,userId)
  data.then((result) => {
    res.send(result)
  })
})

async function getCategoriesValues(month,userId) {
  month++
  const transactions = client.db().collection(`transactions`);
  const startOfMonth = new Date(new Date().getFullYear(),month-1,1)
  const endOfMonth = new Date(new Date().getFullYear(), month ,1)
  const result = await transactions.find({date: {$gt:startOfMonth,$lt:endOfMonth}, userId:userId}).toArray();
  const categories = []
  for(let i=0;i<result.length;i++)
  {
    if(!categories.includes(result[i].category))
    {
      categories.push(result[i].category)
    }
  }
  const categoriesValues = []
  for(let i=0;i<categories.length;i++)
  {
    let sum = 0
    for(let j=0;j<result.length;j++)
    {
      if(categories[i]===result[j].category&&result[j].transType==='expense')
      {
        sum+=result[j].amount
      }
    }
    categoriesValues.push({category:categories[i],value:sum})
  }
  return categoriesValues
}


async function getByCategory(category,month=0,userId) {
  month++
  const transactions = client.db().collection(`transactions`);
  const startOfMonth = new Date(new Date().getFullYear(),month-1,1)
  const endOfMonth = new Date(new Date().getFullYear(), month ,1)
  const result = await transactions.find({date: {$gt:startOfMonth,$lt:endOfMonth},category:category, userId:userId}).toArray()
  return result
}

async function addUser(email,password) {
  const users = client.db().collection('users');
  const user = {email,password}
  await users.insertOne(user);
}

async function getTransactionsByMonth(month=0,userId) {
  month++
  const transactions = client.db().collection(`transactions`);
  const startOfMonth = new Date(new Date().getFullYear(),month-1,1)
  const endOfMonth = new Date(new Date().getFullYear(), month ,1)
  const result = await transactions.find({date: {$gt:startOfMonth,$lt:endOfMonth},userId:userId}).toArray()
  return result
}

async function addTransaction(transType,title,amount,category,date,userId) {
  const transactions = client.db().collection(`transactions`);
  const transactionItem = new transaction({transType,title,amount,category,date,userId})
  await transactions.insertOne(transactionItem);
}

async function login(email,password)
{
  const users = client.db().collection('users');
  const user = await users.findOne({email:email,password:password})
  return user
}

function count(value){
  let income = 0
  let expense = 0
  for(let i=0;i<value.length;i++)
  {
    if(value[i].transType==='income')
    {
      income+=value[i].amount
    }
    else if(value[i].transType==='expense')
    {
      expense+=value[i].amount
    }
  }
  return [income,expense]

}


run().catch(console.dir);

module.exports = run;
