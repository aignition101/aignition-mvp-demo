export default function Home() {
  const fans = [
    { id: 1, name: "風機 #1", status: "正常", temperature: 45, airflow: 3200, power: 120 },
    { id: 2, name: "風機 #2", status: "需注意", temperature: 61, airflow: 2900, power: 135 },
    { id: 3, name: "風機 #3", status: "異常", temperature: 70, airflow: 2500, power: 160 },
  ];
  return (
       
    <div style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <img
      src="/AIgnition-logo.png"
      alt="AIgnition Logo"
      style={{ width: "220px", marginBottom: "20px" }}
      />
      <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>AIgnition 智慧節能平台</h1>
      <p style={{ marginBottom: "20px" }}>這是智慧風機平台的原型介面展示</p>

      <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
        <div style={{ background: "#e6f4ea", padding: "20px", borderRadius: "10px" }}>
          <p style={{ fontSize: "14px", color: "#666" }}>本月節電（kWh）</p>
          <p style={{ fontSize: "20px", color: "#1a7f37", fontWeight: "bold" }}>6,450</p>
        </div>
        <div style={{ background: "#e3f0fa", padding: "20px", borderRadius: "10px" }}>
          <p style={{ fontSize: "14px", color: "#666" }}>碳排減量（kg CO₂）</p>
          <p style={{ fontSize: "20px", color: "#0a558c", fontWeight: "bold" }}>3,220</p>
        </div>
        <div style={{ background: "#fbe9e9", padding: "20px", borderRadius: "10px" }}>
          <p style={{ fontSize: "14px", color: "#666" }}>AI 預警提醒</p>
          <p style={{ fontSize: "20px", color: "#b20000", fontWeight: "bold" }}>風機 #3 風阻異常</p>
        </div>
      </div>

      <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>即時設備狀態</h2>
      {fans.map((fan) => (
        <div key={fan.id} style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          marginBottom: "10px"
        }}>
          <div>
            <p style={{ fontWeight: "bold", margin: 0 }}>{fan.name}</p>
            <p style={{ fontSize: "14px", margin: 0 }}>
              風量: {fan.airflow} CMH｜功率: {fan.power} W｜溫度: {fan.temperature}°C
            </p>
          </div>
          <span style={{
            background:
              fan.status === "正常" ? "#d4edda" :
              fan.status === "需注意" ? "#fff3cd" :
              "#f8d7da",
            color:
              fan.status === "正常" ? "#155724" :
              fan.status === "需注意" ? "#856404" :
              "#721c24",
            padding: "6px 12px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "bold"
          }}>
            {fan.status}
          </span>
        </div>
      ))}
    </div>
  );
}
