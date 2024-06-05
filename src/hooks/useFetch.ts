import {useState} from "react";
import IError from "../models/IError";

export const useFetch = (callback: Function): [Function, boolean, IError | null] => {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<IError | null>(null)

    const fetching = async (...args: any) => {
        try {
            setError(null);
            setLoading(true);
            await callback(...args);
        } catch (e) {
            setLoading(false);
            setError({
                //@ts-ignore
                data: e.data,
                error: {
                    //@ts-ignore
                    status: e.status,
                    //@ts-ignore
                    name: e.name,
                    //@ts-ignore
                    message: e.message,
                    //@ts-ignore
                    details: e.details,
                }
            })
        } finally {
            setLoading(false);
        }
    }

    return [fetching, loading, error];
}