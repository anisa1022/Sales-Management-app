import React, { useState } from 'react'
import logo from './../assests/angelist.png'
import RightArrow from './../assests/icons/rightArrow.svg'
import {motion} from 'framer-motion';
import {
    LayoutDashboard,
    Package,
    Users,
    FileLineChart,
    ArrowRightLeft,
    
} from 'lucide-react'
const navLinks =[
    {
        name: "Dashboard",
        icon: LayoutDashboard
    },
    {
        name: "Product",
        icon:Package
    },
    {
        name: "Customer",
        icon:Users
    },
    {
        name: "Sales",
        icon:FileLineChart
    },
    {
        name: 'Logout',
        icon: LogOut,
    },
];

const variants = {
    expanded :{width: "20%"},
    nonExpanded: {width: "5%"}
}

const handleLogout=()=>{
    localStorage.removeItem("token");
    window.location.reload();
}

function NavigationBar() {
    const [activeIndex , setActiveIndex] = useState(0);
    const [isExpanded, setIsExpanded] = useState(true);
  return (
    <motion.div 
        animate={isExpanded ? "expanded" : "nonExpanded"}
        variants={variants}
        className={'py-12 flex flex-col border border-r-1 w-1/5 h-screen relative ' + (isExpanded ? "px-10": "px-2")}
        >
        <div className='logo-div flex space-x-3 font-bold text-[#404040]'>
            <img src ={logo} className="w-10 h-10"/>
            <span className={isExpanded ? "block" : "hidden"}>Sales Management</span>
        </div>

        <div 
            onClick={() => setIsExpanded(!isExpanded)} 
            className="w-5 h-5 bg-[#404040] rounded-full absolute -right-[10.5px] top-15 flex item-center justify-center "
            >
            <img src={RightArrow}  className='w-[5px]'/>
        </div>

        <div className='mt-10 flex flex-col space-y-8'>
            {navLinks.map((item,index) => (
                <div 
                    key={index} className={'flex space-x-3 p-2 rounded' + 
                    (activeIndex ===index 
                        ? ' bg-[#404040] text-white font-semibold'
                        :'')}
                        onClick={()=> {
                            setActiveIndex(index);
                            if (item.name === 'Logout') handleLogout();
                        }}
                        >
                        <item.icon/> 
                        <span className={isExpanded ? "block" : "hidden"}>{item?.name}</span>
                </div>))
            }
        </div>
    </motion.div>
  )
}

export default NavigationBar