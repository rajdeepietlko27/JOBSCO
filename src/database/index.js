const { default: mongoose, connection } = require("mongoose");



const connectToDB = async () => {
  const connectionURL =
    "mongodb+srv://masterrajdeepsingh14_db_user:rajdeep@cluster0.ukvtewc.mongodb.net/";
   mongoose.connect(connectionURL).then(()=>console.log('Job Board Database Connection is SuccessFull')).catch(e=>console.log(e));

};


export default connectToDB;
