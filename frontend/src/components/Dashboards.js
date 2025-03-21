import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, BarChart, Bar } from "recharts";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const REACT_APP_API_URL = "http://localhost:5000/api"

const Dashboard = () => {
    const navigate = useNavigate();
    const [data, setDashboardData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login"); // Redirect if no token
            return;
        }

        fetch(`${REACT_APP_API_URL}/dashboard`, {
            headers: { 
                Authorization: token ? `Bearer ${token}` : "", 
                "Content-Type": "application/json" 
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error("Unauthorized");
                return res.json();
            })
            .then((data) => setDashboardData(data))
            .catch(() => navigate("/login")); // Redirect on error
    }, [navigate]);

    if (!data) return <p>Loading...</p>;

    return (
        <div className="dashboard-container">
            {/* Top Summary Section */}
            <div className="summary-grid">
                <div className="summary-box"><h3>Invoices</h3><p>{data.invoices.total} Total / {data.invoices.overdue} Overdue</p></div>
                <div className="summary-box"><h3>Accounts Payable</h3><p>${data.accountsPayable}</p></div>
                <div className="summary-box"><h3>Overdue Amount</h3><p>${data.overdueAmount}</p></div>
                <div className="summary-box"><h3>Income</h3><p>${data.income}</p></div>
                <div className="summary-box"><h3>Bank Balance</h3><p>${data.bankBalance}</p></div>
            </div>

            {/* Charts Section */}
            <div className="charts-grid">
                <div className="chart-box">
                    <h3>Accounts Receivable and Payable Over Time</h3>
                    <LineChart width={350} height={250} data={data.receivablePayableTrends}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="accountsReceivable" stroke="green" />
                        <Line type="monotone" dataKey="accountsPayable" stroke="red" />
                    </LineChart>
                </div>

                <div className="chart-box">
                    <h3>Invoices by Status</h3>
                    <PieChart width={300} height={300}>
                        <Pie data={data.invoiceStatus} dataKey="value" nameKey="status" cx="65%" cy="45%" outerRadius={100}>
                            {data.invoiceStatus.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Legend align="center" layout="radial"/>
                        <Tooltip />
                    </PieChart>
                </div>

                <div className="chart-box">
                    <h3>Accounts Payable and Receivable by Payment Target</h3>
                    <BarChart width={350} height={250} data={data.paymentTargets}>
                        <XAxis dataKey="range" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="accountsPayable" fill="blue" />
                        <Bar dataKey="accountsReceivable" fill="orange" />
                    </BarChart>
                </div>
            </div>

            {/* Invoice Table */}
            <div className="table-container">
                <h3>Invoice Due Details by Customer</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Invoice No.</th>
                            <th>Due Date</th>
                            <th>Amount (USD)</th>
                            <th>Due Split</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.invoiceDetails.map((invoice, index) => (
                            <tr key={index}>
                                <td>{invoice.customer}</td>
                                <td>{invoice.invoiceNo}</td>
                                <td>{invoice.dueDate}</td>
                                <td>${invoice.amount}</td>
                                <td className={invoice.dueSplit === "Over 90" ? "overdue" : ""}>{invoice.dueSplit}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;