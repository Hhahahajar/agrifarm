import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Toolbar, Search, Inject } from '@syncfusion/ej2-react-grids';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components';
import { ordersGrid, contextMenuItems } from '../data/dummy';

const Orders = () => {
  const [ordersData, setOrdersData] = useState([]);
  const toolbarOptions = ['Search', 'Edit', 'Delete'];

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5103/agrifarm/Order/getAll');
      console.log('Fetched data:', response.data);
      setOrdersData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log('Orders data state:', ordersData); // Log the ordersData state to debug
  }, [ordersData]);

  const editing = { allowDeleting: true, allowEditing: true };

  const handleAddOrder = () => {
    navigate('/orders/add');
  };

  const handleEditOrder = async (e) => {
    try {
      await axios.put(`http://localhost:5103/agrifarm/Order/updateOrder?id=${e.data.orderId}`, e.data);
      console.log('Order edited successfully');
      fetchData(); // Refresh orders after editing
    } catch (error) {
      console.error('Error editing order:', error.response);
      alert('Failed to edit order. Please try again later.');
    }
  };

  const handleDeleteOrder = async (e) => {
    try {
      await axios.delete(`http://localhost:5103/agrifarm/Order/deleteOrder?id=${e.data[0].orderId}`);
      console.log('Order deleted successfully');
      fetchData(); // Refresh orders after deleting
    } catch (error) {
      console.error('Error deleting order:', error.response);
      alert('Failed to delete order. Please try again later.');
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <div className="flex justify-between items-center">
        <Header category="Page" title="Orders" />
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleAddOrder}
        >
          Add Order
        </button>
      </div>
      <GridComponent
        id="gridcomp"
        dataSource={ordersData}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems}
        toolbar={toolbarOptions}
        editSettings={editing}
        actionComplete={(args) => {
          if (args.requestType === 'save') {
            handleEditOrder(args);
          } else if (args.requestType === 'delete') {
            handleDeleteOrder(args);
          }
        }}
      >
        <ColumnsDirective>
          {ordersGrid.map((item, index) => (
            <ColumnDirective
              key={index}
              field={item.field}
              headerText={item.headerText}
              width={item.width}
              textAlign={item.textAlign}
              format={item.format}
              editType={item.editType}
              isPrimaryKey={item.isPrimaryKey}
              validationRules={item.validationRules}
              allowSearching // Ensure this column is searchable
            />
          ))}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport, Toolbar, Search]} />
      </GridComponent>
    </div>
  );
};

export default Orders;
