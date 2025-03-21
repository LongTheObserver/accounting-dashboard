import express from "express";
const router = express.Router();
import { verifyToken } from "../middleware/authMiddleware.js";

router.get("/", verifyToken, (req, res) => {
    res.json({
        invoices: { total: 69, overdue: 33 },
        accountsPayable: 11440,
        overdueAmount: 20130,
        income: 2070,
        bankBalance: 1760,
        receivablePayableTrends: [
            { month: "Sep 2024", accountsReceivable: 216.5, accountsPayable: 124.54 },
            { month: "Oct 2024", accountsReceivable: 2000, accountsPayable: 2850 },
            { month: "Nov 2024", accountsReceivable: 1470, accountsPayable: 586.7 },
            { month: "Dec 2024", accountsReceivable: 2430, accountsPayable: 0 },
        ],
        invoiceStatus: [
            { status: "Authorized", value: 40, color: "#A020F0" },
            { status: "Paid", value: 20, color: "#DA70D6" },
            { status: "Voided", value: 5, color: "#C71585" },
            { status: "Draft", value: 3, color: "#DDA0DD" },
            { status: "Deleted", value: 1, color: "#FFB6C1" },
        ],
        paymentTargets: [
            { range: "1-30", accountsPayable: 4000, accountsReceivable: 1500 },
            { range: "31-60", accountsPayable: 2000, accountsReceivable: 2500 },
            { range: "61-90", accountsPayable: 1500, accountsReceivable: 1200 },
            { range: "Over 90", accountsPayable: 5000, accountsReceivable: 4000 },
        ],
        invoiceDetails: [
            { customer: "ABC Furniture", invoiceNo: "710", dueDate: "12/1/2024", amount: 589, dueSplit: "Over 90" },
            { customer: "Bank West", invoiceNo: "INV-0008", dueDate: "11/3/2024", amount: 767, dueSplit: "Over 90" },
        ],
    });
});

export default router;
