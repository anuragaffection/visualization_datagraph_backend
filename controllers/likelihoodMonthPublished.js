import fetchData from "../util/fetchData.js";

const likelihoodMonthPublished = async (req, res) => {
    try {
        const allData = await fetchData();
        const monthLikehoodObj = {};
        allData.forEach((item) => {
            // according to published month  
            const month = new Date(item.published).toLocaleString('default', { month: 'long' });
            
            if (!monthLikehoodObj[month]) {
                monthLikehoodObj[month] = item.likelihood
            }
            else {
                monthLikehoodObj[month] += item.likelihood
            }
        })
        const result = Object.keys(monthLikehoodObj).map((month) => {
            return {
                month: month,
                sumOfLikelihoodOfmonth: monthLikehoodObj[month]
            }
        })

        if (allData.length === 0) {
            res.json({
                success: false,
                message: "No Data Found"
            })
        }
        else {
            res.json({
                success: true,
                message: "Total Likelihood of the month",
                data: result
            })
        }
    } catch (error) {
        throw error
    }
}

export default likelihoodMonthPublished;