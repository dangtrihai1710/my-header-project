import React from 'react';
import './App.css';
import { Header1, defaultHeader1 } from './components/header';

function App() {
  const handleNavigate = (href: string) => {
    console.log('Navigate to:', href);
    // Thêm logic navigation thực tế ở đây
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

    </div>
  );
}

export default App;