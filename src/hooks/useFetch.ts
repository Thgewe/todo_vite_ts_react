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
                data: e.data,
                error: {
                    status: e.status,
                    name: e.name,
                    message: e.message,
                    details: e.details,
                }
            })
        } finally {
            setLoading(false);
        }
    }

    return [fetching, loading, error];
}