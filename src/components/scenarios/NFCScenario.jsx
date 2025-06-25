import React, { useState } from 'react';

const steps = [
  // === STEP 1 ===
  {
    id: 1,
    question: "카페에서 직원이 “휴대폰을 저 NFC 리더기에 갖다 대시면 바로 결제됩니다”라고 안내합니다. 어떤 행동을 하시겠습니까?",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/1046/1046682.png",
    options: [
      { id: 'a', text: "직원이 제시한 NFC 리더기에 바로 휴대폰을 갖다 댄다.", nextStepId: 2 },
      { id: 'b', text: "내 스마트폰에 내장된 은행 공식 앱을 열어 직접 결제 옵션을 선택한다.", nextStepId: 3 },
      { id: 'c', text: "다른 결제 수단(카드 또는 QR)으로 결제한다.", nextStepId: 4 },
    ],
  },

  // === STEP 2 (a 선택) ===
  {
    id: 2,
    question: "리더기에 태그하니, 화면에 결제 금액(₩5,000)이 표시되고 “인증을 위해 PIN 입력” 안내가 나옵니다. 어떤 행동을 할까요?",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/1006/1006555.png",
    options: [
      { id: 'a', text: "PIN을 입력해 결제를 진행한다.", nextStepId: 5 },
      { id: 'b', text: "금액은 매장 메뉴와 달라 보여서 즉시 해당 URL을 닫고 직원에게 문의한다.", nextStepId: 6 },
      { id: 'c', text: "핸드폰을 빼고 방금 태그했던 리더기를 자세히 살핀다.", nextStepId: 7 },
    ],
  },

  // === STEP 3 (b 선택) ===
  {
    id: 3,
    question: "은행 공식 앱을 열어 NFC 결제 메뉴를 누르니, 정상적으로 카드가 인식되어 ₩5,000 결제 준비 중입니다. 이후 행동은?",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/565/565547.png",
    options: [
      { id: 'a', text: "앱에서 결제 내역(상세 메타 정보 포함)을 확인하고 결제를 진행한다.", nextStepId: 8 },
      { id: 'b', text: "앱에서 결제 마법사가 열리면 “영수증 요청”을 눌러 결제 이력을 받아두고 나간다.", nextStepId: 9 },
    ],
  },

  // === STEP 4 (c 선택) ===
  {
    id: 4,
    question: "카드/QR 결제를 선택했습니다. 그 다음 행동은?",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/1041/1041906.png",
    options: [
      { id: 'a', text: "클릭 한 번으로 결제되는 QR 방식을 사용한다.", nextStepId: 10 },
      { id: 'b', text: "직접 카드를 건네주고 PIN(또는 서명) 후 결제한다.", nextStepId: 11 },
    ],
  },

  // === STEP 5 (2-a PIN 입력) ===
  {
    id: 5,
    question: null,
    result: {
      title: "위험! 악성 NFC 스키머에 카드 정보 탈취",
      description:
        [
          "• 정식 매장 POS가 아닌 무명 NFC 리더기에 태그하여, 악성 기기에 카드 정보가 복제됩니다.",
          "• PIN까지 입력되었으므로 해커는 즉시 카드 복제본과 무단 결제를 시도할 수 있습니다.",
          "• 즉시 해야 할 일:\n  1) 카드사 고객센터에 바로 연락해 해당 카드 정지를 요청하세요.\n  2) 의심 거래 내역이 있는지 온라인 뱅킹 앱에서 확인하세요.\n  3) 새 카드를 발급받고, 현재 카드 관련 자동이체 내역을 모두 점검하세요.\n  4) 향후 NFC 결제 시에는 반드시 공식 앱을 사용하거나, 매장 리더기가 정품임을 직접 확인하세요.",
          "• 추가 대책:\n  - 카드 정보가 저장된 디지털 지갑 기능을 사용할 때는 잠금 설정(생체인식, PIN)을 반드시 켜두세요.\n  - 정기적으로 카드 사용 알림(앱 푸시, 문자)을 활성화해 즉시 확인하세요.",
        ].join('\n'),
      imageUrl: "https://cdn-icons-png.flaticon.com/512/833/833472.png",
    },
  },

  // === STEP 6 (2-b 직원 문의) ===
  {
    id: 6,
    question: null,
    result: {
      title: "올바른 대응: 즉시 확인 후 차단",
      description:
        [
          "• 결제 금액이 메뉴 가격과 다르므로 의심하여 즉시 문의한 것은 최선의 행동입니다.",
          "• 매장 직원에게 결제 과정이 안전한지 재확인하세요. 매장 POS가 정품인지 직접 눈으로 확인할 수 있다면 더욱 안전합니다.",
          "• 이후 대책:\n  1) 정식 POS 기기(가맹점 등록번호, 사업자 번호 등)를 확인한 뒤 결제하세요.\n  2) 카드 결제 시 영수증(매출전표)을 꼭 받아서 보관하세요.\n  3) NFC 결제를 직접 할 때는 공식 은행 앱을 열어 인증 과정을 거치세요.",
        ].join('\n'),
      imageUrl: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
    },
  },

  // === STEP 7 (2-c 리더기 살핌) ===
  {
    id: 7,
    question: null,
    result: {
      title: "주의 깊은 관찰: 리더기 확인 필요",
      description:
        [
          "• 리더기를 자세히 보니, 매장 POS 로고 대신 무명 스티커가 붙어 있었습니다. 악성 기기로 의심됩니다.",
          "• 즉시 NFC 결제를 중단하고 카드를 꺼낸 뒤 NFC 결제 기능을 비활성화하세요.",
          "• 이후 대책:\n  1) 카드사 고객센터에 카드 차단을 요청하고, 결제 기록을 확인하세요.\n  2) 매장 측에 피해 사실을 알리고, 매장 관리자에게 허가된 POS인지 확인 요청하세요.\n  3) 카드 결제 시 반드시 카드를 직접 건네거나, 신뢰할 수 있는 QR 결제 방식을 사용하세요.",
        ].join('\n'),
      imageUrl: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
    },
  },

  // === STEP 8 (3-a 공식 앱 결제) ===
  {
    id: 8,
    question: null,
    result: {
      title: "안전한 결제 완료",
      description:
        [
          "• 공식 은행 앱을 통해 NFC 결제했으므로, 결제 과정이 안전하게 암호화되었습니다.",
          "• 결제 이력을 즉시 확인하고, 푸시 알림/문자 알림을 통해 거래가 올바르게 처리되었는지 확인하세요.",
          "• 이후 대책:\n  1) 영수증(전자영수증 포함)을 반드시 보관하세요.\n  2) 카드사 앱에서 알림 설정을 켜 두어 실시간으로 출금 내역을 확인하세요.\n  3) 주기적으로 카드 사용 내역을 점검하여 이상 거래 여부를 체크하세요.",
        ].join('\n'),
      imageUrl: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
    },
  },

  // === STEP 9 (3-b 영수증 요청) ===
  {
    id: 9,
    question: null,
    result: {
      title: "영수증 보관: 거래 안전성 확보",
      description:
        [
          "• 영수증을 받아두면, 추후 오인 결제가 발생했을 때 근거 자료로 활용할 수 있습니다.",
          "• 결제 내역과 실제 금액이 일치하는지 반드시 확인하세요.",
          "• 이후 대책:\n  1) 매장에서도 영수증을 찍어 보관하는 것이 좋습니다.\n  2) 카드 사용 앱의 알림을 켜고, 출금 시 실시간 확인을 하세요.\n  3) 결제 후 한 달 이내에 이상 거래가 있으면 카드사 분쟁조정을 신청하세요.",
        ].join('\n'),
      imageUrl: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
    },
  },

  // === STEP 10 (4-a QR 결제) ===
  {
    id: 10,
    question: null,
    result: {
      title: "추가 행동 필요: QR 결제 주의",
      description:
        [
          "• QR 방식도 가짜 QR 코드가 붙어있으면 피싱 페이지로 유도될 수 있습니다.",
          "• 반드시 QR 코드 옆에 붙은 URL을 눈으로 직접 확인하고, https 도메인이 매장 공식인지 확인하세요.",
          "• 이후 대책:\n  1) QR 결제 시 화면의 URL이 정확한지, 도메인 위치가 올바른지 항상 확인하세요.\n  2) 결제 후 앱 푸시/문자로 알림을 받아서 거래 내역을 즉시 확인하세요.\n  3) 이상 출금 알림이 오면 바로 카드사에 문의하세요.",
        ].join('\n'),
      imageUrl: "https://cdn-icons-png.flaticon.com/512/748/748113.png",
    },
  },

  // === STEP 11 (4-b 직접 카드 결제) ===
  {
    id: 11,
    question: null,
    result: {
      title: "안전한 직접 결제 완료",
      description:
        [
          "• 직접 카드를 건네고 PIN(또는 서명)으로 결제했으므로, 중간에 악성 기기가 개입될 확률이 낮습니다.",
          "• 결제 후 영수증을 반드시 받아서 금액이 맞는지 확인하세요.",
          "• 이후 대책:\n  1) 영수증과 카드 사용 내역을 비교하여 이상 여부 확인.\n  2) 카드 알림(문자 또는 앱)을 항상 켜 두어 실시간 거래를 모니터링.",
        ].join('\n'),
      imageUrl: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
    },
  },
];

function NFCScenario({ onBack, token }) {
  const [currentStepId, setCurrentStepId] = useState(steps[0].id);
  const currentStep = steps.find((step) => step.id === currentStepId);
  const result = currentStep?.result || null;

  const handleOption = (option) => {
    setCurrentStepId(option.nextStepId);
  };

  const sendScenarioCompletion = async () => {
    try {
      await axios.post(
        'http://localhost:8080/scenario/complete', // 👉 실제 서버 주소로 변경
        {
          scenario: 'NFC',
          completedAt: new Date().toISOString(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('시나리오 완료 기록 전송 성공');
    } catch (error) {
      console.error('시나리오 완료 기록 전송 실패:', error);
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

      {!result && currentStep && currentStep.options && (
        <>
          <h2 style={{ color: '#2c3e50' }}>NFC 결제 악용 시나리오</h2>
          {currentStep.imageUrl && (
            <img
              src={currentStep.imageUrl}
              alt="단계 이미지"
              style={{ width: 80, height: 80, margin: '10px 0' }}
            />
          )}
          <p style={{ fontSize: 18, fontWeight: '600' }}>{currentStep.question}</p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {currentStep.options.map((opt) => (
              <li
                key={opt.id}
                onClick={() => handleOption(opt)}
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
                <span style={{ fontWeight: 'bold', color: '#2980b9' }}>
                  {opt.id.toUpperCase()}.
                </span>
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
              sendScenarioCompletion(); // ✅ 시나리오 완료 API 호출
              setCurrentStepId(steps[0].id);
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

export default NFCScenario;