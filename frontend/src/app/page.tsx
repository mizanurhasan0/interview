import React from 'react';
import CustomTbl from './components/tables/CustomTbl';

export default function Home() {

  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <CustomTbl headers='header1' />
      </div>
    </div>
  );
}
