export type Currencies = {
    base: string;
    date: string;
    rates: Record<string, number>;
} | null;

export type CurrenciesObject = {
    $secondaryCurrency: string;
    $baseCurrency: string;
};

export type CurrenciesContainer = {
    $baseAmount: number;
    $secondaryCurrency: string;
    $currencies: Currencies | null;
};
