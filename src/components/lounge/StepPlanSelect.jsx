import React from 'react';
import { LoungeCard } from './LoungeCard';

const cardListStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

export const StepPlanSelect = ({ myTrips, selectedPlanId, onSelect }) => {
  return (
    <div style={cardListStyle}>
      {myTrips?.map((plan) => (
        <LoungeCard
          key={plan.tripId}
          plan={plan}
          isSelected={selectedPlanId === plan.tripId}
          onSelect={() => onSelect(plan.tripId)}
        />
      ))}
    </div>
  );
};