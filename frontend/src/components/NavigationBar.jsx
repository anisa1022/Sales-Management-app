import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Package,
    Users,
    FileLineChart,
    LogOut,
    UserCircle,
    ShoppingCart,
    Truck
} from 'lucide-react';
import RightArrow from '../assests/icons/rightArrow.svg';
import UserIcon from '../assests/icons/userIcon.png';
// import { useGetUserProfileQuery } from '../slices/userApiSlice';
// import { setCredentials, logout } from '../slices/authSlice';

const variants = {
    expanded: { width: "20%" },
    nonExpanded: { width: "5%" }
};

function NavigationBar() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isExpanded, setIsExpanded] = useState(true);
    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    

    // useEffect(() => {
    //     if (isSuccess) {
    //         dispatch(setCredentials(user));
    //     }
    // }, [user, isSuccess, dispatch]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const navLinks = userInfo.name === 'admin' ? [
        { name: "Product", icon: Package, path: "/product" },
        { name: "Supplier", icon: Truck, path: "/supplier" },
        { name: "Purchases", icon: ShoppingCart, path: "/purchases" },
        { name: "Users", icon: UserCircle, path: "/users" },
        { name: 'Logout', icon: LogOut, path: "/login" }
    ] : [
        { name: "Product", icon: Package, path: "/product" },
        { name: "Customer", icon: Users, path: "/customer" },
        { name: "Sales", icon: FileLineChart, path: "/sales" },
        { name: 'Logout', icon: LogOut, path: "/login" }
    ];

    return (
        <motion.div
            animate={isExpanded ? "expanded" : "nonExpanded"}
            variants={variants}
            className={
                'py-12 flex flex-col border border-r-1 h-screen relative ' +
                (isExpanded ? "px-10" : "px-2")
            }
        >
            {userInfo && (
                <div className='user-info flex items-center space-x-3 mb-8'>
                    <img src={UserIcon} alt="User" className="h-10 w-10 rounded-full" />
                    <span className={isExpanded ? "block text-[#404040] font-medium" : "hidden"}>
                        {userInfo.name}
                    </span>
                </div>
            )}

            <div
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-5 h-5 bg-[#404040] rounded-full absolute -right-[10.5px] top-15 flex items-center justify-center cursor-pointer"
            >
                <img src={RightArrow} className='w-[5px]' alt="Toggle Sidebar" />
            </div>

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
