import { FaCrown } from 'react-icons/fa'; 

export function PremiumPill() {
  return (
    <div style={{
      position: 'absolute',
      top: 8,
      right: 8,
      backgroundColor: '#191919ff', 
      color: '#fff',
      borderRadius: '999px',
      padding: '4px 12px',
      fontWeight: 'bold',
      fontSize: '0.85rem',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
    }}>
      <FaCrown style={{marginRight: '4px'}} />
      Premium
    </div>
  );
}
