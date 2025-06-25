import React, { useState } from 'react';
import axios from 'axios';

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username.trim() || !password) {
      setError('아이디와 비밀번호를 모두 입력하세요.');
      return;
    }

    setError(null);
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8080/auth/login", {
        username,
        password,
      }, {
        withCredentials: true, // ✅ JWT 쿠키 사용 시 필수
      });
      

      const { token, username: returnedUsername } = res.data;

      if (token && returnedUsername) {
        onLogin(token, returnedUsername); // 토큰과 사용자명 전달
      } else {
        setError('로그인 실패: 토큰 또는 사용자명을 받지 못했습니다.');
      }
    } catch (err) {
      console.error('로그인 에러:', err);
      setError('로그인에 실패했습니다. 아이디/비밀번호를 확인하세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: '60px auto',
        padding: 20,
        border: '1px solid #ddd',
        borderRadius: 8,
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>로그인</h2>

      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="아이디"
        autoFocus
        style={{
          width: '100%',
          padding: 10,
          marginBottom: 15,
          borderRadius: 4,
          border: '1px solid #ccc',
          fontSize: 16,
          boxSizing: 'border-box',
        }}
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="비밀번호"
        style={{
          width: '100%',
          padding: 10,
          marginBottom: 15,
          borderRadius: 4,
          border: '1px solid #ccc',
          fontSize: 16,
          boxSizing: 'border-box',
        }}
      />

      <button
        onClick={handleLogin}
        disabled={loading}
        style={{
          width: '100%',
          padding: 12,
          backgroundColor: loading ? '#aaa' : '#3498db',
          border: 'none',
          borderRadius: 4,
          color: '#fff',
          fontWeight: '600',
          fontSize: 16,
          cursor: loading ? 'default' : 'pointer',
          transition: 'background-color 0.3s ease',
        }}
        onMouseEnter={(e) => {
          if (!loading) e.currentTarget.style.backgroundColor = '#2980b9';
        }}
        onMouseLeave={(e) => {
          if (!loading) e.currentTarget.style.backgroundColor = '#3498db';
        }}
      >
        {loading ? '로그인 중...' : '로그인'}
      </button>

      {error && (
        <p style={{ color: 'red', marginTop: 15, textAlign: 'center' }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default LoginPage;
