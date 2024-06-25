import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';
import { stocksGrid,contextMenuItems } from '../data/dummy';
import { Header } from '../components';

const Stocks = () => {
  const [stocksData, setStocksData] = useState([]);
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Edit', 'Delete'];
  const editing = { allowDeleting: true, allowEditing: true };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5103/agrifarm/Stock/getAll');
        setStocksData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddStock = () => {
    navigate('/stocks/add');
  };

  const handleEditStock = async (e) => {
    try {
      await axios.put(`http://localhost:5103/agrifarm/Stock/updateStock?id=${e.data.stockId}`, e.data);
      console.log('Stock edited successfully');
      navigate('/stocks'); 
    } catch (error) {
      console.error('Error editing srock:', error.response);
      alert('Failed to edit stock. Please try again later.');
    }
  };

  const handleDeleteStock = async (e) => {
    try {
      await axios.delete(`http://localhost:5103/agrifarm/Stock/deleteStock?id=${e.data[0].stockId}`);
      console.log('Stock deleted successfully');
      navigate('/stocks');
    } catch (error) { 
      alert('Failed to delete stocks. Please try again later.'); 
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <div className="flex justify-between items-center">
        <Header category="Page" title="Stocks" />
        <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={handleAddStock}
          >
            Add Stock
        </button>
      </div>
      <GridComponent
        id="gridcomp"
        dataSource={stocksData}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems} // Adjust context menu items if needed
        toolbar={toolbarOptions}
        editSettings={editing}
        actionComplete={(args) => {
          if (args.requestType === 'save') {
            handleEditStock(args);
          }
          else if (args.requestType === 'delete') {
            handleDeleteStock(args);
          }
        }}
      >
        <ColumnsDirective>
        {stocksGrid.map((item, index) => (
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
            />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Stocks;
