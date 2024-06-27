import Dashboard from './components/Dashboard.jsx';
import NavigationBar from './components/NavigationBar.jsx'
import {useState } from 'react';

const App = () => {
  return (
    <div className='w-full flex'> 
      {/* Navigation bar */}
      <NavigationBar/>
      {/* main components */}
      <main className='grow'> 
        <Dashboard/>
      </main>
    </div>
    
  )
}
  

export default App;
