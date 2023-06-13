import React, { useEffect, useState } from 'react';
import Button from '../ui/button/button';
import { ICreateInvoice, InvoiceProps, ProductOption } from './interfaces/interfaces';
import FormInvoice from './formInvoice';
import useProducts from './hooks/useProducts';
import ProductsTableInvoice from './productsTableInvoice';


const CreateInvoice = ({ handleCloseModal, setInvoices }: ICreateInvoice) => {
  const products = useProducts();

  const [selectedItems, setSelectedItems] = useState<ProductOption[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const invoiceInfo = {
    info: {
      iInvoiceNumber: '',
      iIssueDate: '',
      iDueDate: '',
    },
    sellerInfo: {
      sTaxIdentificationNumber: '',
      sBusinessName: '',
      sBusinessAddress: '',
      sEmail: '',
      sPhone: '',
    },
    buyerInfo: {
      bTaxIdentificationNumber: '',
      bBusinessName: '',
      bBusinessAddress: '',
      bEmail: '',
      bPhone: '',
    },
    invoiceItems: selectedItems,
    invoiceTotal: total,
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInvoiceData((prevData) => ({
      ...prevData,
      info: {
        ...prevData.info,
        [name]: value,
      },
      sellerInfo: {
        ...prevData.sellerInfo,
        [name]: value,
      },
      buyerInfo: {
        ...prevData.buyerInfo,
        [name]: value,
      },
    }));
  };

  const [invoiceData, setInvoiceData] = useState<InvoiceProps>(invoiceInfo);

  const handleSaveInvoice = () => {
    const newInvoice: InvoiceProps = {
      ...invoiceData,
      invoiceItems: selectedItems,
      invoiceTotal: total,

    };
    setInvoices((prevInvoices) => [...prevInvoices, newInvoice]);
    setInvoiceData(invoiceInfo);
    handleCloseModal();
  };

  useEffect(() => {
    const newSubtotal = parseFloat(selectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2));
    const discountPercentage = selectedItems.length > 0 ? selectedItems[0].discountPercentage || 0 : 0;
    const newDiscount = parseFloat((newSubtotal * discountPercentage / 100).toFixed(2));
    const newTotal = parseFloat((newSubtotal - newDiscount).toFixed(2));

    setSubtotal(newSubtotal);
    setDiscount(newDiscount);
    setTotal(newTotal);
  }, [selectedItems]);  

  const removeSelectedItem = (item: ProductOption) => {
    const updatedItems = selectedItems.filter(
      (selectedItem) => selectedItem.id !== item.id
    );
    setSelectedItems(updatedItems);
  };

  const handleItemSelect = (selectedOption: ProductOption | null) => {
    if (selectedOption) {
      const existingItem = selectedItems.find((item) => item.title === selectedOption.title);
      if (existingItem) {
        const updatedItems = selectedItems.map((item) =>
          item.title === existingItem.title ? { ...item, quantity: item.quantity + 1 } : item
        );
        setSelectedItems(updatedItems);
      } else {
        const newItems = [...selectedItems, { ...selectedOption, quantity: 1 }];
        setSelectedItems(newItems);
      }
    }
  };

  return (
    <>
      <FormInvoice invoiceData={invoiceData} products={products} onChange={onChange} handleItemSelect={handleItemSelect} />
      {
        total
          ?
          <ProductsTableInvoice setSelectedItems={setSelectedItems} selectedItems={selectedItems} removeSelectedItem={removeSelectedItem} subtotal={subtotal} discount={discount} total={total} />
          :
          null
      }
      <div className='flex flex-row-reverse pt-2 gap-2'>
        <Button variant='secondary' onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button variant='primary' onClick={handleSaveInvoice}>Save invoice</Button>
      </div>
    </>
  );
};

export default CreateInvoice;
