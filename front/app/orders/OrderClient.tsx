'use client'
import { Order, User } from "@prisma/client";
import { useCallback } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone, MdRemoveRedEye } from "react-icons/md";
import ActionBtn from "@/app/components/ActionBtn";
import { useRouter } from "next/navigation";


interface OrdersClientProps {
    orders: ExtendedOrder[];
}

type ExtendedOrder = Order & {
    user: User
}

const OrdersClient = () => {
    const router = useRouter();
    let rows: any = [];

    // if (orders) {
    //     rows = orders.map((order) => {
    //         return {
    //             id: order.id,
    //             custumer: order.user.name,
    //             amount: formatPrice(order.amount / 100),
    //             paymentStatus: order.status,
    //             date: moment(order.createDate).fromNow(),
    //             deliverStatus: order.deliveryStatus,
    //         };
    //     });
    // }

    let columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 220 },
        { field: 'customer', headerName: 'Nome do Cliente', width: 130 },
        {
            field: 'amount', headerName: 'Total', width: 130, renderCell: (params) => {
                return (<div className="font-bold text-slate-800">{params.row.amount}</div>)
            }
        },
        {
            field: 'paymentStatus', headerName: 'Status do Pagamento', width: 130, renderCell: (params) => {
                return (
                    <div className="my-1">
                        {params.row.paymentStatus === 'pending' ? (<Status text="Pendente" icon={MdAccessTimeFilled} bg="bg-slate-200" color="text-slate-700" />) :
                            params.row.paymentStatus === 'complete' ? (<Status text="Completo" icon={MdDone} bg="bg-purple-200" color="text-purple-700" />) : <></>}
                    </div>
                );
            }
        },
        {
            field: 'deliverStatus', headerName: 'Status do Delivery', width: 130, renderCell: (params) => {
                return (
                    <div className="my-1">
                        {params.row.deliverStatus === 'pending' ? (<Status text="Pendente" icon={MdAccessTimeFilled} bg="bg-slate-200" color="text-slate-700" />) :
                            params.row.deliverStatus === 'dispatched' ? (<Status text="Enviado" icon={MdDeliveryDining} bg="bg-purple-200" color="text-purple-700" />) :
                                 params.row.deliverStatus === 'delivered' ? (<Status text="Entregue" icon={MdDone} bg="bg-green-200" color="text-green-700" />) : <></>}
                    </div>
                );
            }
        },
        { field: 'date', headerName: 'Data', width: 130 },
        {
            field: 'action', headerName: 'Ação', width: 200, renderCell: (params) => {
                return (
                    <div className="flex justify-between gap-4 w-full">
                        <ActionBtn icon={MdRemoveRedEye} onClick={() => {
                            router.push(`order/${params.row.id}`)
                        }} />
                    </div>
                );
            }
        },
    ];
    const paginationModel = { page: 0, pageSize: 9 };
    return (
        <div className="max-w-[1150px] m-auto text-xl">
            <div className="mb-4 mt-8">
                <Heading title="Pedidos" center />
            </div>
            <div style={{ height: 600, width: '100%' }}>
                <Paper sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={[9, 20]}
                        checkboxSelection
                        sx={{ border: 0 }}
                    />
                </Paper>
            </div>
        </div>
    )
}

export default OrdersClient;