import Person from "../../models/Person";

export default async (req, res) => {

    const {method} = req;

    const persons = await Person.find().exec()
    res.status(200).json(persons);
}