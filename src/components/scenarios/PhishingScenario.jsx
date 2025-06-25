import React, { useState } from 'react';
import axios from 'axios';

const steps = [
  {
    id: 1,
    question:
      "회사 메일함에 \u201c긴급: 비밀번호 만료\u201d라는 제목의 이메일이 도착했습니다. 메일 본문에는 \u201c여기를 눌러 새 비밀번호를 설정하세요\u201d라는 링크가 포함되어 있습니다. 어떤 행동을 하시겠습니까?",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/561/561127.png",
    options: [
      { id: 'a', text: "메일 본문에 있는 링크를 바로 클릭한다.", nextStepId: 2 },
      { id: 'b', text: "발신자 주소(도메인)를 먼저 꼼꼼히 확인한다.", nextStepId: 3 },
      { id: 'c', text: "메일을 바로 삭제하고 IT 보안팀에 신고한다.", nextStepId: 4 },
    ],
  },
  {
    id: 2,
    question:
      "링크를 클릭하니, 회사 로그인 화면과 매우 유사한 페이지가 열렸습니다. 주소창에는 https가 붙어 있지만 도메인은 실제 회사 도메인과 조금 다릅니다. 어떤 행동을 할까요?",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/1006/1006555.png",
    options: [
      { id: 'a', text: "그대로 회사 계정과 비밀번호를 입력한다.", nextStepId: 5 },
      { id: 'b', text: "브라우저 우측의 자물쇠 아이콘을 눌러 SSL 인증서를 확인한다.", nextStepId: 6 },
      { id: 'c', text: "이 페이지가 이상하여 브라우저를 닫고 IT 보안팀에 즉시 알린다.", nextStepId: 7 },
    ],
  },
  {
    id: 3,
    question:
      "발신자 주소를 확인했더니 \u201csecure-update@secure-company.com\u201d처럼 회사 도메인과 비슷하지만 철자가 미묘하게 다릅니다. 이후 어떤 행동을 하시겠습니까?",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/565/565547.png",
    options: [
      { id: 'a', text: "즉시 메일을 신고(보안팀)하고 삭제한다.", nextStepId: 7 },
      { id: 'b', text: "메일 첨부파일도 있는지 확인 후, 첨부파일을 다운로드하지 않고 즉시 삭제한다.", nextStepId: 8 },
      { id: 'c', text: "의심은 되지만 어떤 위험이 있는지 더 확인하기 위해 메일 원문을 보관한다.", nextStepId: 9 },
    ],
  },
  {
    id: 4,
    question:
      "메일을 삭제하고 IT 보안팀에 신고했습니다. 하지만 혹시라도 클릭했을 가능성이 있어 걱정됩니다. 다음으로 무엇을 하시겠습니까?",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/1041/1041906.png",
    options: [
      { id: 'a', text: "즉시 개인 PC 전체를 백신 프로그램으로 정밀 검사한다.", nextStepId: 10 },
      { id: 'b', text: "회사 비밀번호를 바로 변경하고, 2단계 인증을 설정한다.", nextStepId: 11 },
      { id: 'c', text: "추가 행동 없이 단순히 모니터링만 한다.", nextStepId: 12 },
    ],
  },
  {
    id: 5,
    question: null,
    result: {
      title: "위험! 계정 정보 완전히 탈취됨",
      description:
        "• 입력한 정보가 피싱 서버로 바로 전송됩니다.\n• 해커는 사용자의 회사 계정을 즉시 탈취하여 내부 시스템에 접근할 수 있습니다.\n• 즉시 해야 할 일:\n  1) 다른 사람이 자신의 계정으로 접속했는지 로그를 확인하고 IT 보안팀에 알리세요.\n  2) 모든 관련 서비스(회사 시스템, 이메일 등) 비밀번호를 즉시 변경하세요.\n  3) 2단계 인증(OTP, 문자 인증 등)을 모든 계정에 반드시 설정하세요.\n  4) 회사 내부 보안 담당자와 협력해 전사적인 보안 점검을 실시하도록 요청하세요.\n• 향후 대비책:\n  - 신뢰 없는 출처의 링크는 절대 클릭하지 마세요.\n  - 이메일 클릭 전 항상 도메인 및 URL을 눈으로 직접 확인하세요.\n  - 주기적으로 보안 교육 및 모의 피싱 테스트를 병행하세요.",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/833/833472.png",
    },
  },
  {
    id: 6,
    question:
      "SSL 인증서를 확인해 보니 발급자는 알 수 없는 기관이며, 유효기간 또한 이미 만료된 상태입니다. 다음으로 무엇을 하시겠습니까?",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/565/565547.png",
    options: [
      { id: 'a', text: "바로 브라우저를 닫고 IT 보안팀에 URL과 함께 신고한다.", nextStepId: 7 },
      { id: 'b', text: "안심하기 위해 보안 프로그램으로 해당 도메인을 차단한다.", nextStepId: 13 },
      { id: 'c', text: "인증서만 의심스러울 뿐이라 판단하고 로그인 시도한다.", nextStepId: 5 },
    ],
  },
  {
    id: 7,
    question: null,
    result: {
      title: "잘한 선택! 신속한 신고",
      description:
        "• 의심되는 URL/이메일을 빠르게 보고함으로써 조직 전체의 추가 피해를 막을 수 있습니다.\n• IT 보안팀은 해당 도메인/IP를 차단하고, 다른 직원들에게 경고를 발송할 수 있습니다.\n• 추가 후속 조치:\n  1) 자신의 컴퓨터를 즉시 백신으로 검사하세요.\n  2) 링크 클릭 또는 첨부 파일 다운로드 이력이 있다면, 로그 확인으로 악성코드 감염 여부를 점검하세요.\n  3) 보안팀과 협력해 필요한 경우 형사고발 및 정책 업데이트를 진행하세요.",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
    },
  },
  {
    id: 8,
    question: null,
    result: {
      title: "안전한 선택: 첨부파일 미다운로드",
      description:
        "• 첨부파일에는 추가적인 악성코드를 심어놓는 경우가 많습니다.\n• 다운로드하지 않음으로써 직접적인 악성 파일 실행 위험을 차단했습니다.\n• 그래도 반드시:\n  1) IT 보안팀에 신고\n  2) 백신 검사 수행\n  3) 의심 접속 로그 확인이 필요합니다.",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
    },
  },
  {
    id: 9,
    question: null,
    result: {
      title: "보관 후 분석 시도",
      description:
        "• 메일 원문 보관은 사후 분석에 도움이 됩니다.\n• 하지만 열람만으로도 위험할 수 있으니 반드시 격리 환경에서 분석하세요.\n• 발신 IP 추적, 메일 헤더 분석 등도 보안팀과 함께 진행하면 좋습니다.",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
    },
  },
  {
    id: 10,
    question: null,
    result: {
      title: "최선의 선택: 즉시 백신 검사",
      description:
        "• 악성 링크를 클릭했거나 취약점이 있을 경우 자동 감염 위험이 있습니다.\n• 최신 백신으로 전체 검사를 시행하세요.\n• 로그 분석 및 이상 징후 확인도 병행해야 합니다.",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/841/841364.png",
    },
  },
  {
    id: 11,
    question: null,
    result: {
      title: "안전 강화: 비밀번호 변경 및 2FA",
      description:
        "• 비밀번호 변경과 이중 인증은 매우 효과적인 보안 조치입니다.\n• 가능한 모든 계정에 2FA를 적용하고, 백업 코드는 안전하게 보관하세요.\n• 로그인 알림 활성화도 추천됩니다.",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
    },
  },
  {
    id: 12,
    question: null,
    result: {
      title: "주의 필요: 추가 대응이 필요합니다",
      description:
        "• 단순 모니터링만으로는 부족합니다.\n• 반드시:\n  1) 백신 검사\n  2) 비밀번호 변경\n  3) 2FA 적용을 병행하세요.",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/748/748113.png",
    },
  },
  {
    id: 13,
    question: null,
    result: {
      title: "도메인 차단: 추가 안전 확보",
      description:
        "• 의심 도메인을 차단함으로써 재접속을 막을 수 있습니다.\n• 그래도 피싱 시도에 노출되었을 수 있으므로:\n  1) 백신 검사\n  2) 비밀번호 변경\n  3) 2FA 설정을 반드시 수행하세요.",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
    },
  },
];

function PhishingScenario({ onBack, token }) {
  const [currentStepId, setCurrentStepId] = useState(steps[0].id);
  const [result, setResult] = useState(null);

  const currentStep = steps.find((step) => step.id === currentStepId);

  const handleOption = (option) => {
    const nextStep = steps.find((step) => step.id === option.nextStepId);

    if (nextStep?.result) {
      setResult(nextStep.result);
      setCurrentStepId(null);
      sendScenarioComplete();
    } else {
      setCurrentStepId(option.nextStepId);
      setResult(null);
    }
  };

  const sendScenarioComplete = async () => {
    try {
      await axios.post(
        'http://localhost:8080/scenario/complete',
        { scenario: 'phishing' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error('시나리오 완료 전송 실패', err);
    }
  };

  if (!currentStep && !result) return <div>시나리오를 불러오는 중...</div>;

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
          <h2 style={{ color: '#2c3e50' }}>피싱(Phishing) 공격 시나리오</h2>

          {currentStep.imageUrl && (
            <img
              src={currentStep.imageUrl}
              alt="단계 이미지"
              style={{ width: 80, height: 80, margin: '10px 0' }}
            />
          )}

          <p style={{ fontSize: 18, fontWeight: '600' }}>{currentStep.question}</p>

          <ul style={{ listStyle: 'none', padding: 0 }}>
            {Array.isArray(currentStep.options) &&
              currentStep.options.map((opt) => (
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
                >
                  {opt.text}
                </li>
              ))}
          </ul>
        </>
      )}

      {result && (
        <div>
          <h2 style={{ color: '#e74c3c' }}>{result.title}</h2>
          <img
            src={result.imageUrl}
            alt="결과 이미지"
            style={{ width: 100, height: 100, margin: '10px 0' }}
          />
          <pre
            style={{
              whiteSpace: 'pre-wrap',
              backgroundColor: '#fefefe',
              padding: '12px 18px',
              border: '1px solid #ddd',
              borderRadius: 8,
              fontSize: 15,
              lineHeight: 1.6,
            }}
          >
            {result.description}
          </pre>
        </div>
      )}
    </div>
  );
}

export default PhishingScenario;
