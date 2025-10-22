 export interface Product {
    uid: string;
    name: string;
    store_uid: string;
    seller_uid: string;
    price: number;
    image_url: string;
    description: string;
    is_available: boolean;
    sold_out: boolean;
    category: ProductCategory;
    created_at: string;
}

export interface ProductCreate extends Omit<Product, "uid" | "created_at"> {
}

export interface ProductUpdate extends Partial<ProductCreate> {
}


export enum ProductCategory {
    Electronics = "ELECTRONICS",
    MobileAccessories = "MOBILE_ACCESSORIES",
    Audio = "AUDIO",
    Fashion = "FASHION",
    MenClothing = "MENS_CLOTHING",
    WomenClothing = "WOMEN_CLOTHING",
    Kids = "KIDS",
    Footwear = "FOOTWEAR",
    Beauty = "BEAUTY",
    PersonalCare = "PERSONAL_CARE",
    HomeAndKitchen = "HOME_AND_KITCHEN",
    HomeDecor = "HOME_DECOR",
    Kitchenware = "KITCHENWARE",
    Health = "HEALTH",
    Fitness = "FITNESS",
    Baby = "BABY",
    Toys = "TOYS",
    Books = "BOOKS",
    Media = "MEDIA",
    Groceries = "GROCERIES",
    OfficeSupplies = "OFFICE_SUPPLIES",
    Sports = "SPORTS",
    Stationery = "STATIONERY",
    Pets = "PETS",
    Automotive = "AUTOMOTIVE",
}