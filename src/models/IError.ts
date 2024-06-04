export default interface IError {
    data: any,
    error: {
        status: number,
        name: string,
        message: string,
        details: any
    }
}