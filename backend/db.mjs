import mongoose from "mongoose";

const mongoURI = 'mongodb://0.0.0.0:27017/inotebook-database';


const monogoConnect = () => {
    mongoose.connect(mongoURI)
        .then(() => console.log('Connected to MongoDB'))
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error);
        });
};

export default monogoConnect;