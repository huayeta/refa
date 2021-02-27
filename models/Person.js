import mongoose from "mongoose";

/* PetSchema will correspond to a collection in your MongoDB database. */
const PersonSchema = new mongoose.Schema({
    accout: {
        /* The name of this pet */

        type: String,
        required: [true, 'Please provide a name for this pet.']
    }
})

export default mongoose.models.Persion || mongoose.model('Person', PersonSchema)