export interface Wallet {
    name: string;
    money: number; // cents
    date: string;
}

export interface WalletDbDto {
    _id: string;
    history: Wallet[];
}
