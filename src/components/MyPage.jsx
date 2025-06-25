import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MyPage({ token, onLogout, onBack }) {
  const [userInfo, setUserInfo] = useState(null);
  const [completedScenarios, setCompletedScenarios] = useState([]);

  useEffect(() => {
    fetchUserInfo();
    fetchCompletedScenarios();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get('http://localhost:8080/mypage', {
        headers: { Authorization: `${token}` },
      });
      setUserInfo(response.data);
    } catch (error) {
      console.error('사용자 정보 가져오기 실패:', error);
    }
  };

  const fetchCompletedScenarios = async () => {
    try {
      const response = await axios.get('http://localhost:8080/scenario/complete', {
        headers: { Authorization: `${token}` },
      });
      setCompletedScenarios(response.data); // 배열로 온다고 가정
    } catch (error) {
      console.error('완료한 시나리오 가져오기 실패:', error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <button
        onClick={onBack}
        style={{
          marginBottom: 15,
          backgroundColor: '#bdc3c7',
          border: 'none',
          borderRadius: 6,
          padding: '6px 12px',
          cursor: 'pointer',
        }}
      >
        ← 메인으로 돌아가기
      </button>

      <h2 style={{ color: '#2c3e50' }}>마이페이지</h2>

      {userInfo ? (
        <div
          style={{
            marginBottom: 20,
            padding: 15,
            backgroundColor: '#f9f9f9',
            borderRadius: 10,
            boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
          }}
        >
          <p style={{ fontSize: 18, fontWeight: '600' }}>사용자: {userInfo.username}</p>
        </div>
      ) : (
        <p>사용자 정보를 불러오는 중...</p>
      )}

      <h3 style={{ color: '#34495e', marginTop: 20 }}>완료한 시나리오</h3>
      {completedScenarios.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {completedScenarios.map((scenario, index) => (
            <li
              key={index}
              style={{
                padding: '10px 15px',
                backgroundColor: '#ecf0f1',
                borderRadius: 6,
                marginBottom: 10,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              {scenario.scenarioName} <br />
              <span style={{ fontSize: 14, color: '#7f8c8d' }}>
                완료일: {new Date(scenario.completedAt).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>완료한 시나리오가 없습니다.</p>
      )}

      <button
        onClick={onLogout}
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
    </div>
  );
}

export default MyPage;
