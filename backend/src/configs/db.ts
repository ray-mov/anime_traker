import mongoose from "mongoose";

export async function connectDB(): Promise<void>{
    try{
        const connection = await mongoose.connect(process.env.MONGO_URI as string, {
            autoIndex: true,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
        });
        console.log(`✅ MongoDB Connected: ${connection.connection.host}`);
    }catch(error){
        console.error('❌ MongoDB connection failed:', error);
        process.exit(1);
    }
    
}