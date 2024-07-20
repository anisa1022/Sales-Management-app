import React from 'react';
import NavigationBar from '../components/NavigationBar';
import { 
  useGetProductCountQuery, 
  useGetPurchaseCountQuery, 
  useGetSupplierCountQuery, 
  useGetUserCountQuery, 
  useGetCustomerCountQuery,
  useGetSalesCountQuery
} from '../services/dashboardSlice';
import { useSelector } from 'react-redux';
import InfoBox from '../components/InfoBox';
import { FaBox, FaShoppingCart, FaTruck, FaUsers, FaUserFriends, FaChartLine } from 'react-icons/fa';
import SalesChart from '../components/SalesChart';
import PurchasesChart from '../components/PurchasesChart';

const Dashboard = () => {
  // Fetch counts from the backend
  const { data: productCount } = useGetProductCountQuery();
  const { data: purchaseCount } = useGetPurchaseCountQuery();
  const { data: supplierCount } = useGetSupplierCountQuery();
  const { data: userCount } = useGetUserCountQuery();
  const { data: customerCount } = useGetCustomerCountQuery();
  const { data: salesCount } = useGetSalesCountQuery();

  // Get user info from Redux store
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className='flex'>
      <NavigationBar />
      <div className='flex flex-col py-12 px-14 w-full ml-64 mt-20'>
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
          {userInfo.role === 'admin' ? (
            <>
              <InfoBox icon={FaBox} title="Products" count={productCount} />
              <InfoBox icon={FaShoppingCart} title="Purchases" count={purchaseCount} />
              <InfoBox icon={FaTruck} title="Suppliers" count={supplierCount} />
              <InfoBox icon={FaUsers} title="Users" count={userCount} />
            </>
          ) : (
            <>
              <InfoBox icon={FaBox} title="Products" count={productCount} />
              <InfoBox icon={FaUserFriends} title="Customers" count={customerCount} />
              <InfoBox icon={FaChartLine} title="Sales" count={salesCount} />
            </>
          )}
        </div>

        <div className="w-full mt-8">
          {userInfo.role === 'admin' ? <PurchasesChart /> : <SalesChart />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
