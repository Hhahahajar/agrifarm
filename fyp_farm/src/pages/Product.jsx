import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Toolbar, Inject } from '@syncfusion/ej2-react-grids';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components';
import { productsGrid, contextMenuItems } from '../data/dummy';

const Products = () => {
  const [productsData, setProductsData] = useState([]);
  const toolbarOptions = ['Edit', 'Delete'];
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5103/agrifarm/Product/getAll');
        setProductsData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log('Products data state:', productsData);
  }, [productsData]);

  const editing = { allowDeleting: true, allowEditing: true };

  const handleAddProduct = () => {
    navigate('/products/add');
  };

  const handleEditProduct = async (e) => {
    try {
      await axios.put(`http://localhost:5103/agrifarm/Product/updateProduct?id=${e.data.productId}`, e.data);
      console.log('Product edited successfully');
      navigate('/products'); 
    } catch (error) {
      console.error('Error editing product:', error.response);
      alert('Failed to edit product. Please try again later.');
    }
  };

  const handleDeleteProduct = async (e) => {
    try {
      const product = await axios.get(`http://localhost:5103/agrifarm/Product/getByName/${e.data[0].name}`);
      await axios.delete(`http://localhost:5103/agrifarm/Product/deleteProduct?id=${product.data.productId}`);
      console.log('Product deleted successfully');
      navigate('/products');
    } catch (error) { 
      alert('Failed to delete product. Please try again later.'); 
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <div className="flex justify-between items-center">
        <Header category="Page" title="Products" /> {/* Adjust header title */}
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleAddProduct}
        >
          Add Product
        </button>
      </div>
      <GridComponent
        id="gridcomp"
        dataSource={productsData}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems} // Adjust context menu items if needed
        toolbar={toolbarOptions}
        editSettings={editing}
        actionComplete={(args) => {
          if (args.requestType === 'save') {
            handleEditProduct(args);
          }
          else if (args.requestType === 'delete') {
            handleDeleteProduct(args);
          }
        }}
      >
        <ColumnsDirective>
          {productsGrid.map((item, index) => (
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
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport, Toolbar]} />
      </GridComponent>
    </div>
  );
};

export default Products;
