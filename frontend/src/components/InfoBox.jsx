import React from 'react';

const InfoBox = ({ icon: Icon, title, count }) => {
  return (
    <div className="h-[150px] bg-gray-900 text-white rounded flex flex-col items-center justify-center p-4 text-center hover:bg-gray-700 transition duration-300 ease-in-out">
      <Icon className="text-4xl mb-2" />
      <span className="text-lg font-bold">{title}</span>
      <span className="text-xl">{count}</span>
    </div>
  );
};

export default InfoBox;
