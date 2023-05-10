import {http} from '../utils/http'
import useSWR from "swr";

const url = {
    getAllToko: () => `/toko`,
}

const hooks = {
    useGetToko() {
        return useSWR(url.getAllToko, http.fetcher)
    }
}

export const tokoRepository = {
    url,
    hooks
}