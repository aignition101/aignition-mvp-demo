import { useState } from "react";

export default function Home() {
  const [selectedAHU, setSelectedAHU] = useState(null);
  const [ahuData, setAhuData] = useState([
    { id: "AHU1", airflow: 12000, temp: 18.5, speed: 0.4 },
    { id: "AHU2", airflow: 18000, temp: 19.1, speed: 0.5 },
    { id: "AHU3", airflow: 23000, temp: 17.8, speed: 0.6 },
    { id: "AHU4", airflow: 20000, temp: 18.0, speed: 0.55 },
    { id: "AHU5", airflow: 15000, temp: 19.3, speed: 0.45 },
  ]);

  const fans = [
    { id: "Fan 1", power: 120, rpm: 1600, status: "正常" },
    { id: "Fan 2", power: 130, rpm: 1650, status: "需注意" },
    { id: "Fan 3", power: 110, rpm: 1580, status: "異常" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "正常":
        return { background: "#d4edda", color: "#155724" };
      case "需注意":
        return { background: "#fff3cd", color: "#856404" };
      case "異常":
        return { background: "#f8d7da", color: "#721c24" };
      default:
        return {};
    }
  };

  const updateSpeed = (index, newSpeed) => {
    const newData = [...ahuData];
    newData[index].speed = newSpeed;
    newData[index].power = Math.round(1000 + newSpeed * 2000); // 功率範圍 1~3kW
    setAhuData(newData);
  };

  return (
    <div style={{ padding: 40, fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: 28, fontWeight: "bold" }}>AIgnition 智慧節能平台</h1>
      {!selectedAHU ? (
        <>
          <h2 style={{ marginTop: 20, marginBottom: 10 }}>設備總覽</h2>
          {ahuData.map((ahu, index) => (
            <div
              key={ahu.id}
              onClick={() => setSelectedAHU(ahu.id)}
              style={{
                border: "1px solid #ccc",
                borderRadius: 8,
                padding: 16,
                marginBottom: 10,
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <p><strong>{ahu.id}</strong></p>
                <p>風量：{ahu.airflow} CMH｜出口溫度：{ahu.temp}°C｜功率：{ahu.power ?? Math.round(1000 + ahu.speed * 2000)} W</p>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={ahu.speed}
                  onChange={(e) => updateSpeed(index, parseFloat(e.target.value))}
                  style={{ width: "100%" }}
                />
              </div>
              <div style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: `conic-gradient(#4caf50 ${ahu.speed * 100 * 3.6}deg, #eee 0deg)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold"
              }}>
                {Math.round(ahu.speed * 100)}%
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          <button onClick={() => setSelectedAHU(null)} style={{ marginBottom: 20 }}>← 返回 AHU 總覽</button>
          <h2>{selectedAHU} 風機明細</h2>
          {fans.map((fan) => {
            const statusStyle = getStatusColor(fan.status);
            return (
              <div
                key={fan.id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 10,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <p><strong>{fan.id}</strong></p>
                  <p>功率：{fan.power} W｜轉速：{fan.rpm} rpm</p>
                </div>
                <span style={{
                  backgroundColor: statusStyle.background,
                  color: statusStyle.color,
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: "bold"
                }}>{fan.status}</span>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
