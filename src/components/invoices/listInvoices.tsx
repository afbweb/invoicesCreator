import React, { useState } from 'react';
import Button from '../ui/button/button';
import Modal from '../ui/modal/modal';
import CreateInvoice from './createInvoice';
import { InvoiceProps } from './interfaces/interfaces';
import ViewInvoice from './viewInvoice';
import LinkIcon from '../ui/icons/linkIcon';


const ListInvoices = () => {
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenView, setIsOpenView] = useState(false);
  const [selectedInvoiceIndex, setSelectedInvoiceIndex] = useState(-1);
  const [invoices, setInvoices] = useState<InvoiceProps[]>([]);

  const handleModal = {
    openCreate: () => setIsOpenCreate(true),
    closeCreate: () => setIsOpenCreate(false),
    openView: (index: number) => {
      setSelectedInvoiceIndex(index);
      setIsOpenView(true);
    },
    closeView: () => setIsOpenView(false),
  };

  return (
    <section className='flex flex-col items-center mt-10 gap-4'>
      <Modal isOpen={isOpenCreate}>
        <CreateInvoice handleCloseModal={handleModal.closeCreate} setInvoices={setInvoices} />
      </Modal>

      <div className='flex gap-4'>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">List of invoices</h2>
        <Button variant='primary' onClick={handleModal.openCreate}>+ New invoice</Button>
      </div>

      <div className="flex flex-col gap-2">
        {invoices.map((invoice, index) => {
          const { iInvoiceNumber, iIssueDate } = invoice.info;
          const { bBusinessName } = invoice.buyerInfo;
          const { invoiceTotal } = invoice;

          const invoiceDetails = [
            { label: 'ID', value: index + 1 },
            { label: 'Issue Date', value: iIssueDate },
            { label: 'Business name', value: bBusinessName },
            { label: 'Invoice Number', value: iInvoiceNumber },
            { label: 'Total', value: invoiceTotal }
          ];

          return (
            <div key={index} className={`bg-white shadow-md rounded-md p-4 w-full grid grid-cols-2 items-center place-items-start mr-10`}>
              {invoiceDetails.map((detail) => (
                <p key={detail.label} className="mb-2">
                  <span className="font-medium">{detail.label}:</span> {detail.value}
                </p>
              ))}
              <Button
                onClick={() => handleModal.openView(index)}
                type="button"
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <LinkIcon aria-hidden="true" />
                View Invoice
              </Button>
            </div>
          );
        })}
      </div>

      {selectedInvoiceIndex !== -1 && (
        <Modal isOpen={isOpenView}>
          <ViewInvoice handleCloseModal={handleModal.closeView} invoice={invoices[selectedInvoiceIndex]} />
        </Modal>
      )}
    </section>
  );
};

export default ListInvoices;
