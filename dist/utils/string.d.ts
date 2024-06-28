interface IDotToObvject {
    orderBy: string;
    orderDirection: Object;
}
export declare const dotToObject: ({ orderBy, orderDirection }: IDotToObvject) => Record<string, any>;
export {};
