const mongoose = require('mongoose');



const dbConection = async() => {
    try {
        console.log('variableMamona', process.env.MONGODB_CNN);
       await mongoose.connect( process.env.MONGODB_CNN, {
           useNewUrlParser: true, 
           useUnifiedTopology: true,
           useCreateIndex: true,
           useFindAndModify: false
        });

        console.log('Base de datos en linea');
    } catch (error) {
        console.log(error);
        throw new Error("Error a la hora de iniciar la base de datos");
    }

}



module.exports = {
    dbConection
}