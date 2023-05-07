
import HomePage from "pages/home/HomePage";

import MainLayout from "shared/components/layout/MainLayout";

import { AdminGuard } from "./guards/AdminGuard";
import { GuestGuard } from "./guards/AdminGuard";
// import Supplier from "pages/supplier/Supplier";

import DetailSupplier from "pages/detailSupplier/DetailSupplier";
import ListSupplier from "pages/listSupplier/ListSupplier";
import AddSupplier from "pages/addSupplier/AddSupplier";

const Routes = [
    {
        layout: MainLayout,
        routes: [



            // {
            //     id: 'SUPPLIER',

            //     guards: [AdminGuard],
            //     component: <Supplier routes={[
            //         {
            //             id: 'SUPPLIER_LIST',

            //             guards: [AdminGuard],
            //             component: <ListSupplier />,
            //             fallback: () =>
            //             {
            //                 return null;
            //             }
            //         },
            //         {
            //             id: 'SUPPLIER_DETAIL',

            //             guards: [AdminGuard],
            //             component: <DetailSupplier />,
            //             fallback: () =>
            //             {
            //                 return null;
            //             }
            //         },
            //     ]} />,
            //     fallback: () =>
            //     {
            //         return null;
            //     }
            // },

            {
                id: 'DETAIL',
                title: 'Chi tiết',
                guards: [AdminGuard],
                component: <DetailSupplier />,
                fallback: () =>
                {
                    return null;
                }
            },
            {
                id: 'ADD',
                title: 'Thêm',
                guards: [AdminGuard],
                component: <AddSupplier />,
                fallback: () =>
                {
                    return null;
                }
            },
            {
                id: 'EDIT',
                title: 'sua',
                guards: [AdminGuard],
                component: <AddSupplier />,
                fallback: () =>
                {
                    return null;
                }
            },
            {
                id: 'LIST',
                title: 'Danh sách',
                guards: [AdminGuard],
                component: <ListSupplier />,
                fallback: () =>
                {
                    return null;
                }
            },
            {
                id: 'HOME',
                guards: [AdminGuard],
                component: <HomePage routes={[]} />,
                fallback: () =>
                {
                    return null;
                },


            },

        ]
    },
];

export default Routes