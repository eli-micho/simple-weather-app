import axios from 'axios';

export const returnWeatherCall = async (url) => {
    try {
        const res = await axios.get(url)
        return res.data
    }catch(err){
        console.log(err)
    }
};