import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Nếu có file CSS chung
import App from './App';
import reportWebVitals from './reportWebVitals'; // Nếu có

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Nếu bạn muốn đo performance trong app, truyền vào một function
// để log kết quả (ví dụ: reportWebVitals(console.log))
// hoặc gửi đến analytics endpoint. Tìm hiểu thêm: https://bit.ly/CRA-vitals
// reportWebVitals();