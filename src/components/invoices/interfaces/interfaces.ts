import { SelectOption } from "@/components/ui/customSelect/customSelect";
import { ChangeEvent, Dispatch, ReactElement, SetStateAction } from "react";

export interface Info {
  label: string;
  name: string;
  type: string;
  value: string;
}

interface SellerInfo extends Info { }

interface BuyerInfo extends Info { }

export interface InvoiceItem extends SelectOption {
  ProductTitle: string;
  ProductDescription: string;
  Quantity: string;
  UnitPrice: number;
  TotalAmount: string;
}

export interface FormFields {
  info: Info[];
  sellerInfo: SellerInfo[];
  buyerInfo: BuyerInfo[];
  invoiceItems: InvoiceItem[];
}

export interface ICreateInvoice {
  handleCloseModal: () => void;
  setInvoices: Dispatch<SetStateAction<InvoiceProps[]>>;
}

export interface IFormInvoice {
  invoiceData: InvoiceProps,
  products: InvoiceItem[],
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
  handleItemSelect: (selectedOption: ProductOption | null) => void;
}

export interface IViewInvoice {
  handleCloseModal: () => void;
  invoice: InvoiceProps;
}

export interface IProductsTableInvoice {
  selectedItems: ProductOption[];
  removeSelectedItem: (item: ProductOption) => void;
  setSelectedItems: Dispatch<SetStateAction<ProductOption[]>>;
  subtotal: number;
  discount: number;
  total: number;
}

export interface handleQuantityChangeProps {
  itemId: string;
  action: string;
  items: ProductOption[];
  setSelectedItems: Dispatch<SetStateAction<ProductOption[]>>;
}

export interface SelectedItem {
  value: string;
  label: string;
}

interface FieldViewInvoice{
  title: string;
  value: string;
}

export interface SectionViewInvoice {
  fields: FieldViewInvoice[];
}

export interface InvoiceProps {
  info: {
    iInvoiceNumber: string;
    iIssueDate: string;
    iDueDate: string;
  },
  sellerInfo: {
    sTaxIdentificationNumber: string;
    sBusinessName: string;
    sBusinessAddress: string;
    sEmail: string;
    sPhone: string;
  },
  buyerInfo: {
    bTaxIdentificationNumber: string;
    bBusinessName: string;
    bBusinessAddress: string;
    bEmail: string;
    bPhone: string;
  },
  invoiceItems: ProductOption[];
  invoiceTotal: number;
};

export interface ProductOption {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  label: string;
  quantity: number;
  [key: string]: string | number | string[];
}

export interface Field extends SelectedItem { };

export interface TableItemProps {
  data: string[];
}

export interface TableHeaderProps {
  headers: string[];
}

export interface SectionIcons {
  [key: string]: ReactElement;
}

export interface FieldComponents extends SectionIcons { }

export interface FieldSectionProps {
  title?: string; 
  fields: Info[]; 
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}