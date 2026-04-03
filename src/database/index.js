const { default: mongoose, connection } = require("mongoose");



const connectToDB = async () => {
  const connectionURL = process.env.MONGO_URI;
   mongoose.connect(connectionURL).then(()=>console.log('Job Board Database Connection is SuccessFull')).catch(e=>console.log(e));

};


export default connectToDB;
