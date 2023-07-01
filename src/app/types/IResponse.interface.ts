export interface IResponse<T> {
    statusType: string,
    status: string, 
    data: T,
}