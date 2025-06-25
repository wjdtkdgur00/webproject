import React, { useState } from 'react';
import PhishingScenario from './scenarios/PhishingScenario';
import SmishingScenario from './scenarios/SmishingScenario';
import NFCScenario from './scenarios/NFCScenario';
import QRScenario from './scenarios/QRScenario';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import MyPage from './MyPage';  // 마이페이지 import 추가

const scenarioList = [
  { id: 1, title: '피싱(Phishing) 공격 시나리오' },
  { id: 2, title: '스미싱(Smishing) 공격 시나리오' },
  { id: 3, title: 'NFC 결제 악용 시나리오' },
  { id: 4, title: 'QR 코드 피싱 시나리오' },
];

function SecurityScenarioApp() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [selectedId, setSelectedId] = useState(null);
  const [page, setPage] = useState('login'); // login or register
  const [view, setView] = useState('scenarioList'); // 화면 분기 상태: scenarioList, myPage, scenario

  const handleLogin = (receivedToken, receivedUsername) => {
    setToken(receivedToken);
    setUsername(receivedUsername);
    localStorage.setItem('token', receivedToken);
    localStorage.setItem('username', receivedUsername);
  };

  const renderScenarioComponent = () => {
    switch (selectedId) {
      case 1:
        return <PhishingScenario onBack={() => setView('scenarioList')} token={token} />;
      case 2:
        return <SmishingScenario onBack={() => setView('scenarioList')} token={token} />;
      case 3:
        return <NFCScenario onBack={() => setView('scenarioList')} token={token} />;
      case 4:
        return <QRScenario onBack={() => setView('scenarioList')} token={token} />;
      default:
        return null;
    }
  };

  const handleLogout = () => {
    setToken(null);
    setUsername(null);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setSelectedId(null);
    setView('scenarioList');
  };

  if (!token) {
    if (page === 'register') {
      return (
        <RegisterPage
          onRegisterSuccess={() => setPage('login')}
          onBack={() => setPage('login')}
        />
      );
    }
    return (
      <LoginPage
        onLogin={(tkn, user) => {
          handleLogin(tkn, user);
          setView('scenarioList');
        }}
        onMoveToRegister={() => setPage('register')}
      />
    );
  }

  return (
    <div style={{ maxWidth: 700, margin: 'auto', padding: 20 }}>
      {view === 'scenarioList' && (
        <>
          <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>
            {username ? `${username}님, 환영합니다!` : '보안 위험 시나리오 체험'}
          </h1>

          <button
            onClick={() => setView('myPage')}
            style={{
              marginBottom: 15,
              backgroundColor: '#27ae60',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '8px 16px',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1e8449')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#27ae60')}
          >
            마이페이지
          </button>

          <ul style={{ listStyle: 'none', padding: 0 }}>
            {scenarioList.map((s) => (
              <li
                key={s.id}
                onClick={() => {
                  setSelectedId(s.id);
                  setView('scenario');
                }}
                style={{
                  margin: '10px 0',
                  padding: '15px 20px',
                  backgroundColor: '#3498db',
                  color: '#fff',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontWeight: '600',
                  textAlign: 'center',
                  boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2980b9')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#3498db')}
              >
                {s.title}
              </li>
            ))}
          </ul>

          <button
            onClick={handleLogout}
            style={{
              marginTop: 30,
              padding: '8px 16px',
              backgroundColor: '#e74c3c',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#c0392b')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#e74c3c')}
          >
            로그아웃
          </button>
        </>
      )}

      {view === 'myPage' && (
        <MyPage
          token={token}
          onLogout={handleLogout}
          onBack={() => setView('scenarioList')}
        />
      )}

      {view === 'scenario' && renderScenarioComponent()}
    </div>
  );
}

export default SecurityScenarioApp;
