export type Currencies = {
    base: string;
    date: string;
    rates: Rates;
} | null;

export type Rates = {
    [key: string]: number;
};
