import { DesktopOutlined } from "@ant-design/icons";

const MobileGuard = () => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100dvh',
      backgroundColor: '#f0f0eb',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        padding: '40px 32px',
        textAlign: 'center',
        maxWidth: '320px',
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: '#444441',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <DesktopOutlined style={{ fontSize: '36px', color: '#ffffff' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <p style={{ fontSize: '20px', fontWeight: 500, margin: 0 }}>PC 환경에서 접속해 주세요</p>
          <p style={{ fontSize: '14px', color: '#888780', margin: 0, lineHeight: 1.7 }}>
            현재 서비스는 PC 환경에서만<br />이용 가능합니다.
          </p>
        </div>       
      </div>
    </div>
  );
};

export default MobileGuard;