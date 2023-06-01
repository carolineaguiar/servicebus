export interface HttpInterface {
    get(url: string): Promise<any>;
}