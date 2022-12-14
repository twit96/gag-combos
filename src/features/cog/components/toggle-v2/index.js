import React from 'react';
import Toggle from 'features/ui/toggle';
import './index.css';


export default function ToggleV2({ active=false, clickHandler=null }) {
  return (
    <div className='toggle-v2'>
      {
       active ? (
        <h3 style={{color: 'var(--red-600)'}}>Cog is v2.0</h3>
       ) : (
        <h3>Is Cog v2.0?</h3>
       )
      }
      <Toggle 
        icon={<h3>v2.0</h3>}
        active={active}
        clickHandler={clickHandler}
        infoText="Toggle v2.0 Cog"
      />
    </div>
  )
}