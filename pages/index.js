import { useState } from "react";

export default function Home() {
  const [selectedAHU, setSelectedAHU] = useState(null);

  const ahus = [
    { id: "AHU1", airflow: 5200, temp: 18.5, power: 340, speed: 0.4 },
    { id: "AHU2", airflow: 4800, temp: 19.1, power: 360, speed: 0.5 },
    { id: "AHU3", airflow: 6100, temp: 17.8, power: 390, speed: 0.6 },
    { id: "AHU4", airflow: 5700, temp: 18.0, power: 350, speed: 0.55 },
    { id: "AHU5", airflow: 5300, temp: 19.3, power: 345, speed: 0.45 },
  ];

  const fans = [
    { id: "Fan 1", power: 120, rpm: 1600, status: "正常" },
    { id: "Fan 2", power: 130, rpm: 1650, status: "需注意" },
    { id: "Fan 3", power: 110, rpm: 1580, status: "異常" },
  ];

  return (
    <div style={{ padding: 40, fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: 28, fontWeight: "bold" }}>AIgnition 智慧節能平台</h1>
      {!selectedAHU ? (
        <>
          <h2 style={{ marginTop: 20, marginBottom: 10 }}>設備總覽</h2>
          {ahus.map((ahu) => (
            <div
              key={ahu.id}
              onClick={() => setSelectedAHU(ahu.id)}
              style={{
                border: "1px solid #ccc",
                borderRadius: 8,
                padding: 16,
                marginBottom: 10,
                cursor: "pointer",
              }}
            >
              <p><strong>{ahu.id}</strong></p>
              <p>風量：{ahu.airflow} CMH｜出口溫度：{ahu.temp}°C｜功率：{ahu.power} W</p>
              <p>轉速比：{Math.round(ahu.speed * 100)}%</p>
            </div>
          ))}
        </>
      ) : (
        <>
          <button onClick={() => setSelectedAHU(null)} style={{ marginBottom: 20 }}>← 返回 AHU 總覽</button>
          <h2>{selectedAHU} 風機明細</h2>
          {fans.map((fan) => (
            <div
              key={fan.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: 8,
                padding: 12,
                marginBottom: 10,
              }}
            >
              <p><strong>{fan.id}</strong></p>
              <p>功率：{fan.power} W｜轉速：{fan.rpm} rpm｜狀態：{fan.status}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

