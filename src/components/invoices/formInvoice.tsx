import React from 'react';
import { FormFields, IFormInvoice, ProductOption } from './interfaces/interfaces';
import CustomSelect, { SelectOption } from '@/components/ui/customSelect/customSelect';
import { MultiValue, SingleValue } from 'react-select';
import CreateIcon from '../ui/icons/createIcon';
import { FieldSection } from './utils/formInvoiceUtils';


const FormInvoice = ({ invoiceData, products, onChange, handleItemSelect }: IFormInvoice) => {
    const { info, sellerInfo, buyerInfo } = invoiceData;
    const formFields: FormFields =
    {
        info: [
            {
                label: "Invoice number",
                name: "iInvoiceNumber",
                type: "text",
                value: info.iInvoiceNumber,
            },
            {
                label: "Issue date",
                name: "iIssueDate",
                type: "date",
                value: info.iIssueDate,
            },
            {
                label: "Due date",
                name: "iDueDate",
                type: "date",
                value: info.iDueDate,
            },
        ],
        sellerInfo: [
            {
                label: "TIN",
                name: "sTaxIdentificationNumber",
                type: "text",
                value: sellerInfo.sTaxIdentificationNumber,
            },
            {
                label: "Business name",
                name: "sBusinessName",
                type: "text",
                value: sellerInfo.sBusinessName,
            },
            {
                label: "Business address",
                name: "sBusinessAddress",
                type: "text",
                value: sellerInfo.sBusinessAddress,
            },
            {
                label: "Email",
                name: "sEmail",
                type: "text",
                value: sellerInfo.sEmail,
            },
            {
                label: "Phone",
                name: "sPhone",
                type: "text",
                value: sellerInfo.sPhone,
            },
        ],
        buyerInfo: [
            {
                label: "TIN",
                name: "bTaxIdentificationNumber",
                type: "text",
                value: buyerInfo.bTaxIdentificationNumber,
            },
            {
                label: "Business name",
                name: "bBusinessName",
                type: "text",
                value: buyerInfo.bBusinessName,
            },
            {
                label: "Business address",
                name: "bBusinessAddress",
                type: "text",
                value: buyerInfo.bBusinessAddress,
            },
            {
                label: "Email",
                name: "bEmail",
                type: "text",
                value: buyerInfo.bEmail,
            },
            {
                label: "Phone",
                name: "bPhone",
                type: "text",
                value: buyerInfo.bPhone,
            },
        ],
        invoiceItems: products,
    };  

    return (
        <form>
            <h2 className="pb-6 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                <div className="flex gap-2 items-center">
                    {<CreateIcon />}
                    Create Invoice
                </div>
            </h2>
            
            <FieldSection fields={formFields.info} onChange={onChange} />
            <FieldSection title="Seller Info" fields={formFields.sellerInfo} onChange={onChange} />
            <FieldSection title="Buyer Info" fields={formFields.buyerInfo} onChange={onChange} />

            <div className="grid grid-cols-1 pb-4">
                <CustomSelect
                    onChange={(selectedOption: MultiValue<SelectOption> | SingleValue<SelectOption>) => handleItemSelect(selectedOption as ProductOption)}
                    options={formFields.invoiceItems.map((option) => ({
                        ...option,
                        label: option.title,
                    }))}
                    placeholder="Select Item" />
            </div>
        </form>
    );
};

export default FormInvoice;
