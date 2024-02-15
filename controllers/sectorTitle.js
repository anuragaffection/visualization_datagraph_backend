import fetchData from "../util/fetchData.js";

const sectorTitle = async (req, res) => {
    try {
        const allData = await fetchData();
        const sectorTitleArray = [];

        for (let d of allData) {
            // Find the sector object in the array
            const sectorObject = sectorTitleArray.find(sectorObj => sectorObj.sector === d.sector);

            // If the sector is not in the array, add a new object
            if (!sectorObject) {
                sectorTitleArray.push({
                    sector: d.sector,
                    title: [d.title]
                });
            } else {
                // If the sector is already in the array, push the title into the existing object
                sectorObject.title.push(d.title);
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
                message: "Intensity & Relevance",
                data: sectorTitleArray
            })
        }
    } catch (error) {
        throw error
    }
}

export default sectorTitle;