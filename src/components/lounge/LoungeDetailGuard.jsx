// src/components/lounge/LoungeDetailGuard.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getHubPlanDetailApi } from '../../services/loungeApi'; // 실제 라운지 상세 API

export const LoungeDetailGuard = ({ children }) => {
  const { id } = useParams(); // URL의 :hubPlanId
  const [loungeData, setLoungeData] = useState(null);


  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await getHubPlanDetailApi(id);
        // 서버 응답 구조에 맞게 설정 (예: response.data)
        setLoungeData(response.data);
      } catch (err) {
        console.error('라운지 상세 정보를 불러오지 못했습니다.', err);
      } 
    };

    if (id) fetchDetail();
  }, [id]);

  // Render Props 패턴으로 데이터 전달
  return typeof children === 'function' ? children(loungeData) : children;
};