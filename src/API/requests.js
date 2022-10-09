import { HttpRequest } from ".";
import { ENV } from "../config";


export const findAllAnimalsByType = async (type) => {
    try {
        let url = `${ENV.API_URL_V1}/${ENV.PETS_FINDER_URL}/find-all-by-type/${type}`;
        return await HttpRequest(url);
    } catch (e) {
        console.log(e);
        return null;
    }
}

export const findAllAnimals = async () => {
    try {
        let url = `${ENV.API_URL_V1}/${ENV.PETS_FINDER_URL}/find-all`;
        return await HttpRequest(url);
    } catch (e) {
        console.log(e);
        return null;
    }
}