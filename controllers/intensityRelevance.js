import fetchData from "../util/fetchData.js";

const intensityRelevance = async (req, res) => {
    try {
        const allData = await fetchData();
        const intensityRelevanceArray = [];
        for (let d of allData) {
            if (d.intensity && d.relevance) {
                intensityRelevanceArray.push([d.intensity, d.relevance])
            }
        }

        if (allData.length === 0) {
            res.json({
                success: false,
                message: "No Data is here"
            })
        }
        else {
            res.json({
                success: true,
                message: "Intensity & Relevance ",
                data: intensityRelevanceArray
            })
        }

    } catch (error) {
        console.log("error = ", error)
    }
}

export default intensityRelevance