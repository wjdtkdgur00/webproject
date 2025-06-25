import React, { useState } from 'react';
import PhishingScenario from './scenarios/PhishingScenario';
import SmishingScenario from './scenarios/SmishingScenario';
import NFCScenario from './scenarios/NFCScenario';
import QRScenario from './scenarios/QRScenario';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

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

  const handleLogin = (receivedToken, receivedUsername) => {
    setToken(receivedToken);
    setUsername(receivedUsername);
    localStorage.setItem('token', receivedToken);
    localStorage.setItem('username', receivedUsername);
  };

  const renderScenarioComponent = () => {
    switch (selectedId) {
      case 1:
        return <PhishingScenario onBack={() => setSelectedId(null)} token={token} />;
      case 2:
        return <SmishingScenario onBack={() => setSelectedId(null)} token={token} />;
      case 3:
        return <NFCScenario onBack={() => setSelectedId(null)} token={token} />;
      case 4:
        return <QRScenario onBack={() => setSelectedId(null)} token={token} />;
      default:
        return null;
    }
  };

  // 로그인 상태 아닐 때: 페이지 선택
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
        onLogin={handleLogin}
        onMoveToRegister={() => setPage('register')}
      />
    );
  }

  // 로그인 성공 시 시나리오 선택 화면
  return (
    <div style={{ maxWidth: 700, margin: 'auto', padding: 20 }}>
      {!selectedId ? (
        <>
          <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>
            {username ? `${username}님, 환영합니다!` : '보안 위험 시나리오 체험'}
          </h1>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {scenarioList.map((s) => (
              <li
                key={s.id}
                onClick={() => setSelectedId(s.id)}
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
        </>
      ) : (
        <div>{renderScenarioComponent()}</div>
      )}
    </div>
  );
}

export default SecurityScenarioApp;
