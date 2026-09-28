import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LoungePostCard } from '../LoungePostCard';
import { Globe, FolderX } from 'lucide-react';
import { Spin } from 'antd';

const scrollableInnerStyle = { maxWidth: '1600px', margin: '0 auto', padding: '40px', width: '100%' };
const contentTitleStyle = { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px', fontWeight: 'bold', color: '#1f2937', marginBottom: '24px' };
const gridContainerStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '24px' };
const emptyContainerStyle = { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', minHeight: '320px', backgroundColor: '#f1f5f9', borderRadius: '12px', border: '1px dashed #cbd5e1', padding: '40px', textAlign: 'center' };

export const SharedTabContent = ({ searchQuery }) => {
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSharedData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let response;
        if (searchQuery.keyword) {
          response = await axios.get('/api/lounge/plans/search', {
            params: { type: searchQuery.type, keyword: searchQuery.keyword, tab: 'shared' }
          });
        } else {
          response = await axios.get('/api/lounge/plans/my-shared');
        }
        setPlans(response.data || []);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSharedData();
  }, [searchQuery]);

  return (
    <div style={scrollableInnerStyle}>
      <div style={contentTitleStyle}>
        <Globe size={20} color="#4b5563" />
        <span>내가 공유한 여행 계획 목록</span>
      </div>

      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '100px 0' }}><Spin size="large" /></div>
      ) : error || plans.length === 0 ? (
        <div style={emptyContainerStyle}>
          <FolderX size={48} color="#94a3b8" />
          <div style={{ marginTop: '16px', fontSize: '16px', fontWeight: '600', color: '#64748b' }}>여행을 찾을 수 없어요...😢</div>
        </div>
      ) : (
        <div style={gridContainerStyle}>
          {plans.map((plan) => <LoungePostCard key={plan.id} plan={plan} />)}
        </div>
      )}
    </div>
  );
};