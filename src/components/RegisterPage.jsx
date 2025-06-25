// src/components/RegisterPage.jsx
import React, { useState } from 'react';
import axios from 'axios';

function RegisterPage({ onRegisterSuccess, onBack }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!username.trim() || !password || !confirmPassword) {
      setError('모든 항목을 입력하세요.');
      return;
    }
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    setError(null);
    setLoading(true);
    try {
      await axios.post('http://localhost:8080/auth/register', {
        username,
        password,
      });

      alert('회원가입 성공! 로그인 페이지로 이동합니다.');
      onRegisterSuccess(); // 로그인 페이지로 이동
    } catch (err) {
      console.error('회원가입 에러:', err);
      setError('회원가입에 실패했습니다. 아이디가 중복되었을 수 있습니다.');
    } finally {
      setLoading(false);
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
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>회원가입</h2>

      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="아이디"
        autoFocus
        style={{
          width: '100%',
          padding: 10,
          marginBottom: 15,
          borderRadius: 4,
          border: '1px solid #ccc',
          fontSize: 16,
        }}
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
        style={{
          width: '100%',
          padding: 10,
          marginBottom: 15,
          borderRadius: 4,
          border: '1px solid #ccc',
          fontSize: 16,
        }}
      />

      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="비밀번호 확인"
        style={{
          width: '100%',
          padding: 10,
          marginBottom: 15,
          borderRadius: 4,
          border: '1px solid #ccc',
          fontSize: 16,
        }}
      />

      <button
        onClick={handleRegister}
        disabled={loading}
        style={{
          width: '100%',
          padding: 12,
          backgroundColor: loading ? '#aaa' : '#2ecc71',
          border: 'none',
          borderRadius: 4,
          color: '#fff',
          fontWeight: '600',
          fontSize: 16,
          cursor: loading ? 'default' : 'pointer',
        }}
      >
        {loading ? '가입 중...' : '회원가입'}
      </button>

      <button
        onClick={onBack}
        style={{
          marginTop: 10,
          width: '100%',
          padding: 10,
          backgroundColor: '#bdc3c7',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
        }}
      >
        ← 로그인 페이지로 돌아가기
      </button>

      {error && (
        <p style={{ color: 'red', marginTop: 15, textAlign: 'center' }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default RegisterPage;
