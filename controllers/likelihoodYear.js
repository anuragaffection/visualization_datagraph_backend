import fetchData from "../util/fetchData.js";

const likelihoodYear = async (req, res) => {
    try {
        const allData = await fetchData();
        const yearLikehoodObj = {};
        allData.forEach( (item) => {
            const year = new Date (item.added).getFullYear();
            if (!yearLikehoodObj[year]){
                yearLikehoodObj[year] = item.likelihood
            }
            else {
                yearLikehoodObj[year] += item.likelihood
            }
        })
        const result = Object.keys(yearLikehoodObj).map( (year) => {
            return {
                year : parseInt(year), 
                sumOfLikelihoodOfYear : yearLikehoodObj[year]
            }
        })

        if (allData.length === 0) {
            res.json({
                success : false, 
                message : "No Data Found"
            })
        }
        else {
            res.json({
                success : true, 
                message : "Total Likelihood of the year",
                data : result
            })
        }
    } catch (error) {
        throw error
    }
}

export default likelihoodYear;