import { useState } from "react";

export default function Home() {
  const [selectedAHU, setSelectedAHU] = useState(null);
  const [ahuData, setAhuData] = useState([
    { id: "AHU1", airflow: 12000, temp: 18.5, speed: 0.4, fanCount: 3 },
    { id: "AHU2", airflow: 18000, temp: 19.1, speed: 0.5, fanCount: 3 },
    { id: "AHU3", airflow: 23000, temp: 17.8, speed: 0.6, fanCount: 5 },
    { id: "AHU4", airflow: 20000, temp: 18.0, speed: 0.55, fanCount: 5 },
    { id: "AHU5", airflow: 15000, temp: 19.3, speed: 0.45, fanCount: 2 },
    { id: "AHU6", airflow: 16000, temp: 18.8, speed: 0.35, fanCount: 2 },
  ]);

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
    setAhuData(newData);
  };

  return (
    <div style={{ padding: 40, fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: 28, fontWeight: "bold" }}>AIgnition 智慧節能平台</h1>
      {!selectedAHU ? (
        <>
          <h2 style={{ marginTop: 20, marginBottom: 10 }}>設備總覽</h2>
          {ahuData.map((ahu, index) => {
            const ahuPower = Math.round(ahu.speed * 4450 * ahu.fanCount);
            return (
              <div
                key={ahu.id}
                onClick={() => setSelectedAHU(index)}
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
                  <p>轉速比：{Math.round(ahu.speed * 100)}%｜風量：{ahu.airflow} CMH｜出口溫度：{ahu.temp}°C</p>
                  <p>功率：{ahuPower} W｜狀態：正常</p>
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
            );
          })}
        </>
      ) : (
        <>
          <button onClick={() => setSelectedAHU(null)} style={{ marginBottom: 20 }}>← 返回 AHU 總覽</button>
          <h2>{ahuData[selectedAHU].id} 風機明細</h2>
          {[...Array(ahuData[selectedAHU].fanCount)].map((_, i) => {
            const rpm = Math.round(ahuData[selectedAHU].speed * 2480);
            const power = Math.round(ahuData[selectedAHU].speed * 4450);
            const status = i % 3 === 0 ? "正常" : i % 3 === 1 ? "需注意" : "異常";
            const hours = Math.floor(500 + Math.random() * 1500);
            const statusStyle = getStatusColor(status);
            return (
              <div
                key={`fan-${i}`}
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
                  <p><strong>Fan {i + 1}</strong></p>
                  <p>型號：K3G450PA3103｜轉速：{rpm} rpm｜功率：{power} W｜運轉時間：{hours} 小時</p>
                </div>
                <span style={{
                  backgroundColor: statusStyle.background,
                  color: statusStyle.color,
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: "bold"
                }}>{status}</span>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
