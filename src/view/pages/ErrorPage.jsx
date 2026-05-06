import { useLocation } from "react-router-dom";
import PageLayout from "../../components/common/PageLayout";
import useProtectedNavigate from "../../hooks/useProtectedNavigate";
import { NAV_PRESET } from "../../utils/protectedNavPreset";
import { ERROR_CONFIG } from "../../utils/errorPagePreset";
import { FlexBox, TextBox } from "../../components/common/PLA_FlexBox";
import { TextButton } from "../../components/common/PLA_Buttons";

const ErrorPage = ({ defaultKey }) => {

  const { state } = useLocation();
  const protectedNavigate = useProtectedNavigate();

  // 전달받은 에러 키가 없거나 정의되지 않았다면 DEFAULT 사용
  const errorKey = state?.errorKey || defaultKey || 'DEFAULT';
  const config = ERROR_CONFIG[errorKey] || ERROR_CONFIG.DEFAULT;

  const handleClick = () => {
    protectedNavigate(NAV_PRESET.HOME);
  }

  const styles = {
    container: {
      flexDirection: 'column', height: '100%', backgroundColor: '#fff',
    },
    iconWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '25px',
      backgroundColor: '#d9d9d9',
      borderRadius: '20%',
      width: '200px',
      height: '200px',
    },
    textWrapper: { flexDirection: 'column', width: '400px', height: '150px', alignItems: 'center', justifyContent: 'center', textAlign: 'center', marginBottom: '30px' },
    errorCode: { fontSize: '13px', color: '#70757a', fontWeight: 'bold', marginBottom: '8px' },
    errorTitle: { fontSize: '26px', color: '#202124', marginBottom: '12px', fontWeight: '400' },
    errorDescription: { fontSize: '16px', color: '#3c4043' }
  };

  const IconComponent = config.icon;

  return (
    <PageLayout>
      <FlexBox justify={"flex-start"} align={"center"} style={styles.container}>
        <div style={{ height: '15%' }} />
        <FlexBox style={styles.iconWrapper}>
          <IconComponent size={120} strokeWidth={1.2} color="#a8a8a8" />
        </FlexBox>
        <FlexBox style={styles.textWrapper}>
          <TextBox style={styles.errorCode}>ERROR {config.status}</TextBox>
          <TextBox style={styles.errorTitle}>{config.title}</TextBox>
          <TextBox style={styles.errorDescription}>{config.message}</TextBox>
        </FlexBox>
        <TextButton width="188px" height="50px" fontSize="16px" type="primary" onClickEvent={handleClick}>
          메인으로 돌아가기
        </TextButton>
      </FlexBox>
    </PageLayout>
  );
};

export default ErrorPage;
