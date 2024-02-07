import { MouseEventHandler, ChangeEvent } from 'react'


export interface TokenProps {
  user: number;
  accessToken: string;
  refreshToken: string
}

export interface ImageProps {
  id: number,
  imageUrl: string,
  isPrimary: boolean
}

export interface ImagesFormProps {
  selectedImages: File[];
  setSelectedImages: React.Dispatch<React.SetStateAction<File[]>>;
  primaryImage: number | null;
  setPrimaryImage: React.Dispatch<React.SetStateAction<number | null>>;
  setIsValidImage: React.Dispatch<React.SetStateAction<string>>
}

export interface StarCheckBoxProps {
  index: number;
  primaryImage: number | null;
  handleCheckboxChange: (index:number) => void;
}

export interface imgurImageApiProps {
  data: {
    id: string;
    title: string;
    description: string;
    datetime: number;
    type: string;
    animated: boolean;
    width: number;
    height: number;
    size: number;
    views: number;
    bandwidth: number;
    vote: null;
    favorite: boolean;
    nsfw: null;
    section: null;
    account_url: null;
    account_id: number;
    is_ad: boolean;
    in_most_viral: boolean;
    has_sound: boolean;
    tags: [];
    ad_type: number;
    ad_url: string;
    edited: string;
    in_gallery: boolean;
    deletehash: string;
    name: string;
    link: string;
  };
  success: boolean;
  status: number
}

export interface ProductFormProps {
  formType: string;

  formData: {
    enTitle: string,
    arTitle: string,
    enDescription: string,
    arDescription: string,
    price: number
  };

  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;

  selectedImages: File[];
  setSelectedImages: React.Dispatch<React.SetStateAction<File[]>>;
  
  primaryImage: number | null;
  setPrimaryImage: React.Dispatch<React.SetStateAction<number | null>>;

  isValidImage: string;
  setIsValidImage: React.Dispatch<React.SetStateAction<string>>;

  isProcessing: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

export interface ProductProps {
  id: number;
  enTitle: string;
  arTitle: string;
  enDescription: string;
  arDescription: string;
  price: number;
  updated?: string;
  created?: string;
  images: Array<{
    id: number,
    imageUrl: string,
    isPrimary: boolean
  }>;
  isDeleted: boolean
}

export interface ProductCardProps {
  key: number;
  product: ProductProps
}

export interface CreateProductApiProps {
  enTitle: string;
  enDescription: string;
  arTitle: string;
  arDescription: string;
  price: number
}

export interface ProductDetailsProps {
  isOpen: boolean;
  closeModel: () => void;
  navigateTo: Function;
  product: ProductProps
}

export interface BuyFormProps {
  isOpen: boolean;
  closeModel: () => void;
  product: ProductProps
}

export interface OrderProps {
  product: number;
  fullName: string;
  city: string;
  area: string;
  street: string;
  phoneNumber: string
}

export interface OrderCardProps {
  id: number;
  product: ProductProps;
  fullName: string;
  city: string;
  area: string;
  street: string;
  phoneNumber: string;
  created: string;
  status: string
}

export interface OrdersApiProps {
  pending: Array<OrderCardProps>;
  delivered: Array<OrderCardProps>;
  rejected: Array<OrderCardProps>;
  pendingCount: number;
  deliveredCount: number;
  rejectedCount: number;
  earnings: number
}

export interface DashboardStatisticsProps {
  earnings: number | undefined;
  pendingCount: number | undefined;
  deliveredCount: number | undefined;
  rejectedCount: number | undefined
}

export interface FormBoxProps {
  boxStyle?: string;
  inputStyle?: string;
  inputId: string;
  inputType: string;
  setMaxLength?: number;
  required?: boolean;
  pattern?: string;
  value: any;
  setValue: (e: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >) => void;
  labelStyle?: string;
  labelName?: string;
  isTextArea?: boolean
}

export interface LoaderProps {
  width: string;
  height: string;
  borderWidth?: string;
  borderColor?: string
}

export interface CustomBtnProps {
  btnType: 'button' | 'submit';
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  title?: string;
  containerStyles?: string;
  icon?: string;
  iconStyle?: string
}

export interface SearchBarProps {
  searchQuery: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSearch: MouseEventHandler<HTMLButtonElement>
}
