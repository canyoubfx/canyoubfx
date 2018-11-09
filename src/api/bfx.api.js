import axios from 'axios';
import { ROOT_URL } from '../constants/index';
export const getTicker = (payload) => axios.get(`${ROOT_URL}/pubticker/${payload}`);
export const getSymbols = () => axios.get(`${ROOT_URL}/symbols`);
