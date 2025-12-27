import { useState, useEffect } from "react";
import "./WidgetStyles.css";

interface Metric {
  label: string;
  value: string;
  change: number;
  trend: "up" | "down";
  icon: string;
}

interface ChartData {
  label: string;
  value: number;
  color: string;
}

const BusinessDashboard = () => {
  const [metrics, setMetrics] = useState<Metric[]>([
    { label: "Ingresos", value: "$125,430", change: 12.5, trend: "up", icon: "💰" },
    { label: "Ventas", value: "1,234", change: -3.2, trend: "down", icon: "📊" },
    { label: "Usuarios", value: "8,567", change: 8.9, trend: "up", icon: "👥" },
    { label: "Conversión", value: "3.24%", change: 2.1, trend: "up", icon: "🎯" },
  ]);

  const [salesData] = useState<ChartData[]>([
    { label: "Lun", value: 65, color: "var(--text-accent)" },
    { label: "Mar", value: 80, color: "var(--text-accent)" },
    { label: "Mié", value: 45, color: "var(--text-accent)" },
    { label: "Jue", value: 90, color: "var(--text-accent)" },
    { label: "Vie", value: 70, color: "var(--text-accent)" },
    { label: "Sáb", value: 55, color: "var(--text-accent)" },
    { label: "Dom", value: 40, color: "var(--text-accent)" },
  ]);

  const [revenueData] = useState<ChartData[]>([
    { label: "Q1", value: 35, color: "var(--text-accent)" },
    { label: "Q2", value: 50, color: "var(--text-accent)" },
    { label: "Q3", value: 45, color: "var(--text-accent)" },
    { label: "Q4", value: 70, color: "var(--text-gold)" },
  ]);

  const [topProducts] = useState([
    { name: "Producto A", sales: 1234, revenue: "$45,230", growth: 15.2 },
    { name: "Producto B", sales: 987, revenue: "$32,150", growth: 8.5 },
    { name: "Producto C", sales: 756, revenue: "$28,940", growth: -2.3 },
    { name: "Producto D", sales: 654, revenue: "$24,680", growth: 12.1 },
  ]);

  const maxSalesValue = Math.max(...salesData.map((d) => d.value));
  const maxRevenueValue = Math.max(...revenueData.map((d) => d.value));

  return (
    <div className="widget-content dashboard-content">
      <h3 className="widget-title">📈 Dashboard Empresarial</h3>

      {/* Métricas principales */}
      <div className="dashboard-metrics">
        {metrics.map((metric, index) => (
          <div key={index} className="metric-card">
            <div className="metric-header">
              <span className="metric-icon">{metric.icon}</span>
              <span className="metric-label">{metric.label}</span>
            </div>
            <div className="metric-value">{metric.value}</div>
            <div className={`metric-change ${metric.trend}`}>
              <span className="change-icon">
                {metric.trend === "up" ? "📈" : "📉"}
              </span>
              <span>{Math.abs(metric.change)}%</span>
              <span className="change-period">vs mes anterior</span>
            </div>
          </div>
        ))}
      </div>

      {/* Gráficos */}
      <div className="dashboard-charts">
        <div className="chart-container">
          <h4 className="chart-title">📊 Ventas Semanales</h4>
          <div className="bar-chart">
            {salesData.map((data, index) => (
              <div key={index} className="bar-wrapper">
                <div
                  className="bar"
                  style={{
                    height: `${(data.value / maxSalesValue) * 100}%`,
                    backgroundColor: data.color,
                  }}
                  title={`${data.label}: ${data.value}`}
                >
                  <span className="bar-value">{data.value}</span>
                </div>
                <span className="bar-label">{data.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-container">
          <h4 className="chart-title">💰 Ingresos por Trimestre</h4>
          <div className="bar-chart horizontal">
            {revenueData.map((data, index) => (
              <div key={index} className="bar-row">
                <span className="bar-row-label">{data.label}</span>
                <div className="bar-row-container">
                  <div
                    className="bar-row-fill"
                    style={{
                      width: `${(data.value / maxRevenueValue) * 100}%`,
                      backgroundColor: data.color,
                    }}
                  >
                    <span className="bar-row-value">{data.value}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabla de productos */}
      <div className="dashboard-table-container">
        <h4 className="chart-title">🏆 Productos Top</h4>
        <div className="dashboard-table">
          <div className="table-header">
            <div className="table-cell">Producto</div>
            <div className="table-cell">Ventas</div>
            <div className="table-cell">Ingresos</div>
            <div className="table-cell">Crecimiento</div>
          </div>
          {topProducts.map((product, index) => (
            <div key={index} className="table-row">
              <div className="table-cell product-name">{product.name}</div>
              <div className="table-cell">{product.sales.toLocaleString()}</div>
              <div className="table-cell revenue">{product.revenue}</div>
              <div className={`table-cell growth ${product.growth > 0 ? "positive" : "negative"}`}>
                {product.growth > 0 ? "↑" : "↓"} {Math.abs(product.growth)}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resumen rápido */}
      <div className="dashboard-summary">
        <div className="summary-item">
          <span className="summary-label">📅 Período:</span>
          <span className="summary-value">Últimos 30 días</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">🎯 Objetivo:</span>
          <span className="summary-value">$150,000</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">✅ Progreso:</span>
          <span className="summary-value">83.6%</span>
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard;





