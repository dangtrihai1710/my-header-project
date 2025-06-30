import React from 'react';
import './App.css';
import { Header1, defaultHeader1 } from './components/header';

function App() {
  const handleNavigate = (href: string) => {
    console.log('Navigate to:', href);
  };

  return (
    <div className="App">
      <Header1
        visible={true}
        settings={{
          ...defaultHeader1.settings,
          title: "Test Header",
          placeholderSearchBar: "Tìm kiếm..."
        }}
        cartLength={3}
        navigate={handleNavigate}
      />
      <div style={{ padding: '20px' }}>
        <h1>Header Component Test</h1>
        <p>Header đang hiển thị ở trên!</p>
      </div>
    </div>
  );
}

export default App;