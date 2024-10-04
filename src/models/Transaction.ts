export class Transaction {
    protected id: string;
    amount: number;
    constructor(id: string, amount: number) {
        this.id = id;
        this.amount = amount;
    }
    getId(): string {
        return this.id;
    }
    execute(): void {
        throw new Error("Method not implemented.");
    }
}