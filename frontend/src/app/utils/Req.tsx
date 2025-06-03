import axios from "axios";

const Req = ({
    method = 'GET',
    uri = '',
    data = {}
}) => {
    const url = uri?.startsWith('https://') ? uri : `${process.env.REACT_APP_SERVER_URL || 'http://localhost:3000'}/api/${uri}`;
    const payload = {
        method,
        withCredentials: true,
        url,
        data,
    };
    return axios(payload);
};
export default Req;