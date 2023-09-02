import React, { useState } from 'react';

const ExportButton = ({ data }) => {
  const [exportedData,setExportedData] = useState('')
  const handleExport = () => {
    console.log({data})
    const tempData = JSON.stringify(data)
    setExportedData(tempData)
    //    (key, value) => {
    //   if (key === 'name' || key === 'children' || key === 'data') {
    //     return value;
    //   }
    //   return undefined;
    // }, 2);
    console.log(exportedData);
  };

  return (
    <div>
    <button onClick={handleExport} className="export-button">
      Export
    </button>
    </div>
  );
};

export default ExportButton;