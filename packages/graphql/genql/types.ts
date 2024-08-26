export default {
    "scalars": [
        1,
        2,
        7,
        10
    ],
    "types": {
        "Boxes": {
            "combo_id": [
                1
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
                1
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
        "Int": {},
        "String": {},
        "CheckUser": {
            "checkDomain": [
                4
            ],
            "checkEmail": [
                5
            ],
            "coupons": [
                9
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
            "domain_id": [
                1
            ],
            "id": [
                1
            ],
            "image": [
                2
            ],
            "price": [
                7
            ],
            "products": [
                15
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
        "Float": {},
        "ComboProduct": {
            "combo_id": [
                1
            ],
            "dish_type": [
                2
            ],
            "price": [
                7
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
            "domain": [
                11
            ],
            "expiration_date": [
                2
            ],
            "has_domain": [
                10
            ],
            "id": [
                1
            ],
            "office": [
                13
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
            "discount": [
                7
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
        "Mutation": {
            "addCombo": [
                6,
                {
                    "description": [
                        2
                    ],
                    "domain_id": [
                        1,
                        "Int!"
                    ],
                    "image": [
                        2,
                        "String!"
                    ],
                    "price": [
                        7,
                        "Float!"
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
                8,
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
                        7,
                        "Float!"
                    ],
                    "product_id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "addCoupon": [
                9,
                {
                    "address": [
                        2,
                        "String!"
                    ],
                    "domain_id": [
                        1,
                        "Int!"
                    ],
                    "expiration_date": [
                        2
                    ],
                    "has_domain": [
                        10,
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
                11,
                {
                    "discount": [
                        7,
                        "Float!"
                    ],
                    "expired_date": [
                        2,
                        "String!"
                    ],
                    "title": [
                        2,
                        "String!"
                    ]
                }
            ],
            "addOffice": [
                13,
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
                17,
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
                18,
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
                19,
                {
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
                20,
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
                0,
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
                        1,
                        "Int!"
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
                4,
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
                5,
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
            "createOrder": [
                14,
                {
                    "address": [
                        2
                    ],
                    "combo_price": [
                        7,
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
                        7,
                        "Float!"
                    ],
                    "status": [
                        2,
                        "String!"
                    ]
                }
            ],
            "createProduct": [
                15,
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
                    "price": [
                        7,
                        "Float!"
                    ],
                    "sauces": [
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
                    "week_day": [
                        2,
                        "String!"
                    ]
                }
            ],
            "deleteBox": [
                10,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "deleteBoxCombo": [
                10,
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
                10,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "deleteCheckEmail": [
                10,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "deleteCombo": [
                6,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "deleteComboProduct": [
                10,
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
                10,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "deleteOffice": [
                10,
                {
                    "coupon_id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "deleteOrder": [
                10,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "deleteProduct": [
                10,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "deleteReview": [
                10,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "deleteSauces": [
                10,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "deleteSideDish": [
                10,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "deleteUser": [
                10,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "deleteUserReview": [
                10,
                {
                    "user_id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "updateBox": [
                0,
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
                        1,
                        "Int!"
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
            "updateCheckDomain": [
                4,
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
                5,
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
                6,
                {
                    "description": [
                        2
                    ],
                    "domain_id": [
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
                    "price": [
                        7,
                        "Float!"
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
                9,
                {
                    "address": [
                        2,
                        "String!"
                    ],
                    "domain_id": [
                        1,
                        "Int!"
                    ],
                    "expiration_date": [
                        2
                    ],
                    "has_domain": [
                        10,
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
                11,
                {
                    "discount": [
                        7,
                        "Float!"
                    ],
                    "expired_date": [
                        2,
                        "String!"
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
                13,
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
                14,
                {
                    "address": [
                        2
                    ],
                    "combo_price": [
                        7,
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
                        7,
                        "Float!"
                    ],
                    "status": [
                        2,
                        "String!"
                    ]
                }
            ],
            "updateOrderPrice": [
                14,
                {
                    "id": [
                        1,
                        "Int!"
                    ],
                    "price": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "updateProduct": [
                15,
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
                    "price": [
                        7,
                        "Float!"
                    ],
                    "sauces": [
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
                    "week_day": [
                        2,
                        "String!"
                    ]
                }
            ],
            "updateReview": [
                17,
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
                18,
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
                19,
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
                    ],
                    "type": [
                        2,
                        "String!"
                    ]
                }
            ],
            "updateUser": [
                20,
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
                    "image": [
                        2
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
                20,
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
                7
            ],
            "comment": [
                2
            ],
            "coupon_id": [
                1
            ],
            "customer_id": [
                1
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
                7
            ],
            "products": [
                0
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
            "price": [
                7
            ],
            "sauces": [
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
        "Query": {
            "box": [
                0,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "boxes": [
                0
            ],
            "checkDomain": [
                4,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "checkDomains": [
                4
            ],
            "checkEmail": [
                5,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "checkEmails": [
                5
            ],
            "checkUser": [
                3
            ],
            "comboById": [
                6,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "combosByCoupon": [
                6,
                {
                    "domain_id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "combosList": [
                6
            ],
            "coupon": [
                9,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "coupons": [
                9
            ],
            "domain": [
                11,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "domains": [
                11
            ],
            "office": [
                13,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "offices": [
                13
            ],
            "officesByCoupon": [
                13,
                {
                    "coupon_id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "order": [
                14,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "orderCustomerId": [
                14,
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
                14
            ],
            "ordersByCustomerId": [
                14,
                {
                    "customer_id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "product": [
                15,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "products": [
                15
            ],
            "review": [
                17,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "reviews": [
                17
            ],
            "sauce": [
                18,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "sauces": [
                18
            ],
            "sideDish": [
                19,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "sideDishes": [
                19
            ],
            "user": [
                20,
                {
                    "email": [
                        2,
                        "String!"
                    ]
                }
            ],
            "userReviews": [
                17,
                {
                    "user_id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "users": [
                20
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
            "user_id": [
                1
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
                9
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