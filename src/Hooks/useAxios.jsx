import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: "https://swiftshop-server-gamma.vercel.app"
});
const useAxios = () => {
    return axiosInstance
};

export default useAxios;