import React from 'react';
import NavigationBar from './NavigationBar';
import Chart from './Chart';

function Dashboard() {
  return (
    <div className='flex'>
      <NavigationBar />
      <div className='flex flex-col space-y-6 py-12 px-14 w-full'>
        <h2 className="text-2xl font-bold">Dashboard</h2>

        {/* User information section */}
        <div className='flex flex-wrap space-x-8'>
          <div className='w-full md:w-2/5 h-[150px] border rounded flex flex-col justify-center p-4 text-gray-600'>
            <span>Yatharth Werma</span>
            <span className='text-gray-500'>Your balance: $50</span>
          </div>
          <div className='w-full md:w-2/5 h-[150px] border rounded flex flex-col justify-center p-4 text-gray-600'>
            <span>Yatharth Werma</span>
            <span className='text-gray-500'>Your expenses: $4000</span>
          </div>
        </div>

        {/* Sales chart section */}
        <div className='flex flex-col space-y-4 w-full'>
          <h2 className="text-xl font-bold">Sales Chart</h2>
          <div className="w-full">
            <Chart />
          </div>
        </div>

        {/* Activity and pending bills section */}
        <div className='flex flex-wrap space-x-8'>
          <div className='w-full md:w-2/5 h-[150px] border rounded flex flex-col justify-center p-4 text-gray-600'>
            <span>Your Activity</span>
            <ul className='mt-4'>
              <li>You sent $400 to your mother</li>
            </ul>
          </div>
          <div className='w-full md:w-2/5 h-[150px] border rounded flex flex-col justify-center p-4 text-gray-600'>
            <span>Pending Bills</span>
            <ul className='mt-4 text-gray-500'>
              <li>Broadband Bill: $4000</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
