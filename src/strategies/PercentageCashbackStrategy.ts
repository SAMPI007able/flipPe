import { CashbackStrategy } from "./CashbackStrategy";

export class PercentageCashbackStrategy extends CashbackStrategy {
    private percentage: number;
    constructor(percentage: number) {
        super();
        this.percentage = percentage;
    }
    execute(amount: number): number {
        return amount * (this.percentage / 100);
    }
}