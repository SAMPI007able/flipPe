import { PaymentApp } from "./PaymentApp";
import { Account } from "./models/Account";
const paymentApp = new PaymentApp();
const userOneId = paymentApp.addUser("Arnab", "arnab@gmail.com");
const userTwoId = paymentApp.addUser("John", "john@gmail.com");
const userOneAccount: Account | undefined = paymentApp.accounts.get(userOneId);
const userTwoAccount: Account | undefined = paymentApp.accounts.get(userTwoId);
if(userTwoAccount && userOneAccount) {
    userOneAccount.addAmount(1000);
    paymentApp.makePayment(userOneAccount, userTwoAccount, 100);
    paymentApp.makePayment(userOneAccount, userTwoAccount, 200);
    paymentApp.makePayment(userOneAccount, userTwoAccount, 300);
    paymentApp.makePayment(userOneAccount, userTwoAccount, 400);
    
    paymentApp.makePayment(userTwoAccount, userOneAccount, 200);
    console.log(paymentApp.getTransactions(userTwoAccount.getId()));
}