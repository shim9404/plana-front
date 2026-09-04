import React from 'react';
import { Select, InputNumber, Tag, Cascader, Tooltip } from 'antd';
import { Info } from 'lucide-react';
import { KEYWORD_OPTIONS } from '../../constants/keyword';

const filterPopupStyle = {
  position: 'absolute',
  left: '0px',
  top: '70px',
  width: '1435px',
  margin: '0 auto',
  backgroundColor: '#fff',
  border: '1px solid #e5e7eb',
  borderRadius: '0 0 12px 12px',
  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  padding: '24px 32px',
  zIndex: 100,
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  animation: 'fadeIn 0.2s ease-in-out',
};

const filterRowStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  flexWrap: 'wrap',
};

const filterLabelStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  fontSize: '14px',
  fontWeight: '600',
  color: '#374151',
  minWidth: '90px',
};

const baseTagStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  padding: '6px 14px',
  borderRadius: '8px',
  fontSize: '13px',
  fontWeight: 500,
  cursor: 'pointer',
  border: '1px solid #565656',
  color: '#565656',
};

const getTagStyle = (isChecked) => ({
  ...baseTagStyle,
  backgroundColor: isChecked ? '#D9D9D9' : '#fff',
});

export const LoungeFilterPopup = ({
  minNights,
  setMinNights,
  maxNights,
  setMaxNights,
  regionOptions,
  selectedRegions,
  setSelectedRegions,
  selectedKeywords,
  setSelectedKeywords,
}) => {

  const displayRender = (labels) => labels.join(' / ');

  const handleRegionChange = (value) => {
    const newZdoMap = {};
    value.forEach(([zdoName, regionId]) => {
      if (!newZdoMap[zdoName]) newZdoMap[zdoName] = [];
      newZdoMap[zdoName].push(regionId);
    });

    const oldZdoMap = {};
    selectedRegions.forEach(([zdoName, regionId]) => {
      if (!oldZdoMap[zdoName]) oldZdoMap[zdoName] = [];
      oldZdoMap[zdoName].push(regionId);
    });

    const processedValues = [];

    Object.entries(newZdoMap).forEach(([zdoName, newIds]) => {
      const oldIds = oldZdoMap[zdoName] || [];
      const allCode = newIds.find((id) => String(id).endsWith('000')); 
      
      const hasAllNew = !!allCode;
      const hasAllOld = oldIds.some((id) => String(id).endsWith('000'));

      if (hasAllNew && !hasAllOld) {
        processedValues.push([zdoName, allCode]);
      } else if (hasAllOld && hasAllNew && newIds.length > oldIds.length) {
        const individualIds = newIds.filter((id) => !String(id).endsWith('000'));
        individualIds.forEach((id) => processedValues.push([zdoName, id]));
      } else {
        const individualIds = newIds.filter((id) => !String(id).endsWith('000'));
        if (individualIds.length > 0) {
          individualIds.forEach((id) => processedValues.push([zdoName, id]));
        } else if (hasAllNew) {
          processedValues.push([zdoName, allCode]);
        }
      }
    });

    setSelectedRegions(processedValues);
  };

  const handleMinChange = (val) => {
    console.log("min::"+val);
    setMinNights(val);
    if (val !== null) {
      if (maxNights === null || maxNights < val) {
        setMaxNights(val);
      }
    }
  };

  const handleMaxChange = (val) => {
    setMaxNights(val);
    if (val !== null) {
      if (minNights !== null && minNights > val) {
        setMinNights(val);
      }
    }
  };

  const durationFormatter = (value) => {
    if (value === 0 || value === '0') return '당일';
    if (value !== undefined && value !== null && value !== '') {
      const num = Number(value);
      if (isNaN(num)) return '';
      return `${num}박 ${num + 1}일`;
    }
    return '';
  };

  const durationParser = (displayValue) => {
    if (!displayValue) return null;
    const str = String(displayValue);
    
    if (str.includes('당일') || str === '0') return 0;

    if (str.includes('박')) {
      const nightPart = str.split('박')[0];
      const match = nightPart.replace(/[^\d]/g, '');
      return match ? Number(match) : null;
    }

    const match = str.replace(/[^\d]/g, '');
    return match ? Number(match) : null;
  };

  const allKeywordIds = KEYWORD_OPTIONS.map((opt) => opt.id);
  const isAllSelected = allKeywordIds.every((id) => selectedKeywords.includes(id));

  const handleKeywordClick = (id) => {
    if (id === 'ALL') {
      if (isAllSelected) {
        setSelectedKeywords([]);
      } else {
        setSelectedKeywords(allKeywordIds);
      }
    } else {
      if (selectedKeywords.includes(id)) {
        setSelectedKeywords(selectedKeywords.filter((k) => k !== id));
      } else {
        const next = [...selectedKeywords, id];
        setSelectedKeywords(next);
      }
    }
  };

  return (
    <div style={filterPopupStyle}>
      <div style={filterRowStyle}>
        {/* 여행 기간 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '360px' }}>
          <span style={filterLabelStyle}>
            여행 기간{' '}
            <Tooltip title="원하시는 여행 기간의 범위를 선택해 주세요.">
              <span style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                <Info size={14} color="#6B72FF" />
              </span>
            </Tooltip>
          </span>
          <InputNumber
            min={0}
            max={30}
            placeholder="최소"
            style={{ width: '130px', height: '38px', borderRadius: '8px' }}
            value={minNights}
            onChange={handleMinChange}
            onStep={(nextValue, info) => {
              // 빈 값(placeholder 상태)에서 스텝을 누른 경우
              if (minNights === null || minNights === undefined) {
                handleMinChange(0);
              } else {
                handleMinChange(nextValue);
              }
            }}
            formatter={durationFormatter}
            parser={durationParser}
          />
          <span style={{ color: '#9ca3af' }}>~</span>
          <InputNumber
            min={0}
            max={30}
            placeholder="최대"
            style={{ width: '130px', height: '38px', borderRadius: '8px' }}
            value={maxNights}
            onChange={handleMaxChange}
            onStep={(nextValue, info) => {
              if (maxNights === null || maxNights === undefined) {
                handleMaxChange(0);
              } else {
                handleMaxChange(nextValue);
              }
            }}
            formatter={durationFormatter}
            parser={durationParser}
          />
        </div>

        {/* 여행지 다중 선택 */}
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flex: 1.5, minWidth: '400px' }}>
          <span style={filterLabelStyle}>
            여행지{' '}
            <Tooltip title="관심 있는 지역을 여러 개 선택해 보세요.">
              <span style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                <Info size={14} color="#6B72FF" />
              </span>
            </Tooltip>
          </span>
          <Cascader
            multiple
            maxTagCount="responsive"
            options={regionOptions}
            placeholder="여행지를 선택하세요 (다중 선택 가능)"
            style={{ width: '60%' }}
            value={selectedRegions}
            onChange={handleRegionChange}
            displayRender={displayRender}
            showCheckedStrategy={Cascader.SHOW_CHILD}
          />
        </div>
      </div>

      {/* Row 2: 키워드 다중 선택 (전체 포함) */}
      <div style={filterRowStyle}>
        <span style={filterLabelStyle}>
          여행 테마{' '}
          <Tooltip title="원하는 여행 스타일이나 테마를 중복해서 고를 수 있어요.">
            <span style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
              <Info size={14} color="#6B72FF" />
            </span>
          </Tooltip>
        </span>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* 전체 태그 */}
          <Tag.CheckableTag
            checked={isAllSelected}
            onChange={() => handleKeywordClick('ALL')}
            style={getTagStyle(isAllSelected)}
          >
            전체
          </Tag.CheckableTag>

          {/* 개별 키워드 태그들 */}
          {KEYWORD_OPTIONS.map((kw) => {
            const isChecked = selectedKeywords.includes(kw.id);

            return (
              <Tag.CheckableTag
                key={kw.id}
                checked={isChecked}
                onChange={() => handleKeywordClick(kw.id)}
                style={getTagStyle(isChecked)}
              >
                {kw.name}
              </Tag.CheckableTag>
            );
          })}
        </div>
      </div>
    </div>
  );
};