import React from 'react';
import { Section, TableHeader, TableItem } from './utils/viewInvoiceUtils';
import Button from '../ui/button/button';
import { IViewInvoice, ProductOption, SectionIcons } from './interfaces/interfaces';
import MagnifyIcon from '../ui/icons/magnifyIcon';
import PersonIcon from '../ui/icons/personIcon';
import StoreIcon from '../ui/icons/storeIcon';


const ViewInvoice = ({ handleCloseModal, invoice }: IViewInvoice) => {
  const details = [
    {
      sectionTitle: 'Invoice Details',
      fields: [
        { title: 'Invoice Number:', value: invoice.info.iInvoiceNumber },
        { title: 'Issue Date:', value: invoice.info.iIssueDate },
        { title: 'Due Date:', value: invoice.info.iDueDate },
      ],
    },
    {
      sectionTitle: 'Seller Information',
      fields: [
        { title: 'Tax Identification Number:', value: invoice.sellerInfo.sTaxIdentificationNumber },
        { title: 'Business Name:', value: invoice.sellerInfo.sBusinessName },
        { title: 'Business Address:', value: invoice.sellerInfo.sBusinessAddress },
        { title: 'Email:', value: invoice.sellerInfo.sEmail },
        { title: 'Phone:', value: invoice.sellerInfo.sPhone },
      ],
    },
    {
      sectionTitle: 'Buyer Information',
      fields: [
        { title: 'Tax Identification Number:', value: invoice.buyerInfo.bTaxIdentificationNumber },
        { title: 'Business Name:', value: invoice.buyerInfo.bBusinessName },
        { title: 'Business Address:', value: invoice.buyerInfo.bBusinessAddress },
        { title: 'Email:', value: invoice.buyerInfo.bEmail },
        { title: 'Phone:', value: invoice.buyerInfo.bPhone },
      ],
    },
  ];

  const sectionIcons: SectionIcons = {
    'Invoice Details': <MagnifyIcon />,
    'Seller Information': <StoreIcon />,
    'Buyer Information': <PersonIcon />,
  };

  return (
    <>
      {details.map((section) => (
        <div key={section.sectionTitle} className='mt-2'>
          <h3 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-1xl mb-2'>
            <div className='flex gap-2 items-center'>
              {sectionIcons[section.sectionTitle]}
              {section.sectionTitle}
            </div>
          </h3>
          <div className='flex flex-wrap'>          
            <Section fields={section.fields} />
          </div>
        </div>
      ))}

      <div className='mt-4'>
        <h3 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-xl mb-2'>Invoice Items</h3>
        <table className='w-full border'>
          <thead>
            <TableHeader headers={['Title', 'Brand', 'Price', 'Discount', 'Quantity', 'Total']} />
          </thead>
          <tbody>
            {invoice.invoiceItems.map((item: ProductOption) => (
              <TableItem
                key={item.id}
                data={[
                  item.title,
                  item.brand,
                  `$${item.price}`,
                  `%${item.discountPercentage.toString()}`,
                  item.quantity.toString(),
                  `$${(item.price * item.quantity * (100 - item.discountPercentage) / 100).toFixed(2)}`
                ]}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className='mt-4'>
        <p className='text-xl font-semibold'>Invoice Total: ${invoice.invoiceTotal}</p>
      </div>

      <div className='flex pt-2 gap-2'>
        <Button variant='secondary' onClick={handleCloseModal}>
          Close
        </Button>
      </div>
    </>
  );
};

export default ViewInvoice;



