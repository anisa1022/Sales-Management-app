import Chart from './Chart'
import React from 'react'

function Dashboard() {
  return (
    <div className='flex flex-col space-y-6 py-12 px-14  '> 
        <h2>Dashboard</h2>

        <div className='flex space-x-8'>
            <div className=' w-2/5 h-[150x] border  rounded flex flex-col justify-center p-4 text-gray-600'>
                <span>Yatharth werma</span>
                <span className='text-gray-500'>your balance: $50</span>
            </div>

            <div className=' w-2/5 h-[150x] border  rounded flex flex-col justify-center p-4  text-gray-600'>
                <span>Yatharth werma</span>
                <span className='text-gray-500'>your expenses: $4000</span>
            </div>
        </div>


        <div className='flex space-x-8 w-4/5 flex-col'>
            <h2>Sales chart</h2>
            <Chart className =" w"/>
        </div>

        <div className='flex space-x-8'>
            <div className=' w-2/5 h-[150x] border  rounded flex flex-col justify-center p-4  text-gray-600'>
                <span>Your Activity</span>
                <li className='mt-4'>You sent $400 to your mother</li>
            </div>

            <div className=' w-2/5 h-[150x] border  rounded flex flex-col justify-center p-4  text-gray-600'>
                <span>pending pills </span>
                <li className=' mt-4 text-gray-500'>Broadband Bill : $4000</li>
            </div>
        </div>
         
    </div>
  )
}

export default Dashboard