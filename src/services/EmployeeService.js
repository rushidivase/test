import axios from "axios";

const REST_BASE_API = "http://localhost:8088/emp-service/";

export const createEmployee = (employee) => {axios.post(REST_BASE_API, employee);}

