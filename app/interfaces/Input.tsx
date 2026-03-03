export interface Input {
    day: string;
    hours: number;
    startMoneyCents: number;
    endMoneyCents: number;
    startWorkTime: string;
    endWorkTime: string;
    turnoverCents: number;
    turnoverTerminalCents: number;
    dayExpensesCents: number;
}


export interface InputDbDto {
    _id: string;
    inputs: Input[];
}