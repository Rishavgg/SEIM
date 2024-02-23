import express  from "express";
import mongoose from "mongoose"

const port = 3001
const app = express()
mongoose.set('strictQuery', true);
app.set('view engine', 'ejs');
const conn = mongoose.connection;

main().catch(err => console.log(err));
main().then(() => {
  console.log("mongo connection established");
})

const logSchema = new mongoose.Schema({
  remote: String,
  host: String,
  user: String,
  method: String,
  path: String,
  code: String,
  size: String,
  referer: String,
  agent: String,
  time: Date
});

const Log = mongoose.model('logs', logSchema);

async function main() {
    await mongoose.connect('mongodb://root:root@localhost:27017/admin', {
      authSource: "admin",
      user: "root",
      pass: "root",
    })
}

conn.on('error', console.error.bind(console, 'connection error:'));

app.get("/",async (req,res) => {
  const logs = await Log.find()
  res.render('index', { logs })
})

app.listen(port, () => {
  console.log(`server running on ${port}`)
})
