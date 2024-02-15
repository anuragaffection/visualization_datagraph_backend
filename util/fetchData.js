import dataModel from "../models/dataModel.js";

const fetchData = async () => {
    try {
        const allData = await dataModel.find({})
        return allData;
    } catch (error) {
        console.log("error = ", error)
    }
}

export default fetchData;