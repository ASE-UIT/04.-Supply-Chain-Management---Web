import MainApiRequest from '@/redux/apis/MainApiRequest';
import { Card, Divider } from 'antd';
import { Chart, ChartType, registerables } from 'chart.js';
import { useEffect, useState } from 'react';
import "./Report.scss";
import { moneyFormatter } from '@/utils/string';

Chart.register(...registerables);

const Report = () => {
    const [apiData, setApiData] = useState<any>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await MainApiRequest.get("/system/report");
                setApiData(res.data);
            } catch (error) {
                console.error("Failed to fetch report data:", error);
            }
        };

        fetchData();
    }, []);

    const renderChart = (id: string, type: ChartType, data: any, options = {}) => {
        const ctx = document.getElementById(id) as HTMLCanvasElement;
        if (ctx) {
            return new Chart(ctx, {
                type,
                data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    ...options,
                },
            });
        }
    };

    useEffect(() => {
        if (Object.keys(apiData).length === 0) return;

        // Total Order and Total Confirmed Order Value Percentage (Bar Chart)
        const orderChart = renderChart('orderChart', 'bar', {
            labels: ['Order Metrics'],
            datasets: [
                {
                    label: 'Total Order',
                    data: [apiData?.crmReport?.totalOrder || 0],
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                },
                {
                    label: 'Total Confirmed',
                    data: [apiData?.crmReport?.totalConfirmedOrder || 0],
                    backgroundColor: 'rgba(153, 102, 255, 0.6)',
                },
            ],
        });

        const orderValueChart = renderChart('orderValueChart', 'bar', {
            labels: ['Order Metrics'],
            datasets: [
                {
                    label: 'Total Order Value',
                    data: [apiData?.crmReport?.totalOrderValue || 0],
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                },
                {
                    label: 'Total Confirmed Value',
                    data: [apiData?.crmReport?.totalConfirmedOrderValue || 0],
                    backgroundColor: 'rgba(153, 102, 255, 0.6)',
                },
            ],
        });

        const orderValuePercentageChart = renderChart('orderValuePercentageChart', 'doughnut', {
            labels: ['Total Order Value', 'Total Confirmed Value'],
            datasets: [
                {
                    data: [apiData?.crmReport?.totalOrderValue || 0, apiData?.crmReport?.totalConfirmedOrderValue || 0],
                    backgroundColor: ['#4BC0C0', '#FF9F40'],
                },
            ],
        });

        // Customer Type Percentage (Pie Chart)
        const customerTypeChart = renderChart('customerTypeChart', 'pie', {
            labels: apiData?.crmReport?.customerTypePercentage.map((item: any) => item.type),
            datasets: [
                {
                    data: apiData?.crmReport?.customerTypePercentage.map((item: any) => item.percentage),
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                },
            ],
        });

        // Driver License Type Percentage (Doughnut Chart)
        const driverLicenseChart = renderChart('driverLicenseChart', 'doughnut', {
            labels: apiData?.logisticReport?.driverLicenseTypePercentage.map((item: any) => item.licenseType),
            datasets: [
                {
                    data: apiData?.logisticReport?.driverLicenseTypePercentage.map((item: any) => item.percentage),
                    backgroundColor: ['#4BC0C0', '#FF9F40', '#FF6384'],
                },
            ],
        });

        // Vehicle Type Percentage (Bar Chart)
        const vehicleTypeChart = renderChart('vehicleTypeChart', 'bar', {
            labels: apiData?.logisticReport?.vehicleTypePercentage.map((item: any) => item.type),
            datasets: [
                {
                    label: 'Percentage',
                    data: apiData?.logisticReport?.vehicleTypePercentage.map((item: any) => item.percentage),
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                },
            ],
        });

        // Partner Type Percentage (Pie Chart)
        const partnerTypeChart = renderChart('partnerTypeChart', 'pie', {
            labels: apiData?.systemReport?.partnerTypePercentage.map((item: any) => item.type),
            datasets: [
                {
                    data: apiData?.systemReport?.partnerTypePercentage.map((item: any) => item.percentage),
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                },
            ],
        });

        return () => {
            orderChart?.destroy();
            customerTypeChart?.destroy();
            orderValuePercentageChart?.destroy();
            orderValueChart?.destroy();
            driverLicenseChart?.destroy();
            vehicleTypeChart?.destroy();
            partnerTypeChart?.destroy();
        };
    }, [apiData]);

    return (
        <div className="m-4">
            <h3>Report</h3>
            <hr />
            <div className="row">
                {/* Total Order and Total Confirmed Order Value Percentage */}
                <div className="col-4">
                    <div className="card shadow analytics-gradient-1 mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Total warehouse</h5>
                            <h1 id="totalWarehouse">{apiData?.warehouseReport?.totalWarehouse || "0"}</h1>
                        </div>
                    </div>
                    <div className="card shadow analytics-gradient-2 mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Total In Stock</h5>
                            <h1 id="totalInStock">{apiData?.warehouseReport?.totalInStock || "0"}</h1>
                        </div>
                    </div>
                    <div className="card shadow analytics-gradient-3 mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Total Import Value</h5>
                            <h1 id="totalImportValue">{moneyFormatter(apiData?.warehouseReport?.totalImportValue || 0)}</h1>
                        </div>
                    </div>
                    <div className="card shadow analytics-gradient-4 mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Total Export Value</h5>
                            <h1 id="totalExportValue">{moneyFormatter(apiData?.warehouseReport?.totalExportValue || 0)}</h1>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <h4>Order Count</h4>
                    <div style={{ width: '100%', maxHeight: '500px' }}>
                        <canvas id="orderChart"></canvas>
                    </div>
                    <h4>Order Value</h4>
                    <div style={{ width: '100%', maxHeight: '500px' }}>
                        <canvas id="orderValueChart"></canvas>
                    </div>
                    <h4>Vehicle Type</h4>
                    <div style={{ width: '100%', maxHeight: '500px' }}>
                        <canvas id="vehicleTypeChart"></canvas>
                    </div>
                </div>
                <div className="col-4">
                    <h4>Coverage</h4>
                    <div style={{ width: '100%', maxHeight: '500px' }}>
                        <canvas id="orderValuePercentageChart"></canvas>
                    </div>
                </div>
            </div>
            <hr />
            <div style={{ height: 50 }}></div>
            <div className="row mt-4">
                {/* Customer Type Percentage */}
                <div className="col-4">
                    <h4>CRM</h4>
                    <div style={{ width: '100%', maxHeight: '300px' }}>
                        <canvas id="customerTypeChart"></canvas>
                    </div>
                </div>
                {/* Driver License Type Percentage */}
                <div className="col-4">
                    <h4>License Type</h4>
                    <div style={{ width: '100%', maxHeight: '300px' }}>
                        <canvas id="driverLicenseChart"></canvas>
                    </div>
                </div>
                {/* Partner Type Percentage */}
                <div className="col-4">
                    <h4>Partner</h4>
                    <div style={{ width: '100%', maxHeight: '300px' }}>
                        <canvas id="partnerTypeChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Report;
