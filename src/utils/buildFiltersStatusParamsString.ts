import {TSelectStatusValue} from "../models/TSelectStatusValue";

export const buildFiltersStatusParamsString = (value: TSelectStatusValue): string => {
    switch (value) {
        case "all":
            return "";
        case "completed":
            return "&filters%5Bstatus%5D=completed+favourite&filters%5Bstatus%5D=completed";
        case "not_completed":
            return "&filters%5Bstatus%5D=not_completed+favourite&filters%5Bstatus%5D=not_completed";
        case "favourite":
            return "&filters%5Bstatus%5D=completed+favourite&filters%5Bstatus%5D=not_completed+favourite";
        default:
            return "";
    }
}