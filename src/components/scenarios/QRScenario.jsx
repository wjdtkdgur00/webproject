import React, { useState } from 'react';

const scenarios = [
  {
    id: 1,
    question: '아래와 같은 상황이 발생했습니다. 어떤 행동을 하시겠습니까?',
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/565/565547.png',
    options: [
      {
        id: 'a',
        text: '보안 알림을 받고 즉시 네트워크를 차단한다.',
        nextStepId: 2,
      },
      {
        id: 'b',
        text: '해당 경고 메시지를 무시하고 계속 진행한다.',
        nextStepId: 3,
      },
      {
        id: 'c',
        text: '보안팀에 문의하여 사실 여부를 확인한다.',
        nextStepId: 4,
      },
    ],
  },
  {
    id: 2,
    result: {
      title: '정확한 대응: 네트워크 차단',
      description:
        '• 위협이 감지되었을 때 즉시 네트워크를 차단한 것은 적절한 대응입니다.\n• 추가로 해당 기기의 보안 점검 및 로그 분석을 진행해야 합니다.',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/190/190411.png',
    },
  },
  {
    id: 3,
    result: {
      title: '위험: 경고 무시',
      description:
        '• 경고를 무시하고 계속 진행할 경우, 악성코드 감염 또는 정보 유출 위험이 있습니다.\n• 이후에는 보안팀의 조사를 통해 상황을 파악해야 합니다.',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/833/833472.png',
    },
  },
  {
    id: 4,
    result: {
      title: '적절한 조치: 보안팀에 문의',
      description:
        '• 보안 경고 발생 시 보안팀에 문의하여 사실 여부를 확인한 것은 안전한 조치입니다.\n• 상황에 따라 보안 가이드를 따라 추가 조치를 진행하세요.',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/190/190411.png',
    },
  },
];

function SecurityScenario({ onBack }) {
  const [currentId, setCurrentId] = useState(scenarios[0].id);
  const [result, setResult] = useState(null);

  const current = scenarios.find((step) => step.id === currentId);

  const handleSelect = (option) => {
    const next = scenarios.find((step) => step.id === option.nextStepId);
    if (next?.result) {
      setResult(next.result);
      setCurrentId(null);
    } else {
      setCurrentId(option.nextStepId);
      setResult(null);
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
        ← 목록으로 돌아가기
      </button>

      {!result && current?.question && (
        <>
          <h2 style={{ color: '#2c3e50' }}>보안 위협 시나리오</h2>
          {current.imageUrl && (
            <img
              src={current.imageUrl}
              alt="단계 이미지"
              style={{ width: 80, height: 80, margin: '10px 0' }}
            />
          )}
          <p style={{ fontSize: 18, fontWeight: '600' }}>{current.question}</p>

          <ul style={{ listStyle: 'none', padding: 0 }}>
            {current.options.map((opt) => (
              <li
                key={opt.id}
                onClick={() => handleSelect(opt)}
                style={{
                  margin: '10px 0',
                  padding: '10px 15px',
                  backgroundColor: '#ecf0f1',
                  borderRadius: 6,
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  userSelect: 'none',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#d0d7de')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ecf0f1')}
              >
                <span style={{ fontWeight: 'bold', color: '#2980b9' }}>{opt.id.toUpperCase()}.</span>
                {opt.text}
              </li>
            ))}
          </ul>
        </>
      )}

      {result && (
        <div
          style={{
            marginTop: 20,
            padding: 20,
            backgroundColor: '#f9f9f9',
            borderRadius: 10,
            boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
            textAlign: 'center',
            whiteSpace: 'pre-line',
          }}
        >
          <h3 style={{ color: '#c0392b', marginBottom: 10 }}>{result.title}</h3>
          {result.imageUrl && (
            <img
              src={result.imageUrl}
              alt="결과 이미지"
              style={{ width: 100, height: 100, margin: '15px 0' }}
            />
          )}
          <p style={{ fontSize: 16, marginTop: 10 }}>{result.description}</p>
          <button
            onClick={() => {
              setCurrentId(scenarios[0].id);
              setResult(null);
            }}
            style={{
              marginTop: 20,
              padding: '8px 16px',
              backgroundColor: '#2980b9',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1c5980')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2980b9')}
          >
            처음부터 다시
          </button>
        </div>
      )}
    </div>
  );
}

export default SecurityScenario;
