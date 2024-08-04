import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const mongourl = process.env.MONGO_URL

const connect = async () => {
  try {
    await mongoose.connect(mongourl);
    console.log('Connection is established with the database');

    const fetchFoodItem = mongoose.connection.db.collection("food_items");
    const data = await fetchFoodItem.find({}).toArray();
    global.food_items = data
    
    const fetchFoodCat = mongoose.connection.db.collection('foodCategory')
    const foodcat = await fetchFoodCat.find({}).toArray();
    global.foodCategory = foodcat
    //console.log(  global.foodCategory)
  } catch (err) {
    console.log('Connection not established:', err.message);
  }
}

export default connect;