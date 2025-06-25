import React, { useState } from 'react';

const steps = [
  // === STEP 1 ===
  {
    id: 1,
    question: "문자로 “[은행명] 긴급: 당신의 계좌에서 비정상 거래가 탐지되었습니다. 즉시 확인하려면 아래 링크를 클릭하세요”라는 안내가 왔습니다. 어떤 행동을 취하시겠습니까?",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/2921/2921222.png",
    options: [
      { id: 'a', text: "문자의 링크를 바로 클릭하여 접속한다.", nextStepId: 2 },
      { id: 'b', text: "발신번호와 링크 URL을 먼저 꼼꼼히 확인한다.", nextStepId: 3 },
      { id: 'c', text: "문자를 삭제하고 고객센터(공식 번호)로 직접 전화한다.", nextStepId: 4 },
    ],
  },

  // === STEP 2 (a 선택) ===
  {
    id: 2,
    question: "링크를 클릭하여 열린 페이지가 은행 로그인 화면과 동일하게 생겼습니다. URL을 보면 은행 공식 도메인과 비슷하지만 약간 차이가 있습니다(예: ‘bank-secure.com’). 다음 행동은?",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/1006/1006555.png",
    options: [
      { id: 'a', text: "그대로 계정(아이디/비밀번호)을 입력하여 로그인 시도", nextStepId: 5 },
      { id: 'b', text: "URL을 브라우저 주소창에서 다시 한 번 확인하고, HTTPS 자물쇠를 클릭해 인증서를 확인한다.", nextStepId: 6 },
      { id: 'c', text: "화면이 이상하다 판단되어 바로 브라우저를 닫고 금융감독원(금감원)에 신고한다.", nextStepId: 7 },
    ],
  },

  // === STEP 3 (b 선택) ===
  {
    id: 3,
    question: "발신번호가 “+82-1544-8888”(은행 공식 번호)와 다르고, 링크 URL이 ‘http://bit.ly/abcdef’ 형태로 축약 URL입니다. 어떤 행동을 할까요?",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/565/565547.png",
    options: [
      { id: 'a', text: "바로 금융감독원에 신고하고 문자 삭제", nextStepId: 7 },
      { id: 'b', text: "휴대폰 백신 앱으로 스미싱 악성코드를 검사한다", nextStepId: 8 },
      { id: 'c', text: "다른 사람(친구, 가족)에게 이 문자를 전달하여 주의하라고 알린다", nextStepId: 9 },
    ],
  },

  // === STEP 4 (c 선택) ===
  {
    id: 4,
    question: "문자를 삭제하고 고객센터에 직접 전화해 계좌 상태를 확인했습니다. 은행에서는 이상 거래가 없었다고 합니다. 이후에는 어떻게 할까요?",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/1041/1041906.png",
    options: [
      { id: 'a', text: "휴대폰 백신 앱으로 스미싱 악성코드를 정밀 검사한다.", nextStepId: 8 },
      { id: 'b', text: "문자가 너무 많아 흘려 보냈을 수 있으니 비밀번호를 곧바로 변경한다.", nextStepId: 10 },
      { id: 'c', text: "추가 대응 없이 일상 업무로 돌아간다.", nextStepId: 11 },
    ],
  },

  // === STEP 5 (2-a 입력 시도) ===
  {
    id: 5,
    question: null,
    result: {
      title: "위험! 계정·금융 정보 탈취됨",
      description:
        [
          "• 입력한 정보가 스미싱 서버로 전송되어 바로 탈취됩니다.",
          "• 해커가 즉시 계좌에 접근하여 잔액을 인출할 수 있습니다.",
          "• 즉시 해야 할 일:\n  1) 은행 고객센터에 바로 연락해 비밀번호 변경 요청 (긴급잠금).\n  2) 온라인뱅킹 이력에서 이상 출금 내역이 있는지 확인.\n  3) 비밀번호를 복잡하게 변경하고, 타행 이체 이력을 보기 위해 은행 앱의 알림을 활성화.\n  4) 휴대폰에 설치된 보안 앱(안티 바이러스 등)으로 전체 검사.\n  5) 2FA(문자 OTP, 앱 OTP 등)를 즉시 활성화.\n  6) 금감원 및 경찰에 신고하여 피해 신고를 접수.\n  7) 주변인에게 계좌 정보 공유를 제한하고, 신속하게 돈을 안전한 곳으로 이동 시도.",
          "• 향후 대비책:\n  - 발신번호가 은행 공식 번호와 다를 경우 절대 클릭하지 않기.\n  - 은행 앱에서 직접 로그인하여 알림 확인.\n  - 주기적인 보안 교육 및 스미싱 예방법 학습.",
        ].join('\n'),
      imageUrl: "https://cdn-icons-png.flaticon.com/512/833/833472.png",
    },
  },

  // === STEP 6 (2-b 인증서 확인 선택) ===
  {
    id: 6,
    question: "인증서를 확인해 보니, 발급자는 알 수 없는 기관이고, HTTPS는 붙었지만 유효 기간이 이미 만료되었습니다. 다음 행동은?",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/565/565547.png",
    options: [
      { id: 'a', text: "즉시 브라우저를 닫고 금융감독원에 신고한다.", nextStepId: 7 },
      { id: 'b', text: "휴대폰 보안 앱(백신)으로 해당 URL/도메인을 차단한다.", nextStepId: 12 },
      { id: 'c', text: "조금 더 확실하게 확인하려고 페이지를 새로고침한다.", nextStepId: 5 },
    ],
  },

  // === STEP 7 (공통: 신고) ===
  {
    id: 7,
    question: null,
    result: {
      title: "안전한 대응! 즉시 신고",
      description:
        [
          "• 스미싱 문자를 금융감독원(117)에 신고함으로써, 같은 문자를 받은 다른 사람들의 피해를 줄일 수 있습니다.",
          "• 즉시 휴대폰 백신으로 정밀 검사를 실행하여 악성 코드 설치 여부를 확인하세요.",
          "• 스미싱으로 인한 정보 유출 가능성을 대비해 비밀번호를 변경하고, 2FA를 활성화해야 합니다.",
          "• 향후 스미싱 예방:\n  1) 발신번호와 URL을 모르면 절대 클릭하지 말 것.\n  2) 은행 앱에서 직접 확인.\n  3) 정기적으로 스미싱 차단 앱을 업데이트하고 사용.\n  4) 주변인에게도 주기적으로 스미싱 주의 사항을 공유.",
        ].join('\n'),
      imageUrl: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
    },
  },

  // === STEP 8 (3-b 및 4-a 백신 검사) ===
  {
    id: 8,
    question: null,
    result: {
      title: "정밀 검사 완료: 악성코드 없음 또는 제거됨",
      description:
        [
          "• 휴대폰 백신 앱이 스미싱 악성코드를 찾아내 제거했습니다(또는 악성코드가 없음을 확인했습니다).",
          "• 그러나 이미 은행 정보를 입력했을 가능성이 있으므로 비밀번호와 OTP를 즉시 변경하세요.",
          "• 이후 조치:\n  1) 은행 앱에서 출금/이체 내역을 꼼꼼히 확인.\n  2) 2FA(OTP) 활성화.\n  3) 스미싱 차단 및 보안 앱을 항상 최신 버전으로 유지.",
        ].join('\n'),
      imageUrl: "https://cdn-icons-png.flaticon.com/512/841/841364.png",
    },
  },

  // === STEP 9 (3-c 정보 공유) ===
  {
    id: 9,
    question: null,
    result: {
      title: "공유 후 주의: 신고가 우선",
      description:
        [
          "• 주변 사람에게 주의시키는 것은 좋지만, 금융감독원 신고가 보다 우선입니다.",
          "• 만약 링크를 클릭해 악성코드가 설치되었을 수 있으니 백신 검사를 진행해야 합니다.",
          "• 이후 조치:\n  1) 금융감독원/경찰에 스미싱 신고.\n  2) 휴대폰 전체 백신 검사.\n  3) 은행 비밀번호 및 OTP 변경.\n  4) 주변인에게 스미싱 링크를 클릭하지 말라고 다시 한 번 안내.",
        ].join('\n'),
      imageUrl: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
    },
  },

  // === STEP 10 (4-b 비밀번호 변경) ===
  {
    id: 10,
    question: null,
    result: {
      title: "비밀번호 변경: 추후 피해 방지",
      description:
        [
          "• 비밀번호를 즉시 복잡하게 변경하고, OTP(문자 또는 앱 기반)를 활성화하세요.",
          "• 2FA를 설정하면 비밀번호가 탈취돼도 계정 보호가 가능합니다.",
          "• 이후 조치:\n  1) 휴대폰 백신 검사 실행.\n  2) 은행 앱의 알림(출금, 로그인 등) 설정을 켜서 실시간 알림을 받기.",
        ].join('\n'),
      imageUrl: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
    },
  },

  // === STEP 11 (4-c 아무 행동 안함) ===
  {
    id: 11,
    question: null,
    result: {
      title: "주의 필요: 추가 보안 조치 권장",
      description:
        [
          "• 아무 행동 없이 지나갈 경우, 만약 악성코드가 설치되었으면 모르고 넘어갈 수 있습니다.",
          "• 최소한 백신 검사와 비밀번호 변경은 필수입니다.",
          "• 이후 조치:\n  1) 즉시 휴대폰 백신 검사.\n  2) 은행 비밀번호 변경 및 OTP 설정.\n  3) 스미싱 차단 앱 최신화.",
        ].join('\n'),
      imageUrl: "https://cdn-icons-png.flaticon.com/512/748/748113.png",
    },
  },

  // === STEP 12 (6-b 도메인 차단) ===
  {
    id: 12,
    question: null,
    result: {
      title: "도메인 차단: 접속 방지",
      description:
        [
          "• 휴대폰 보안 앱 또는 브라우저 설정에서 해당 도메인을 차단함으로써 다시 접속을 막았습니다.",
          "• 하지만 이미 링크를 클릭했을 가능성이 있으니, 백신 검사 및 비밀번호 변경은 반드시 수행해야 합니다.",
          "• 이후 조치:\n  1) 백신 전체 검사.\n  2) 은행 비밀번호 및 OTP 변경.\n  3) 금융감독원 신고.",
        ].join('\n'),
      imageUrl: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
    },
  },
];


function SmishingScenario({ onBack }) {
  const [currentStepId, setCurrentStepId] = useState(steps[0].id);
  const [result, setResult] = useState(null);

  const currentStep = steps.find((step) => step.id === currentStepId);

  const handleOption = (option) => {
    const nextStep = steps.find((step) => step.id === option.nextStepId);

    if (nextStep && nextStep.result) {
      // 다음 스텝이 결과를 포함하면 결과 표시
      setResult(nextStep.result);
      setCurrentStepId(null);
    } else if (nextStep) {
      // 다음 스텝이 질문이면 진행
      setCurrentStepId(nextStep.id);
      setResult(null);
    } else {
      // 다음 스텝이 없으면 (안전장치)
      setResult(null);
      setCurrentStepId(null);
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

      {!result && currentStep && (
        <>
          <h2 style={{ color: '#2c3e50' }}>스미싱(Smishing) 공격 시나리오</h2>
          {currentStep.imageUrl && (
            <img
              src={currentStep.imageUrl}
              alt="단계 이미지"
              style={{ width: 80, height: 80, margin: '10px 0', objectFit: 'contain' }}
            />
          )}
          <p style={{ fontSize: 18, fontWeight: '600' }}>{currentStep.question}</p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {currentStep.options.map((opt) => (
              <li key={opt.id} style={{ margin: '10px 0' }}>
                <button
                  type="button"
                  onClick={() => handleOption(opt)}
                  style={{
                    width: '100%',
                    padding: '10px 15px',
                    backgroundColor: '#ecf0f1',
                    borderRadius: 6,
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontWeight: '500',
                    userSelect: 'none',
                    border: 'none',
                    textAlign: 'left',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = '#d0d7de')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = '#ecf0f1')
                  }
                >
                  <span style={{ fontWeight: 'bold', color: '#2980b9' }}>
                    {opt.id.toUpperCase()}.
                  </span>
                  {opt.text}
                </button>
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
              style={{ width: 100, height: 100, margin: '15px 0', objectFit: 'contain' }}
            />
          )}
          <p style={{ fontSize: 16, marginTop: 10 }}>{result.description}</p>
          <button
            onClick={() => {
              setCurrentStepId(steps[0].id);
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
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = '#1f618d')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = '#2980b9')
            }
          >
            다시 시작하기
          </button>
        </div>
      )}
    </div>
  );
}

export default SmishingScenario;