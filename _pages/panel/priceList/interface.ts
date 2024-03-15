export interface PriceList {
  data: PriceListData[];
  meta: Meta;
  expiresIn: number,
  status: number
}

export interface PriceListData {
  createdAt: Date;
  createdBy: any;
  deletedAt: any;
  deletedBy: any;
  depth: any;
  description: string;
  externalId: any;
  featured: number;
  files: any[];
  h1Title: any;
  id: number;
  layoutId: any;
  lft: number;
  mediaFiles: any;
  metaDescription: string;
  metaTitle: string;
  options: PriceListOptions;
  organizationId: any;
  ownProducts: OwnProduct[];
  parentId: number;
  rgt: number;
  showMenu: number;
  slug: string;
  sortOrder: string;
  status: string;
  storeId: any;
  title: string;
  translatableOptions: any;
  updatedAt: Date;
  updatedBy: any;
  url: string;
}

export interface PriceListOptions {
  masterRecord: string;
  view: number;
  descriptionIndex?: any;
}

export interface OwnProduct {
  addedById: number;
  advancedSummary: any;
  categoryId: number;
  createdAt: Date;
  createdBy: any;
  customUrl: any;
  dateAvailable: Date;
  deletedAt: any;
  deletedBy: any;
  description: string;
  entityId: number;
  entityType: any;
  externalId: any;
  featured: number;
  files: any[];
  freeshipping: number;
  height: number;
  id: number;
  isAvailable: boolean;
  isCall: number;
  isInternal: number;
  isNew: boolean;
  isSoldOut: boolean;
  itemTypeId: number;
  layoutId: any;
  length: number;
  lengthClassId: any;
  manufacturerId: number | any;
  mediaFiles: any;
  metaDescription: string;
  metaTitle: string;
  minimum: number;
  name: string;
  options: OwnProductOptions;
  orderWeight: number;
  organizationId: any;
  parentId: any;
  points: number;
  price: number;
  quantity: number;
  quantityClassId: any;
  rating: any | string;
  reference: any | string;
  relatedIds: any;
  shipping: number;
  showPriceIsCall: number;
  sku: string;
  slug: string;
  sortOrder: number;
  status: number;
  stockStatus: number;
  storeId: any;
  subtract: number;
  sumRating: number;
  summary: string;
  tags: any[];
  taxClassId: any;
  totalTaxes: number;
  updatedAt: Date;
  updatedBy: any;
  url: string;
  volume: string;
  volumeClassId: any;
  weight: number;
  weightClassId: any;
  width: number;
  discount?: any;
}

export interface OwnProductOptions {
  masterRecord: number;
  video: any;
}

export interface Meta {
  page: Page;
}

export interface Page {
  total: number;
  lastPage: number;
  perPage: string;
  currentPage: number;
}
