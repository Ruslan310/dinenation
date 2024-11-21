// @ts-nocheck
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Scalars = {
    Int: number,
    String: string,
    Float: number,
    Boolean: boolean,
}

export interface Boxes {
    combo_id: Scalars['Int']
    date_updated: Scalars['String']
    id: Scalars['Int']
    image: Scalars['String']
    office: (Scalars['String'] | null)
    order_id: Scalars['Int']
    price: Scalars['Float']
    sauce: (Scalars['String'] | null)
    side_dish: (Scalars['String'] | null)
    side_dish_type: (Scalars['String'] | null)
    small_img: Scalars['String']
    status: Scalars['String']
    sticker: Scalars['String']
    type: Scalars['String']
    week_day: Scalars['String']
    __typename: 'Boxes'
}

export interface CheckUser {
    checkDomain: CheckUserDomain[]
    checkEmail: CheckUserEmail[]
    coupons: Coupons[]
    __typename: 'CheckUser'
}

export interface CheckUserDomain {
    coupon_id: Scalars['Int']
    domain: Scalars['String']
    id: Scalars['Int']
    __typename: 'CheckUserDomain'
}

export interface CheckUserEmail {
    coupon_id: Scalars['Int']
    email: Scalars['String']
    id: Scalars['Int']
    __typename: 'CheckUserEmail'
}

export interface Combo {
    description: (Scalars['String'] | null)
    id: Scalars['Int']
    image: Scalars['String']
    price: Scalars['Float']
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
    price: Scalars['Float']
    product_id: Scalars['Int']
    __typename: 'ComboProduct'
}

export interface Coupons {
    address: Scalars['String']
    check_order: Scalars['Boolean']
    domain: Domain
    expiration_date: (Scalars['String'] | null)
    has_domain: Scalars['Boolean']
    hide_price: Scalars['Boolean']
    id: Scalars['Int']
    office: Office[]
    status: Scalars['String']
    title: Scalars['String']
    __typename: 'Coupons'
}

export interface Domain {
    combos: Combo[]
    discount: (Scalars['Float'] | null)
    expired_date: (Scalars['String'] | null)
    id: Scalars['Int']
    title: Scalars['String']
    __typename: 'Domain'
}

export interface DomainCombo {
    combo_id: Scalars['Int']
    domain_id: Scalars['Int']
    id: Scalars['Int']
    __typename: 'DomainCombo'
}

export interface Mutation {
    addCombo: Combo
    addComboProducts: ComboProduct
    addCoupon: Coupons
    addDomain: Domain
    addDomainCombo: DomainCombo
    addOffice: Office
    addReview: Review
    addSauce: Sauces
    addSideDish: SideDish
    addUser: Users
    createBox: Boxes
    createCheckDomain: CheckUserDomain
    createCheckEmail: CheckUserEmail
    createOrderWithBoxes: Orders
    createProduct: Product
    deleteBox: Scalars['Boolean']
    deleteBoxCombo: Scalars['Boolean']
    deleteCheckDomain: Scalars['Boolean']
    deleteCheckEmail: Scalars['Boolean']
    deleteCombo: (Combo | null)
    deleteComboProduct: Scalars['Boolean']
    deleteCoupon: (Coupons | null)
    deleteDomain: Scalars['Boolean']
    deleteDomainCombo: Scalars['Boolean']
    deleteOffice: Scalars['Boolean']
    deleteOrder: Scalars['Boolean']
    deleteProduct: (Product | null)
    deleteReview: Scalars['Boolean']
    deleteSauces: Scalars['Boolean']
    deleteSideDish: Scalars['Boolean']
    deleteUser: Scalars['Boolean']
    deleteUserReview: Scalars['Boolean']
    permissionUser: Users
    updateBox: Boxes
    updateBoxList: Scalars['Boolean']
    updateCheckDomain: CheckUserDomain
    updateCheckEmail: CheckUserEmail
    updateCombo: Combo
    updateCoupon: Coupons
    updateDomain: Domain
    updateOffice: Office
    updateOrder: Orders
    updateOrderWithBoxes: Orders
    updateProduct: Product
    updateReview: Review
    updateSauces: Sauces
    updateSideDish: SideDish
    updateUser: Users
    updateUserImage: Users
    updateUserProfile: Users
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
    combo_price: Scalars['Float']
    comment: (Scalars['String'] | null)
    coupon: Coupons
    customer: Users
    date_created: Scalars['String']
    id: Scalars['Int']
    number: Scalars['String']
    price: Scalars['Float']
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
    is_dish: Scalars['Boolean']
    price: Scalars['Float']
    sauces: (Scalars['String'] | null)
    small_img: Scalars['String']
    status: Scalars['String']
    title: Scalars['String']
    week_day: Scalars['String']
    __typename: 'Product'
}

export interface Query {
    box: Boxes
    boxes: Boxes[]
    checkDomain: CheckUserDomain
    checkDomains: CheckUserDomain[]
    checkEmail: CheckUserEmail
    checkEmails: CheckUserEmail[]
    checkUser: CheckUser
    comboById: Combo
    combosList: Combo[]
    coupon: Coupons
    coupons: Coupons[]
    domain: Domain
    domains: Domain[]
    office: Office
    offices: Office[]
    officesByCoupon: Office[]
    order: Orders
    orderCustomerId: Orders
    orders: Orders[]
    ordersByBox: Orders[]
    ordersByCoupon: Orders[]
    ordersByCouponDate: Orders[]
    ordersByCustomerId: Orders[]
    ordersByStatus: Orders[]
    ordersCheckById: Orders[]
    product: Product
    products: Product[]
    review: Review
    reviews: Review[]
    sauce: Sauces
    sauces: Sauces[]
    sideDish: SideDish
    sideDishes: SideDish[]
    totalCount: Scalars['Int']
    user: Users
    userId: Users
    userReviews: Review[]
    users: Users[]
    __typename: 'Query'
}

export interface Review {
    date_created: Scalars['String']
    dish_name: Scalars['String']
    id: Scalars['Int']
    rate: Scalars['Int']
    review: Scalars['String']
    user: Users
    __typename: 'Review'
}

export interface Sauces {
    id: Scalars['Int']
    status: Scalars['String']
    title: Scalars['String']
    __typename: 'Sauces'
}

export interface SideDish {
    description: (Scalars['String'] | null)
    id: Scalars['Int']
    status: Scalars['String']
    title: Scalars['String']
    type: Scalars['String']
    __typename: 'SideDish'
}

export interface Users {
    address: (Scalars['String'] | null)
    coupon: Coupons
    date_created: Scalars['String']
    email: Scalars['String']
    first_name: Scalars['String']
    id: Scalars['Int']
    image: (Scalars['String'] | null)
    is_update: Scalars['Boolean']
    last_name: Scalars['String']
    phone: Scalars['String']
    role: Scalars['String']
    __typename: 'Users'
}

export interface BoxInput {combo_id: Scalars['Int'],image: Scalars['String'],office?: (Scalars['String'] | null),price: Scalars['Float'],sauce?: (Scalars['String'] | null),side_dish?: (Scalars['String'] | null),side_dish_type?: (Scalars['String'] | null),small_img: Scalars['String'],sticker: Scalars['String'],type: Scalars['String'],week_day: Scalars['String']}

export interface BoxesGenqlSelection{
    combo_id?: boolean | number
    date_updated?: boolean | number
    id?: boolean | number
    image?: boolean | number
    office?: boolean | number
    order_id?: boolean | number
    price?: boolean | number
    sauce?: boolean | number
    side_dish?: boolean | number
    side_dish_type?: boolean | number
    small_img?: boolean | number
    status?: boolean | number
    sticker?: boolean | number
    type?: boolean | number
    week_day?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CheckUserGenqlSelection{
    checkDomain?: CheckUserDomainGenqlSelection
    checkEmail?: CheckUserEmailGenqlSelection
    coupons?: CouponsGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CheckUserDomainGenqlSelection{
    coupon_id?: boolean | number
    domain?: boolean | number
    id?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CheckUserEmailGenqlSelection{
    coupon_id?: boolean | number
    email?: boolean | number
    id?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ComboGenqlSelection{
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
    address?: boolean | number
    check_order?: boolean | number
    domain?: DomainGenqlSelection
    expiration_date?: boolean | number
    has_domain?: boolean | number
    hide_price?: boolean | number
    id?: boolean | number
    office?: OfficeGenqlSelection
    status?: boolean | number
    title?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DomainGenqlSelection{
    combos?: ComboGenqlSelection
    discount?: boolean | number
    expired_date?: boolean | number
    id?: boolean | number
    title?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DomainComboGenqlSelection{
    combo_id?: boolean | number
    domain_id?: boolean | number
    id?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MutationGenqlSelection{
    addCombo?: (ComboGenqlSelection & { __args: {description?: (Scalars['String'] | null), image: Scalars['String'], price: Scalars['Float'], products: ProductInput[], status: Scalars['String'], title: Scalars['String'], type: Scalars['String'], week_day: Scalars['String']} })
    addComboProducts?: (ComboProductGenqlSelection & { __args: {combo_id: Scalars['Int'], dish_type: Scalars['String'], price: Scalars['Float'], product_id: Scalars['Int']} })
    addCoupon?: (CouponsGenqlSelection & { __args: {address: Scalars['String'], check_order: Scalars['Boolean'], domain_id: Scalars['Int'], expiration_date?: (Scalars['String'] | null), has_domain: Scalars['Boolean'], hide_price: Scalars['Boolean'], status: Scalars['String'], title: Scalars['String']} })
    addDomain?: (DomainGenqlSelection & { __args: {discount?: (Scalars['Float'] | null), expired_date?: (Scalars['String'] | null), title: Scalars['String']} })
    addDomainCombo?: (DomainComboGenqlSelection & { __args: {combo_id: Scalars['Int'], domain_id: Scalars['Int']} })
    addOffice?: (OfficeGenqlSelection & { __args: {coupon_id: Scalars['Int'], title: Scalars['String']} })
    addReview?: (ReviewGenqlSelection & { __args: {dish_name: Scalars['String'], rate: Scalars['Int'], review: Scalars['String'], user_id: Scalars['Int']} })
    addSauce?: (SaucesGenqlSelection & { __args: {status: Scalars['String'], title: Scalars['String']} })
    addSideDish?: (SideDishGenqlSelection & { __args: {description?: (Scalars['String'] | null), status: Scalars['String'], title: Scalars['String'], type: Scalars['String']} })
    addUser?: (UsersGenqlSelection & { __args: {address?: (Scalars['String'] | null), coupon_id: Scalars['Int'], email: Scalars['String'], first_name: Scalars['String'], last_name: Scalars['String'], phone: Scalars['String']} })
    createBox?: (BoxesGenqlSelection & { __args: {combo_id: Scalars['Int'], image: Scalars['String'], office?: (Scalars['String'] | null), order_id: Scalars['Int'], price: Scalars['Float'], sauce?: (Scalars['String'] | null), side_dish?: (Scalars['String'] | null), side_dish_type?: (Scalars['String'] | null), small_img: Scalars['String'], sticker: Scalars['String'], type: Scalars['String'], week_day: Scalars['String']} })
    createCheckDomain?: (CheckUserDomainGenqlSelection & { __args: {coupon_id: Scalars['Int'], domain: Scalars['String']} })
    createCheckEmail?: (CheckUserEmailGenqlSelection & { __args: {coupon_id: Scalars['Int'], email: Scalars['String']} })
    createOrderWithBoxes?: (OrdersGenqlSelection & { __args: {address?: (Scalars['String'] | null), boxes: BoxInput[], combo_price: Scalars['Float'], comment?: (Scalars['String'] | null), coupon_id: Scalars['Int'], customer_id: Scalars['Int'], price: Scalars['Float']} })
    createProduct?: (ProductGenqlSelection & { __args: {allergens?: (Scalars['String'] | null), calories?: (Scalars['String'] | null), categories: Scalars['String'], description?: (Scalars['String'] | null), dish_type: Scalars['String'], image: Scalars['String'], is_dish: Scalars['Boolean'], price: Scalars['Float'], sauces?: (Scalars['String'] | null), small_img: Scalars['String'], status: Scalars['String'], title: Scalars['String'], week_day: Scalars['String']} })
    deleteBox?: { __args: {id: Scalars['Int']} }
    deleteBoxCombo?: { __args: {combo_id: Scalars['Int'], order_id: Scalars['Int']} }
    deleteCheckDomain?: { __args: {id: Scalars['Int']} }
    deleteCheckEmail?: { __args: {id: Scalars['Int']} }
    deleteCombo?: (ComboGenqlSelection & { __args: {id: Scalars['Int']} })
    deleteComboProduct?: { __args: {combo_id: Scalars['Int']} }
    deleteCoupon?: (CouponsGenqlSelection & { __args: {id: Scalars['Int']} })
    deleteDomain?: { __args: {id: Scalars['Int']} }
    deleteDomainCombo?: { __args: {domain_id: Scalars['Int']} }
    deleteOffice?: { __args: {coupon_id: Scalars['Int']} }
    deleteOrder?: { __args: {id: Scalars['Int']} }
    deleteProduct?: (ProductGenqlSelection & { __args: {id: Scalars['Int']} })
    deleteReview?: { __args: {id: Scalars['Int']} }
    deleteSauces?: { __args: {id: Scalars['Int']} }
    deleteSideDish?: { __args: {id: Scalars['Int']} }
    deleteUser?: { __args: {id: Scalars['Int']} }
    deleteUserReview?: { __args: {user_id: Scalars['Int']} }
    permissionUser?: (UsersGenqlSelection & { __args: {id: Scalars['Int'], is_update: Scalars['Boolean']} })
    updateBox?: (BoxesGenqlSelection & { __args: {combo_id: Scalars['Int'], id: Scalars['Int'], image: Scalars['String'], office?: (Scalars['String'] | null), order_id: Scalars['Int'], price: Scalars['Float'], sauce?: (Scalars['String'] | null), side_dish?: (Scalars['String'] | null), side_dish_type?: (Scalars['String'] | null), small_img: Scalars['String'], status: Scalars['String'], sticker: Scalars['String'], type: Scalars['String'], week_day: Scalars['String']} })
    updateBoxList?: { __args: {list: Scalars['Int'][]} }
    updateCheckDomain?: (CheckUserDomainGenqlSelection & { __args: {coupon_id: Scalars['Int'], domain: Scalars['String'], id: Scalars['Int']} })
    updateCheckEmail?: (CheckUserEmailGenqlSelection & { __args: {coupon_id: Scalars['Int'], email: Scalars['String'], id: Scalars['Int']} })
    updateCombo?: (ComboGenqlSelection & { __args: {description?: (Scalars['String'] | null), id: Scalars['Int'], image: Scalars['String'], price: Scalars['Float'], products: ProductInput[], status: Scalars['String'], title: Scalars['String'], type: Scalars['String'], week_day: Scalars['String']} })
    updateCoupon?: (CouponsGenqlSelection & { __args: {address: Scalars['String'], check_order: Scalars['Boolean'], domain_id: Scalars['Int'], expiration_date?: (Scalars['String'] | null), has_domain: Scalars['Boolean'], hide_price: Scalars['Boolean'], id: Scalars['Int'], status: Scalars['String'], title: Scalars['String']} })
    updateDomain?: (DomainGenqlSelection & { __args: {discount?: (Scalars['Float'] | null), expired_date?: (Scalars['String'] | null), id: Scalars['Int'], title: Scalars['String']} })
    updateOffice?: (OfficeGenqlSelection & { __args: {coupon_id: Scalars['Int'], id: Scalars['Int'], title: Scalars['String']} })
    updateOrder?: (OrdersGenqlSelection & { __args: {address?: (Scalars['String'] | null), combo_price: Scalars['Float'], comment?: (Scalars['String'] | null), coupon_id: Scalars['Int'], customer_id: Scalars['Int'], id: Scalars['Int'], number: Scalars['String'], price: Scalars['Float'], status: Scalars['String']} })
    updateOrderWithBoxes?: (OrdersGenqlSelection & { __args: {boxes: BoxInput[], combo_id: Scalars['Int'], customer_id: Scalars['Int'], id: Scalars['Int'], price: Scalars['Float'], status: Scalars['String']} })
    updateProduct?: (ProductGenqlSelection & { __args: {allergens?: (Scalars['String'] | null), calories?: (Scalars['String'] | null), categories: Scalars['String'], description?: (Scalars['String'] | null), dish_type: Scalars['String'], id: Scalars['Int'], image: Scalars['String'], is_dish: Scalars['Boolean'], price: Scalars['Float'], sauces?: (Scalars['String'] | null), small_img: Scalars['String'], status: Scalars['String'], title: Scalars['String'], week_day: Scalars['String']} })
    updateReview?: (ReviewGenqlSelection & { __args: {dish_name: Scalars['String'], id: Scalars['Int'], rate: Scalars['Int'], review: Scalars['String'], user_id: Scalars['Int']} })
    updateSauces?: (SaucesGenqlSelection & { __args: {id: Scalars['Int'], status: Scalars['String'], title: Scalars['String']} })
    updateSideDish?: (SideDishGenqlSelection & { __args: {description?: (Scalars['String'] | null), id: Scalars['Int'], status: Scalars['String'], title: Scalars['String'], type: Scalars['String']} })
    updateUser?: (UsersGenqlSelection & { __args: {address?: (Scalars['String'] | null), coupon_id: Scalars['Int'], email: Scalars['String'], first_name: Scalars['String'], id: Scalars['Int'], is_update: Scalars['Boolean'], last_name: Scalars['String'], phone: Scalars['String'], role: Scalars['String']} })
    updateUserImage?: (UsersGenqlSelection & { __args: {id: Scalars['Int'], image?: (Scalars['String'] | null)} })
    updateUserProfile?: (UsersGenqlSelection & { __args: {first_name: Scalars['String'], id: Scalars['Int'], last_name: Scalars['String'], phone: Scalars['String']} })
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
    combo_price?: boolean | number
    comment?: boolean | number
    coupon?: CouponsGenqlSelection
    customer?: UsersGenqlSelection
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
    is_dish?: boolean | number
    price?: boolean | number
    sauces?: boolean | number
    small_img?: boolean | number
    status?: boolean | number
    title?: boolean | number
    week_day?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ProductInput {dish_type: Scalars['String'],price: Scalars['Float'],product_id: Scalars['Int']}

export interface QueryGenqlSelection{
    box?: (BoxesGenqlSelection & { __args: {id: Scalars['Int']} })
    boxes?: BoxesGenqlSelection
    checkDomain?: (CheckUserDomainGenqlSelection & { __args: {id: Scalars['Int']} })
    checkDomains?: CheckUserDomainGenqlSelection
    checkEmail?: (CheckUserEmailGenqlSelection & { __args: {id: Scalars['Int']} })
    checkEmails?: CheckUserEmailGenqlSelection
    checkUser?: CheckUserGenqlSelection
    comboById?: (ComboGenqlSelection & { __args: {id: Scalars['Int']} })
    combosList?: ComboGenqlSelection
    coupon?: (CouponsGenqlSelection & { __args: {id: Scalars['Int']} })
    coupons?: CouponsGenqlSelection
    domain?: (DomainGenqlSelection & { __args: {id: Scalars['Int']} })
    domains?: DomainGenqlSelection
    office?: (OfficeGenqlSelection & { __args: {id: Scalars['Int']} })
    offices?: OfficeGenqlSelection
    officesByCoupon?: (OfficeGenqlSelection & { __args: {coupon_id: Scalars['Int']} })
    order?: (OrdersGenqlSelection & { __args: {id: Scalars['Int']} })
    orderCustomerId?: (OrdersGenqlSelection & { __args: {customer_id: Scalars['Int'], id: Scalars['Int']} })
    orders?: OrdersGenqlSelection
    ordersByBox?: OrdersGenqlSelection
    ordersByCoupon?: (OrdersGenqlSelection & { __args: {coupon_id: Scalars['Int']} })
    ordersByCouponDate?: (OrdersGenqlSelection & { __args: {coupon_id: Scalars['Int'], date_end: Scalars['String'], date_start: Scalars['String']} })
    ordersByCustomerId?: (OrdersGenqlSelection & { __args: {customer_id: Scalars['Int']} })
    ordersByStatus?: (OrdersGenqlSelection & { __args: {limit?: (Scalars['Int'] | null), offset?: (Scalars['Int'] | null), status: Scalars['String']} })
    ordersCheckById?: (OrdersGenqlSelection & { __args: {customer_id: Scalars['Int'], status: Scalars['String']} })
    product?: (ProductGenqlSelection & { __args: {id: Scalars['Int']} })
    products?: ProductGenqlSelection
    review?: (ReviewGenqlSelection & { __args: {id: Scalars['Int']} })
    reviews?: ReviewGenqlSelection
    sauce?: (SaucesGenqlSelection & { __args: {id: Scalars['Int']} })
    sauces?: SaucesGenqlSelection
    sideDish?: (SideDishGenqlSelection & { __args: {id: Scalars['Int']} })
    sideDishes?: SideDishGenqlSelection
    totalCount?: { __args: {status: Scalars['String']} }
    user?: (UsersGenqlSelection & { __args: {email: Scalars['String']} })
    userId?: (UsersGenqlSelection & { __args: {id: Scalars['Int']} })
    userReviews?: (ReviewGenqlSelection & { __args: {user_id: Scalars['Int']} })
    users?: UsersGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ReviewGenqlSelection{
    date_created?: boolean | number
    dish_name?: boolean | number
    id?: boolean | number
    rate?: boolean | number
    review?: boolean | number
    user?: UsersGenqlSelection
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
    description?: boolean | number
    id?: boolean | number
    status?: boolean | number
    title?: boolean | number
    type?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UsersGenqlSelection{
    address?: boolean | number
    coupon?: CouponsGenqlSelection
    date_created?: boolean | number
    email?: boolean | number
    first_name?: boolean | number
    id?: boolean | number
    image?: boolean | number
    is_update?: boolean | number
    last_name?: boolean | number
    phone?: boolean | number
    role?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


    const Boxes_possibleTypes: string[] = ['Boxes']
    export const isBoxes = (obj?: { __typename?: any } | null): obj is Boxes => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isBoxes"')
      return Boxes_possibleTypes.includes(obj.__typename)
    }
    


    const CheckUser_possibleTypes: string[] = ['CheckUser']
    export const isCheckUser = (obj?: { __typename?: any } | null): obj is CheckUser => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCheckUser"')
      return CheckUser_possibleTypes.includes(obj.__typename)
    }
    


    const CheckUserDomain_possibleTypes: string[] = ['CheckUserDomain']
    export const isCheckUserDomain = (obj?: { __typename?: any } | null): obj is CheckUserDomain => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCheckUserDomain"')
      return CheckUserDomain_possibleTypes.includes(obj.__typename)
    }
    


    const CheckUserEmail_possibleTypes: string[] = ['CheckUserEmail']
    export const isCheckUserEmail = (obj?: { __typename?: any } | null): obj is CheckUserEmail => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isCheckUserEmail"')
      return CheckUserEmail_possibleTypes.includes(obj.__typename)
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
    


    const Domain_possibleTypes: string[] = ['Domain']
    export const isDomain = (obj?: { __typename?: any } | null): obj is Domain => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDomain"')
      return Domain_possibleTypes.includes(obj.__typename)
    }
    


    const DomainCombo_possibleTypes: string[] = ['DomainCombo']
    export const isDomainCombo = (obj?: { __typename?: any } | null): obj is DomainCombo => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDomainCombo"')
      return DomainCombo_possibleTypes.includes(obj.__typename)
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
    


    const Review_possibleTypes: string[] = ['Review']
    export const isReview = (obj?: { __typename?: any } | null): obj is Review => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isReview"')
      return Review_possibleTypes.includes(obj.__typename)
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
    