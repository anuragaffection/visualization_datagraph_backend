import fetchData from "../util/fetchData.js";

const topicFilter = async (req, res) => {
    try {
        const allData = await fetchData();
        const topicCount = new Map();

        for (const d of allData) {
            if (!topicCount.has(d.topic)) {
                topicCount.set(d.topic, 1)
            }
            else {
                topicCount.set(d.topic, topicCount.get(d.topic) + 1);
            }
        }

        const topicCountArray = Array.from(topicCount.entries()).map(([topic, count]) => ({
            topic,
            count
        })).sort((a, b) => b.count - a.count);

        if (allData.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Data is empty"
            });
        }

        res.json({
            success: true,
            message: "All topics data are here",
            data: topicCountArray
        });

    } catch (error) {
        console.error('Error fetching topics:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

export default topicFilter;