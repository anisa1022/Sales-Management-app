import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Package,
    Users,
    FileLineChart,
    LogOut,
    UserCircle
} from 'lucide-react';
import logo from './../assests/angelist.png';
import RightArrow from './../assests/icons/rightArrow.svg';

// Navigation links data
const navLinks = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Product", icon: Package, path: "/product" },
    { name: "Customer", icon: Users, path: "/customer" },
    { name: "Sales", icon: FileLineChart, path: "/sales" },
    { name: "Users", icon: UserCircle, path: "/users" },
    { name: 'Logout', icon: LogOut, path: "/login" }
];

// Animation variants for expanding and collapsing sidebar
const variants = {
    expanded: { width: "20%" },
    nonExpanded: { width: "5%" }
};

function NavigationBar() {
    const [activeIndex, setActiveIndex] = useState(0); // Active link index state
    const [isExpanded, setIsExpanded] = useState(true); // Sidebar expanded state
    const navigate = useNavigate(); // Navigation hook

    // Handle logout functionality
    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove token from local storage
        navigate('/login'); // Navigate to login page
    };

    return (
        <motion.div
            animate={isExpanded ? "expanded" : "nonExpanded"}
            variants={variants}
            className={
                'py-12 flex flex-col border border-r-1 h-screen relative ' +
                (isExpanded ? "px-10" : "px-2")
            }
        >
            {/* Logo and title */}
            <div className='logo-div flex space-x-3 font-bold text-[#404040]'>
                <img src={logo} className="w-10 h-10" alt="Logo" />
                <span className={isExpanded ? "block" : "hidden"}>
                    Sales Management
                </span>
            </div>

            {/* Toggle button for expanding/collapsing sidebar */}
            <div
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-5 h-5 bg-[#404040] rounded-full absolute -right-[10.5px] top-15 flex items-center justify-center cursor-pointer"
            >
                <img src={RightArrow} className='w-[5px]' alt="Toggle Sidebar" />
            </div>

            {/* Navigation links */}
            <div className='mt-10 flex flex-col space-y-8'>
                {navLinks.map((item, index) => (
                    <div
                        key={index}
                        className={
                            'flex space-x-3 p-2 rounded cursor-pointer' +
                            (activeIndex === index
                                ? ' bg-[#404040] text-white font-semibold'
                                : '')
                        }
                        onClick={() => {
                            setActiveIndex(index);
                            if (item.name === 'Logout') {
                                handleLogout();
                            } else {
                                navigate(item.path);
                            }
                        }}
                    >
                        <item.icon />
                        <span className={isExpanded ? "block" : "hidden"}>
                            {item?.name}
                        </span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

export default NavigationBar;
