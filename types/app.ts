export enum ProcessInfoFields {
    Id = "id",
    Name = "name",
    ProductName = "productName",
    ProductQuantity = "productQuantity",
    Bacteria = "bacteria",
    Description = "description",
    ProcessStart = "processStart"
}

export interface TransformedData {
    timestamp: string[];
    temp: number[];
    tempk: number[];
    sumfr: number[];
    fr: number[];
    pressure: number[];
}