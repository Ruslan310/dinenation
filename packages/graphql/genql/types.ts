export default {
    "scalars": [
        1,
        2,
        3,
        11
    ],
    "types": {
        "BoxInput": {
            "combo_id": [
                1
            ],
            "image": [
                2
            ],
            "office": [
                2
            ],
            "price": [
                3
            ],
            "sauce": [
                2
            ],
            "side_dish": [
                2
            ],
            "side_dish_type": [
                2
            ],
            "small_img": [
                2
            ],
            "sticker": [
                2
            ],
            "type": [
                2
            ],
            "week_day": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "Int": {},
        "String": {},
        "Float": {},
        "Boxes": {
            "combo_id": [
                1
            ],
            "date_updated": [
                2
            ],
            "id": [
                1
            ],
            "image": [
                2
            ],
            "office": [
                2
            ],
            "order_id": [
                1
            ],
            "price": [
                3
            ],
            "sauce": [
                2
            ],
            "side_dish": [
                2
            ],
            "side_dish_type": [
                2
            ],
            "small_img": [
                2
            ],
            "status": [
                2
            ],
            "sticker": [
                2
            ],
            "type": [
                2
            ],
            "week_day": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "CheckUser": {
            "checkDomain": [
                6
            ],
            "checkEmail": [
                7
            ],
            "coupons": [
                10
            ],
            "__typename": [
                2
            ]
        },
        "CheckUserDomain": {
            "coupon_id": [
                1
            ],
            "domain": [
                2
            ],
            "id": [
                1
            ],
            "__typename": [
                2
            ]
        },
        "CheckUserEmail": {
            "coupon_id": [
                1
            ],
            "email": [
                2
            ],
            "id": [
                1
            ],
            "__typename": [
                2
            ]
        },
        "Combo": {
            "description": [
                2
            ],
            "id": [
                1
            ],
            "image": [
                2
            ],
            "price": [
                3
            ],
            "products": [
                17
            ],
            "status": [
                2
            ],
            "title": [
                2
            ],
            "type": [
                2
            ],
            "week_day": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "ComboProduct": {
            "combo_id": [
                1
            ],
            "dish_type": [
                2
            ],
            "price": [
                3
            ],
            "product_id": [
                1
            ],
            "__typename": [
                2
            ]
        },
        "Coupons": {
            "address": [
                2
            ],
            "check_order": [
                11
            ],
            "domain": [
                12
            ],
            "expiration_date": [
                2
            ],
            "has_domain": [
                11
            ],
            "hide_price": [
                11
            ],
            "id": [
                1
            ],
            "office": [
                15
            ],
            "status": [
                2
            ],
            "title": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "Boolean": {},
        "Domain": {
            "combos": [
                8
            ],
            "discount": [
                3
            ],
            "expired_date": [
                2
            ],
            "id": [
                1
            ],
            "title": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "DomainCombo": {
            "combo_id": [
                1
            ],
            "domain_id": [
                1
            ],
            "id": [
                1
            ],
            "__typename": [
                2
            ]
        },
        "Mutation": {
            "addCombo": [
                8,
                {
                    "description": [
                        2
                    ],
                    "image": [
                        2,
                        "String!"
                    ],
                    "price": [
                        3,
                        "Float!"
                    ],
                    "products": [
                        18,
                        "[ProductInput!]!"
                    ],
                    "status": [
                        2,
                        "String!"
                    ],
                    "title": [
                        2,
                        "String!"
                    ],
                    "type": [
                        2,
                        "String!"
                    ],
                    "week_day": [
                        2,
                        "String!"
                    ]
                }
            ],
            "addComboProducts": [
                9,
                {
                    "combo_id": [
                        1,
                        "Int!"
                    ],
                    "dish_type": [
                        2,
                        "String!"
                    ],
                    "price": [
                        3,
                        "Float!"
                    ],
                    "product_id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "addCoupon": [
                10,
                {
                    "address": [
                        2,
                        "String!"
                    ],
                    "check_order": [
                        11,
                        "Boolean!"
                    ],
                    "domain_id": [
                        1,
                        "Int!"
                    ],
                    "expiration_date": [
                        2
                    ],
                    "has_domain": [
                        11,
                        "Boolean!"
                    ],
                    "hide_price": [
                        11,
                        "Boolean!"
                    ],
                    "status": [
                        2,
                        "String!"
                    ],
                    "title": [
                        2,
                        "String!"
                    ]
                }
            ],
            "addDomain": [
                12,
                {
                    "discount": [
                        3
                    ],
                    "expired_date": [
                        2
                    ],
                    "title": [
                        2,
                        "String!"
                    ]
                }
            ],
            "addDomainCombo": [
                13,
                {
                    "combo_id": [
                        1,
                        "Int!"
                    ],
                    "domain_id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "addOffice": [
                15,
                {
                    "coupon_id": [
                        1,
                        "Int!"
                    ],
                    "title": [
                        2,
                        "String!"
                    ]
                }
            ],
            "addReview": [
                20,
                {
                    "dish_name": [
                        2,
                        "String!"
                    ],
                    "rate": [
                        1,
                        "Int!"
                    ],
                    "review": [
                        2,
                        "String!"
                    ],
                    "user_id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "addSauce": [
                21,
                {
                    "status": [
                        2,
                        "String!"
                    ],
                    "title": [
                        2,
                        "String!"
                    ]
                }
            ],
            "addSideDish": [
                22,
                {
                    "description": [
                        2
                    ],
                    "status": [
                        2,
                        "String!"
                    ],
                    "title": [
                        2,
                        "String!"
                    ],
                    "type": [
                        2,
                        "String!"
                    ]
                }
            ],
            "addUser": [
                23,
                {
                    "address": [
                        2
                    ],
                    "coupon_id": [
                        1,
                        "Int!"
                    ],
                    "email": [
                        2,
                        "String!"
                    ],
                    "first_name": [
                        2,
                        "String!"
                    ],
                    "last_name": [
                        2,
                        "String!"
                    ],
                    "phone": [
                        2,
                        "String!"
                    ]
                }
            ],
            "createBox": [
                4,
                {
                    "combo_id": [
                        1,
                        "Int!"
                    ],
                    "image": [
                        2,
                        "String!"
                    ],
                    "office": [
                        2
                    ],
                    "order_id": [
                        1,
                        "Int!"
                    ],
                    "price": [
                        3,
                        "Float!"
                    ],
                    "sauce": [
                        2
                    ],
                    "side_dish": [
                        2
                    ],
                    "side_dish_type": [
                        2
                    ],
                    "small_img": [
                        2,
                        "String!"
                    ],
                    "sticker": [
                        2,
                        "String!"
                    ],
                    "type": [
                        2,
                        "String!"
                    ],
                    "week_day": [
                        2,
                        "String!"
                    ]
                }
            ],
            "createCheckDomain": [
                6,
                {
                    "coupon_id": [
                        1,
                        "Int!"
                    ],
                    "domain": [
                        2,
                        "String!"
                    ]
                }
            ],
            "createCheckEmail": [
                7,
                {
                    "coupon_id": [
                        1,
                        "Int!"
                    ],
                    "email": [
                        2,
                        "String!"
                    ]
                }
            ],
            "createOrderWithBoxes": [
                16,
                {
                    "address": [
                        2
                    ],
                    "boxes": [
                        0,
                        "[BoxInput!]!"
                    ],
                    "combo_price": [
                        3,
                        "Float!"
                    ],
                    "comment": [
                        2
                    ],
                    "coupon_id": [
                        1,
                        "Int!"
                    ],
                    "customer_id": [
                        1,
                        "Int!"
                    ],
                    "price": [
                        3,
                        "Float!"
                    ]
                }
            ],
            "createProduct": [
                17,
                {
                    "allergens": [
                        2
                    ],
                    "calories": [
                        2
                    ],
                    "categories": [
                        2,
                        "String!"
                    ],
                    "description": [
                        2
                    ],
                    "dish_type": [
                        2,
                        "String!"
                    ],
                    "image": [
                        2,
                        "String!"
                    ],
                    "is_dish": [
                        11,
                        "Boolean!"
                    ],
                    "price": [
                        3,
                        "Float!"
                    ],
                    "sauces": [
                        2
                    ],
                    "small_img": [
                        2,
                        "String!"
                    ],
                    "status": [
                        2,
                        "String!"
                    ],
                    "title": [
                        2,
                        "String!"
                    ],
                    "week_day": [
                        2,
                        "String!"
                    ]
                }
            ],
            "deleteBox": [
                11,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "deleteBoxCombo": [
                11,
                {
                    "combo_id": [
                        1,
                        "Int!"
                    ],
                    "order_id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "deleteCheckDomain": [
                11,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "deleteCheckEmail": [
                11,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "deleteCombo": [
                8,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "deleteComboProduct": [
                11,
                {
                    "combo_id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "deleteCoupon": [
                10,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "deleteDomain": [
                11,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "deleteDomainCombo": [
                11,
                {
                    "domain_id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "deleteOffice": [
                11,
                {
                    "coupon_id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "deleteOrder": [
                11,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "deleteProduct": [
                17,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "deleteReview": [
                11,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "deleteSauces": [
                11,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "deleteSideDish": [
                11,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "deleteUser": [
                11,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "deleteUserReview": [
                11,
                {
                    "user_id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "permissionUser": [
                23,
                {
                    "id": [
                        1,
                        "Int!"
                    ],
                    "is_update": [
                        11,
                        "Boolean!"
                    ]
                }
            ],
            "updateBox": [
                4,
                {
                    "combo_id": [
                        1,
                        "Int!"
                    ],
                    "id": [
                        1,
                        "Int!"
                    ],
                    "image": [
                        2,
                        "String!"
                    ],
                    "office": [
                        2
                    ],
                    "order_id": [
                        1,
                        "Int!"
                    ],
                    "price": [
                        3,
                        "Float!"
                    ],
                    "sauce": [
                        2
                    ],
                    "side_dish": [
                        2
                    ],
                    "side_dish_type": [
                        2
                    ],
                    "small_img": [
                        2,
                        "String!"
                    ],
                    "status": [
                        2,
                        "String!"
                    ],
                    "sticker": [
                        2,
                        "String!"
                    ],
                    "type": [
                        2,
                        "String!"
                    ],
                    "week_day": [
                        2,
                        "String!"
                    ]
                }
            ],
            "updateBoxList": [
                11,
                {
                    "list": [
                        1,
                        "[Int!]!"
                    ]
                }
            ],
            "updateCheckDomain": [
                6,
                {
                    "coupon_id": [
                        1,
                        "Int!"
                    ],
                    "domain": [
                        2,
                        "String!"
                    ],
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "updateCheckEmail": [
                7,
                {
                    "coupon_id": [
                        1,
                        "Int!"
                    ],
                    "email": [
                        2,
                        "String!"
                    ],
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "updateCombo": [
                8,
                {
                    "description": [
                        2
                    ],
                    "id": [
                        1,
                        "Int!"
                    ],
                    "image": [
                        2,
                        "String!"
                    ],
                    "price": [
                        3,
                        "Float!"
                    ],
                    "products": [
                        18,
                        "[ProductInput!]!"
                    ],
                    "status": [
                        2,
                        "String!"
                    ],
                    "title": [
                        2,
                        "String!"
                    ],
                    "type": [
                        2,
                        "String!"
                    ],
                    "week_day": [
                        2,
                        "String!"
                    ]
                }
            ],
            "updateCoupon": [
                10,
                {
                    "address": [
                        2,
                        "String!"
                    ],
                    "check_order": [
                        11,
                        "Boolean!"
                    ],
                    "domain_id": [
                        1,
                        "Int!"
                    ],
                    "expiration_date": [
                        2
                    ],
                    "has_domain": [
                        11,
                        "Boolean!"
                    ],
                    "hide_price": [
                        11,
                        "Boolean!"
                    ],
                    "id": [
                        1,
                        "Int!"
                    ],
                    "status": [
                        2,
                        "String!"
                    ],
                    "title": [
                        2,
                        "String!"
                    ]
                }
            ],
            "updateDomain": [
                12,
                {
                    "discount": [
                        3
                    ],
                    "expired_date": [
                        2
                    ],
                    "id": [
                        1,
                        "Int!"
                    ],
                    "title": [
                        2,
                        "String!"
                    ]
                }
            ],
            "updateOffice": [
                15,
                {
                    "coupon_id": [
                        1,
                        "Int!"
                    ],
                    "id": [
                        1,
                        "Int!"
                    ],
                    "title": [
                        2,
                        "String!"
                    ]
                }
            ],
            "updateOrder": [
                16,
                {
                    "address": [
                        2
                    ],
                    "combo_price": [
                        3,
                        "Float!"
                    ],
                    "comment": [
                        2
                    ],
                    "coupon_id": [
                        1,
                        "Int!"
                    ],
                    "customer_id": [
                        1,
                        "Int!"
                    ],
                    "id": [
                        1,
                        "Int!"
                    ],
                    "number": [
                        2,
                        "String!"
                    ],
                    "price": [
                        3,
                        "Float!"
                    ],
                    "status": [
                        2,
                        "String!"
                    ]
                }
            ],
            "updateOrderWithBoxes": [
                16,
                {
                    "boxes": [
                        0,
                        "[BoxInput!]!"
                    ],
                    "combo_id": [
                        1,
                        "Int!"
                    ],
                    "customer_id": [
                        1,
                        "Int!"
                    ],
                    "id": [
                        1,
                        "Int!"
                    ],
                    "price": [
                        3,
                        "Float!"
                    ],
                    "status": [
                        2,
                        "String!"
                    ]
                }
            ],
            "updateProduct": [
                17,
                {
                    "allergens": [
                        2
                    ],
                    "calories": [
                        2
                    ],
                    "categories": [
                        2,
                        "String!"
                    ],
                    "description": [
                        2
                    ],
                    "dish_type": [
                        2,
                        "String!"
                    ],
                    "id": [
                        1,
                        "Int!"
                    ],
                    "image": [
                        2,
                        "String!"
                    ],
                    "is_dish": [
                        11,
                        "Boolean!"
                    ],
                    "price": [
                        3,
                        "Float!"
                    ],
                    "sauces": [
                        2
                    ],
                    "small_img": [
                        2,
                        "String!"
                    ],
                    "status": [
                        2,
                        "String!"
                    ],
                    "title": [
                        2,
                        "String!"
                    ],
                    "week_day": [
                        2,
                        "String!"
                    ]
                }
            ],
            "updateReview": [
                20,
                {
                    "dish_name": [
                        2,
                        "String!"
                    ],
                    "id": [
                        1,
                        "Int!"
                    ],
                    "rate": [
                        1,
                        "Int!"
                    ],
                    "review": [
                        2,
                        "String!"
                    ],
                    "user_id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "updateSauces": [
                21,
                {
                    "id": [
                        1,
                        "Int!"
                    ],
                    "status": [
                        2,
                        "String!"
                    ],
                    "title": [
                        2,
                        "String!"
                    ]
                }
            ],
            "updateSideDish": [
                22,
                {
                    "description": [
                        2
                    ],
                    "id": [
                        1,
                        "Int!"
                    ],
                    "status": [
                        2,
                        "String!"
                    ],
                    "title": [
                        2,
                        "String!"
                    ],
                    "type": [
                        2,
                        "String!"
                    ]
                }
            ],
            "updateUser": [
                23,
                {
                    "address": [
                        2
                    ],
                    "coupon_id": [
                        1,
                        "Int!"
                    ],
                    "email": [
                        2,
                        "String!"
                    ],
                    "first_name": [
                        2,
                        "String!"
                    ],
                    "id": [
                        1,
                        "Int!"
                    ],
                    "is_update": [
                        11,
                        "Boolean!"
                    ],
                    "last_name": [
                        2,
                        "String!"
                    ],
                    "phone": [
                        2,
                        "String!"
                    ],
                    "role": [
                        2,
                        "String!"
                    ]
                }
            ],
            "updateUserImage": [
                23,
                {
                    "id": [
                        1,
                        "Int!"
                    ],
                    "image": [
                        2
                    ]
                }
            ],
            "updateUserProfile": [
                23,
                {
                    "first_name": [
                        2,
                        "String!"
                    ],
                    "id": [
                        1,
                        "Int!"
                    ],
                    "last_name": [
                        2,
                        "String!"
                    ],
                    "phone": [
                        2,
                        "String!"
                    ]
                }
            ],
            "__typename": [
                2
            ]
        },
        "Office": {
            "coupon_id": [
                1
            ],
            "id": [
                1
            ],
            "title": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "Orders": {
            "address": [
                2
            ],
            "combo_price": [
                3
            ],
            "comment": [
                2
            ],
            "coupon": [
                10
            ],
            "customer": [
                23
            ],
            "date_created": [
                2
            ],
            "id": [
                1
            ],
            "number": [
                2
            ],
            "price": [
                3
            ],
            "products": [
                4
            ],
            "status": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "Product": {
            "allergens": [
                2
            ],
            "calories": [
                2
            ],
            "categories": [
                2
            ],
            "description": [
                2
            ],
            "dish_type": [
                2
            ],
            "id": [
                1
            ],
            "image": [
                2
            ],
            "is_dish": [
                11
            ],
            "price": [
                3
            ],
            "sauces": [
                2
            ],
            "small_img": [
                2
            ],
            "status": [
                2
            ],
            "title": [
                2
            ],
            "week_day": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "ProductInput": {
            "dish_type": [
                2
            ],
            "price": [
                3
            ],
            "product_id": [
                1
            ],
            "__typename": [
                2
            ]
        },
        "Query": {
            "box": [
                4,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "boxes": [
                4
            ],
            "boxesDay": [
                4,
                {
                    "week_day": [
                        2,
                        "String!"
                    ]
                }
            ],
            "checkDomain": [
                6,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "checkDomains": [
                6
            ],
            "checkEmail": [
                7,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "checkEmails": [
                7
            ],
            "checkUser": [
                5
            ],
            "comboById": [
                8,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "combosList": [
                8
            ],
            "coupon": [
                10,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "coupons": [
                10
            ],
            "domain": [
                12,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "domains": [
                12
            ],
            "office": [
                15,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "offices": [
                15
            ],
            "officesByCoupon": [
                15,
                {
                    "coupon_id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "order": [
                16,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "orderCustomerId": [
                16,
                {
                    "customer_id": [
                        1,
                        "Int!"
                    ],
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "orders": [
                16
            ],
            "ordersByBox": [
                16
            ],
            "ordersByCoupon": [
                16,
                {
                    "coupon_id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "ordersByCouponDate": [
                16,
                {
                    "coupon_id": [
                        1,
                        "Int!"
                    ],
                    "date_end": [
                        2,
                        "String!"
                    ],
                    "date_start": [
                        2,
                        "String!"
                    ]
                }
            ],
            "ordersByCustomerId": [
                16,
                {
                    "customer_id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "ordersByStatus": [
                16,
                {
                    "limit": [
                        1
                    ],
                    "offset": [
                        1
                    ],
                    "status": [
                        2,
                        "String!"
                    ]
                }
            ],
            "ordersCheckById": [
                16,
                {
                    "customer_id": [
                        1,
                        "Int!"
                    ],
                    "status": [
                        2,
                        "String!"
                    ]
                }
            ],
            "product": [
                17,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "products": [
                17
            ],
            "review": [
                20,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "reviews": [
                20
            ],
            "sauce": [
                21,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "sauces": [
                21
            ],
            "sideDish": [
                22,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "sideDishes": [
                22
            ],
            "totalCount": [
                1,
                {
                    "status": [
                        2,
                        "String!"
                    ]
                }
            ],
            "user": [
                23,
                {
                    "email": [
                        2,
                        "String!"
                    ]
                }
            ],
            "userId": [
                23,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "userReviews": [
                20,
                {
                    "user_id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "users": [
                23
            ],
            "__typename": [
                2
            ]
        },
        "Review": {
            "date_created": [
                2
            ],
            "dish_name": [
                2
            ],
            "id": [
                1
            ],
            "rate": [
                1
            ],
            "review": [
                2
            ],
            "user": [
                23
            ],
            "__typename": [
                2
            ]
        },
        "Sauces": {
            "id": [
                1
            ],
            "status": [
                2
            ],
            "title": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "SideDish": {
            "description": [
                2
            ],
            "id": [
                1
            ],
            "status": [
                2
            ],
            "title": [
                2
            ],
            "type": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "Users": {
            "address": [
                2
            ],
            "coupon": [
                10
            ],
            "date_created": [
                2
            ],
            "email": [
                2
            ],
            "first_name": [
                2
            ],
            "id": [
                1
            ],
            "image": [
                2
            ],
            "is_update": [
                11
            ],
            "last_name": [
                2
            ],
            "phone": [
                2
            ],
            "role": [
                2
            ],
            "__typename": [
                2
            ]
        }
    }
}