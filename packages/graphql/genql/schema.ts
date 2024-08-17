// @ts-nocheck
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Scalars = {
    Int: number,
    String: string,
    Boolean: boolean,
}

export interface Boxes {
    combo_id: Scalars['Int']
    id: Scalars['Int']
    image: Scalars['String']
    office: (Scalars['String'] | null)
    order_id: Scalars['Int']
    sauce: (Scalars['String'] | null)
    side_dish: (Scalars['String'] | null)
    side_dish_type: (Scalars['String'] | null)
    status: Scalars['String']
    sticker: Scalars['String']
    type: Scalars['String']
    week_day: Scalars['String']
    __typename: 'Boxes'
}

export interface Combo {
    coupon_id: Scalars['Int']
    description: (Scalars['String'] | null)
    id: Scalars['Int']
    image: Scalars['String']
    price: Scalars['String']
    products: Product[]
    status: Scalars['String']
    title: Scalars['String']
    type: Scalars['String']
    week_day: Scalars['String']
    __typename: 'Combo'
}

export interface ComboProduct {
    combo_id: Scalars['Int']
    dish_type: Scalars['String']
    price: Scalars['String']
    product_id: Scalars['Int']
    __typename: 'ComboProduct'
}

export interface Coupons {
    expiration_date: (Scalars['String'] | null)
    id: Scalars['Int']
    status: Scalars['String']
    title: Scalars['String']
    __typename: 'Coupons'
}

export interface Mutation {
    addCombo: Combo
    addComboProducts: ComboProduct
    addCoupon: Coupons
    addOffice: Office
    addSauce: Sauces
    addSideDish: SideDish
    addUser: Users
    createBox: Boxes
    createOrder: Orders
    createProduct: Product
    deleteBox: (Boxes | null)
    deleteBoxCombo: (Boxes | null)
    deleteCombo: (Combo | null)
    deleteComboProduct: (ComboProduct | null)
    deleteCoupon: (Coupons | null)
    deleteOffice: (Office | null)
    deleteOrder: (Orders | null)
    deleteProduct: (Product | null)
    deleteSauces: (Sauces | null)
    deleteSideDish: (SideDish | null)
    deleteUser: (Users | null)
    updateBox: Boxes
    updateCombo: Combo
    updateCoupon: Coupons
    updateOffice: Office
    updateOrder: Orders
    updateProduct: Product
    updateSauces: Sauces
    updateSideDish: SideDish
    updateUser: Users
    __typename: 'Mutation'
}

export interface Office {
    coupon_id: Scalars['Int']
    id: Scalars['Int']
    title: Scalars['String']
    __typename: 'Office'
}

export interface Orders {
    address: (Scalars['String'] | null)
    comment: (Scalars['String'] | null)
    coupon_id: Scalars['Int']
    customer_id: Scalars['Int']
    date_created: Scalars['String']
    id: Scalars['Int']
    number: Scalars['String']
    price: Scalars['String']
    products: Boxes[]
    status: Scalars['String']
    __typename: 'Orders'
}

export interface Product {
    allergens: (Scalars['String'] | null)
    calories: (Scalars['String'] | null)
    categories: Scalars['String']
    description: (Scalars['String'] | null)
    dish_type: Scalars['String']
    id: Scalars['Int']
    image: Scalars['String']
    price: Scalars['String']
    sauces: (Scalars['String'] | null)
    status: Scalars['String']
    title: Scalars['String']
    week_day: Scalars['String']
    __typename: 'Product'
}

export interface Query {
    box: Boxes
    boxes: Boxes[]
    comboById: Combo
    combosByCoupon: Combo[]
    combosList: Combo[]
    coupon: Coupons
    coupons: Coupons[]
    office: Office
    offices: Office[]
    officesByCoupon: Office[]
    order: Orders
    orderCustomerId: Orders
    orders: Orders[]
    ordersByCustomerId: Orders[]
    product: Product
    products: Product[]
    sauce: Sauces
    sauces: Sauces[]
    sideDish: SideDish
    sideDishes: SideDish[]
    user: Users
    users: Users[]
    __typename: 'Query'
}

export interface Sauces {
    id: Scalars['Int']
    status: Scalars['String']
    title: Scalars['String']
    __typename: 'Sauces'
}

export interface SideDish {
    id: Scalars['Int']
    status: Scalars['String']
    title: Scalars['String']
    type: Scalars['String']
    __typename: 'SideDish'
}

export interface Users {
    address: (Scalars['String'] | null)
    coupon: Scalars['String']
    domain_id: Scalars['Int']
    email: Scalars['String']
    full_name: Scalars['String']
    id: Scalars['Int']
    phone: Scalars['String']
    __typename: 'Users'
}

export interface BoxesGenqlSelection{
    combo_id?: boolean | number
    id?: boolean | number
    image?: boolean | number
    office?: boolean | number
    order_id?: boolean | number
    sauce?: boolean | number
    side_dish?: boolean | number
    side_dish_type?: boolean | number
    status?: boolean | number
    sticker?: boolean | number
    type?: boolean | number
    week_day?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ComboGenqlSelection{
    coupon_id?: boolean | number
    description?: boolean | number
    id?: boolean | number
    image?: boolean | number
    price?: boolean | number
    products?: ProductGenqlSelection
    status?: boolean | number
    title?: boolean | number
    type?: boolean | number
    week_day?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ComboProductGenqlSelection{
    combo_id?: boolean | number
    dish_type?: boolean | number
    price?: boolean | number
    product_id?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CouponsGenqlSelection{
    expiration_date?: boolean | number
    id?: boolean | number
    status?: boolean | number
    title?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MutationGenqlSelection{
    addCombo?: (ComboGenqlSelection & { __args: {coupon_id: Scalars['Int'], description?: (Scalars['String'] | null), image: Scalars['String'], price: Scalars['String'], status: Scalars['String'], title: Scalars['String'], type: Scalars['String'], week_day: Scalars['String']} })
    addComboProducts?: (ComboProductGenqlSelection & { __args: {combo_id: Scalars['Int'], dish_type: Scalars['String'], price: Scalars['String'], product_id: Scalars['Int']} })
    addCoupon?: (CouponsGenqlSelection & { __args: {expiration_date?: (Scalars['String'] | null), status: Scalars['String'], title: Scalars['String']} })
    addOffice?: (OfficeGenqlSelection & { __args: {coupon_id: Scalars['Int'], title: Scalars['String']} })
    addSauce?: (SaucesGenqlSelection & { __args: {status: Scalars['String'], title: Scalars['String']} })
    addSideDish?: (SideDishGenqlSelection & { __args: {status: Scalars['String'], title: Scalars['String'], type: Scalars['String']} })
    addUser?: (UsersGenqlSelection & { __args: {address?: (Scalars['String'] | null), coupon: Scalars['String'], domain_id: Scalars['Int'], email: Scalars['String'], full_name: Scalars['String'], phone: Scalars['String']} })
    createBox?: (BoxesGenqlSelection & { __args: {combo_id: Scalars['Int'], image: Scalars['String'], office?: (Scalars['String'] | null), order_id: Scalars['Int'], sauce?: (Scalars['String'] | null), side_dish?: (Scalars['String'] | null), side_dish_type?: (Scalars['String'] | null), sticker: Scalars['String'], type: Scalars['String'], week_day: Scalars['String']} })
    createOrder?: (OrdersGenqlSelection & { __args: {address?: (Scalars['String'] | null), comment?: (Scalars['String'] | null), coupon_id: Scalars['Int'], customer_id: Scalars['Int'], price: Scalars['String'], status: Scalars['String']} })
    createProduct?: (ProductGenqlSelection & { __args: {allergens?: (Scalars['String'] | null), calories?: (Scalars['String'] | null), categories: Scalars['String'], description?: (Scalars['String'] | null), dish_type: Scalars['String'], image: Scalars['String'], price: Scalars['String'], sauces?: (Scalars['String'] | null), status: Scalars['String'], title: Scalars['String'], week_day: Scalars['String']} })
    deleteBox?: (BoxesGenqlSelection & { __args: {id: Scalars['Int']} })
    deleteBoxCombo?: (BoxesGenqlSelection & { __args: {combo_id: Scalars['Int']} })
    deleteCombo?: (ComboGenqlSelection & { __args: {id: Scalars['Int']} })
    deleteComboProduct?: (ComboProductGenqlSelection & { __args: {combo_id: Scalars['Int']} })
    deleteCoupon?: (CouponsGenqlSelection & { __args: {id: Scalars['Int']} })
    deleteOffice?: (OfficeGenqlSelection & { __args: {coupon_id: Scalars['Int']} })
    deleteOrder?: (OrdersGenqlSelection & { __args: {id: Scalars['Int']} })
    deleteProduct?: (ProductGenqlSelection & { __args: {id: Scalars['Int']} })
    deleteSauces?: (SaucesGenqlSelection & { __args: {id: Scalars['Int']} })
    deleteSideDish?: (SideDishGenqlSelection & { __args: {id: Scalars['Int']} })
    deleteUser?: (UsersGenqlSelection & { __args: {id: Scalars['Int']} })
    updateBox?: (BoxesGenqlSelection & { __args: {combo_id: Scalars['Int'], id: Scalars['Int'], image: Scalars['String'], office?: (Scalars['String'] | null), order_id: Scalars['Int'], sauce?: (Scalars['String'] | null), side_dish?: (Scalars['String'] | null), side_dish_type?: (Scalars['String'] | null), status: Scalars['String'], sticker: Scalars['String'], type: Scalars['String'], week_day: Scalars['String']} })
    updateCombo?: (ComboGenqlSelection & { __args: {coupon_id: Scalars['Int'], description?: (Scalars['String'] | null), id: Scalars['Int'], image: Scalars['String'], price: Scalars['String'], status: Scalars['String'], title: Scalars['String'], type: Scalars['String'], week_day: Scalars['String']} })
    updateCoupon?: (CouponsGenqlSelection & { __args: {expiration_date?: (Scalars['String'] | null), id: Scalars['Int'], status: Scalars['String'], title: Scalars['String']} })
    updateOffice?: (OfficeGenqlSelection & { __args: {coupon_id: Scalars['Int'], id: Scalars['Int'], title: Scalars['String']} })
    updateOrder?: (OrdersGenqlSelection & { __args: {address?: (Scalars['String'] | null), comment?: (Scalars['String'] | null), coupon_id: Scalars['Int'], customer_id: Scalars['Int'], id: Scalars['Int'], number: Scalars['String'], price: Scalars['String'], status: Scalars['String']} })
    updateProduct?: (ProductGenqlSelection & { __args: {allergens?: (Scalars['String'] | null), calories?: (Scalars['String'] | null), categories: Scalars['String'], description?: (Scalars['String'] | null), dish_type: Scalars['String'], id: Scalars['Int'], image: Scalars['String'], price: Scalars['String'], sauces?: (Scalars['String'] | null), status: Scalars['String'], title: Scalars['String'], week_day: Scalars['String']} })
    updateSauces?: (SaucesGenqlSelection & { __args: {id: Scalars['Int'], status: Scalars['String'], title: Scalars['String']} })
    updateSideDish?: (SideDishGenqlSelection & { __args: {id: Scalars['Int'], status: Scalars['String'], title: Scalars['String'], type: Scalars['String']} })
    updateUser?: (UsersGenqlSelection & { __args: {address?: (Scalars['String'] | null), coupon: Scalars['String'], domain_id: Scalars['Int'], email: Scalars['String'], full_name: Scalars['String'], id: Scalars['Int'], phone: Scalars['String']} })
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface OfficeGenqlSelection{
    coupon_id?: boolean | number
    id?: boolean | number
    title?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface OrdersGenqlSelection{
    address?: boolean | number
    comment?: boolean | number
    coupon_id?: boolean | number
    customer_id?: boolean | number
    date_created?: boolean | number
    id?: boolean | number
    number?: boolean | number
    price?: boolean | number
    products?: BoxesGenqlSelection
    status?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ProductGenqlSelection{
    allergens?: boolean | number
    calories?: boolean | number
    categories?: boolean | number
    description?: boolean | number
    dish_type?: boolean | number
    id?: boolean | number
    image?: boolean | number
    price?: boolean | number
    sauces?: boolean | number
    status?: boolean | number
    title?: boolean | number
    week_day?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface QueryGenqlSelection{
    box?: (BoxesGenqlSelection & { __args: {id: Scalars['Int']} })
    boxes?: BoxesGenqlSelection
    comboById?: (ComboGenqlSelection & { __args: {id: Scalars['Int']} })
    combosByCoupon?: (ComboGenqlSelection & { __args: {coupon_id: Scalars['Int']} })
    combosList?: ComboGenqlSelection
    coupon?: (CouponsGenqlSelection & { __args: {id: Scalars['Int']} })
    coupons?: CouponsGenqlSelection
    office?: (OfficeGenqlSelection & { __args: {id: Scalars['Int']} })
    offices?: OfficeGenqlSelection
    officesByCoupon?: (OfficeGenqlSelection & { __args: {coupon_id: Scalars['Int']} })
    order?: (OrdersGenqlSelection & { __args: {id: Scalars['Int']} })
    orderCustomerId?: (OrdersGenqlSelection & { __args: {customer_id: Scalars['Int'], id: Scalars['Int']} })
    orders?: OrdersGenqlSelection
    ordersByCustomerId?: (OrdersGenqlSelection & { __args: {customer_id: Scalars['Int']} })
    product?: (ProductGenqlSelection & { __args: {id: Scalars['Int']} })
    products?: ProductGenqlSelection
    sauce?: (SaucesGenqlSelection & { __args: {id: Scalars['Int']} })
    sauces?: SaucesGenqlSelection
    sideDish?: (SideDishGenqlSelection & { __args: {id: Scalars['Int']} })
    sideDishes?: SideDishGenqlSelection
    user?: (UsersGenqlSelection & { __args: {email: Scalars['String']} })
    users?: UsersGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SaucesGenqlSelection{
    id?: boolean | number
    status?: boolean | number
    title?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SideDishGenqlSelection{
    id?: boolean | number
    status?: boolean | number
    title?: boolean | number
    type?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UsersGenqlSelection{
    address?: boolean | number
    coupon?: boolean | number
    domain_id?: boolean | number
    email?: boolean | number
    full_name?: boolean | number
    id?: boolean | number
    phone?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


    const Boxes_possibleTypes: string[] = ['Boxes']
    export const isBoxes = (obj?: { __typename?: any } | null): obj is Boxes => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isBoxes"')
      return Boxes_possibleTypes.includes(obj.__typename)
    }
    


    const Combo_possibleTypes: string[] = ['Combo']
    export const isCombo = (obj?: { __typename?: any } | null): obj is Combo => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCombo"')
      return Combo_possibleTypes.includes(obj.__typename)
    }
    


    const ComboProduct_possibleTypes: string[] = ['ComboProduct']
    export const isComboProduct = (obj?: { __typename?: any } | null): obj is ComboProduct => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isComboProduct"')
      return ComboProduct_possibleTypes.includes(obj.__typename)
    }
    


    const Coupons_possibleTypes: string[] = ['Coupons']
    export const isCoupons = (obj?: { __typename?: any } | null): obj is Coupons => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCoupons"')
      return Coupons_possibleTypes.includes(obj.__typename)
    }
    


    const Mutation_possibleTypes: string[] = ['Mutation']
    export const isMutation = (obj?: { __typename?: any } | null): obj is Mutation => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMutation"')
      return Mutation_possibleTypes.includes(obj.__typename)
    }
    


    const Office_possibleTypes: string[] = ['Office']
    export const isOffice = (obj?: { __typename?: any } | null): obj is Office => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isOffice"')
      return Office_possibleTypes.includes(obj.__typename)
    }
    


    const Orders_possibleTypes: string[] = ['Orders']
    export const isOrders = (obj?: { __typename?: any } | null): obj is Orders => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isOrders"')
      return Orders_possibleTypes.includes(obj.__typename)
    }
    


    const Product_possibleTypes: string[] = ['Product']
    export const isProduct = (obj?: { __typename?: any } | null): obj is Product => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isProduct"')
      return Product_possibleTypes.includes(obj.__typename)
    }
    


    const Query_possibleTypes: string[] = ['Query']
    export const isQuery = (obj?: { __typename?: any } | null): obj is Query => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isQuery"')
      return Query_possibleTypes.includes(obj.__typename)
    }
    


    const Sauces_possibleTypes: string[] = ['Sauces']
    export const isSauces = (obj?: { __typename?: any } | null): obj is Sauces => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSauces"')
      return Sauces_possibleTypes.includes(obj.__typename)
    }
    


    const SideDish_possibleTypes: string[] = ['SideDish']
    export const isSideDish = (obj?: { __typename?: any } | null): obj is SideDish => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isSideDish"')
      return SideDish_possibleTypes.includes(obj.__typename)
    }
    


    const Users_possibleTypes: string[] = ['Users']
    export const isUsers = (obj?: { __typename?: any } | null): obj is Users => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUsers"')
      return Users_possibleTypes.includes(obj.__typename)
    }
    