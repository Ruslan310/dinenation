export default {
    "scalars": [
        1,
        2,
        14
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
        "Combo": {
            "coupon_id": [
                1
            ],
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
                2
            ],
            "products": [
                9
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
                2
            ],
            "product_id": [
                1
            ],
            "__typename": [
                2
            ]
        },
        "Coupons": {
            "expiration_date": [
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
            "__typename": [
                2
            ]
        },
        "Mutation": {
            "addCombo": [
                3,
                {
                    "coupon_id": [
                        1,
                        "Int!"
                    ],
                    "description": [
                        2
                    ],
                    "image": [
                        2,
                        "String!"
                    ],
                    "price": [
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
                4,
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
                        2,
                        "String!"
                    ],
                    "product_id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "addCoupon": [
                5,
                {
                    "expiration_date": [
                        2
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
            "addOffice": [
                7,
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
            "addSauce": [
                11,
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
                12,
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
                13,
                {
                    "address": [
                        2
                    ],
                    "coupon": [
                        2,
                        "String!"
                    ],
                    "domain_id": [
                        1,
                        "Int!"
                    ],
                    "email": [
                        2,
                        "String!"
                    ],
                    "full_name": [
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
            "createOrder": [
                8,
                {
                    "address": [
                        2
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
                        2,
                        "String!"
                    ],
                    "status": [
                        2,
                        "String!"
                    ]
                }
            ],
            "createProduct": [
                9,
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
                        2,
                        "String!"
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
                0,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "deleteBoxCombo": [
                0,
                {
                    "combo_id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "deleteCombo": [
                3,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "deleteComboProduct": [
                4,
                {
                    "combo_id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "deleteCoupon": [
                5,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "deleteOffice": [
                7,
                {
                    "coupon_id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "deleteOrder": [
                8,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "deleteProduct": [
                9,
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
                12,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "deleteUser": [
                13,
                {
                    "id": [
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
            "updateCombo": [
                3,
                {
                    "coupon_id": [
                        1,
                        "Int!"
                    ],
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
                5,
                {
                    "expiration_date": [
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
                    ]
                }
            ],
            "updateOffice": [
                7,
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
                8,
                {
                    "address": [
                        2
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
                        2,
                        "String!"
                    ],
                    "status": [
                        2,
                        "String!"
                    ]
                }
            ],
            "updateProduct": [
                9,
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
                        2,
                        "String!"
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
            "updateSauces": [
                11,
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
                12,
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
                13,
                {
                    "address": [
                        2
                    ],
                    "coupon": [
                        2,
                        "String!"
                    ],
                    "domain_id": [
                        1,
                        "Int!"
                    ],
                    "email": [
                        2,
                        "String!"
                    ],
                    "full_name": [
                        2,
                        "String!"
                    ],
                    "id": [
                        1,
                        "Int!"
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
                2
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
                2
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
            "comboById": [
                3,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "combosByCoupon": [
                3,
                {
                    "coupon_id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "combosList": [
                3
            ],
            "coupon": [
                5,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "coupons": [
                5
            ],
            "office": [
                7,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "offices": [
                7
            ],
            "officesByCoupon": [
                7,
                {
                    "coupon_id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "order": [
                8,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "orderCustomerId": [
                8,
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
                8
            ],
            "ordersByCustomerId": [
                8,
                {
                    "customer_id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "product": [
                9,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "products": [
                9
            ],
            "sauce": [
                11,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "sauces": [
                11
            ],
            "sideDish": [
                12,
                {
                    "id": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "sideDishes": [
                12
            ],
            "user": [
                13,
                {
                    "email": [
                        2,
                        "String!"
                    ]
                }
            ],
            "users": [
                13
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
                2
            ],
            "domain_id": [
                1
            ],
            "email": [
                2
            ],
            "full_name": [
                2
            ],
            "id": [
                1
            ],
            "phone": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "Boolean": {}
    }
}