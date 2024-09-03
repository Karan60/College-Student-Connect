import mongoose from "mongoose"

export const Connection = async () => {
    const URL = '';
    try{
     await mongoose.connect(URL, { useNewUrlParser: true });
     console.log('database connected succesfully')
    }catch (error){
    console.log('error while connecting with the database', error);
    }
}