'use client'
import { Product } from "@prisma/client";
import { useCallback } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { formatPrice } from "@/utils/formatPrice";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { MdCached, MdClose, MdDelete, MdDone, MdRemoveRedEye } from "react-icons/md";
import ActionBtn from "@/app/components/ActionBtn";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ManageProductsClientProps {
    products: Product[]
}

const ManageProductsClient: React.FC<ManageProductsClientProps> = ({ products }) => {
    const router = useRouter();
    let rows: any = [];

    if (products) {
        rows = products.map((product) => {
            return {
                id: product.id,
                name: product.name,
                price: formatPrice(product.price),
                category: product.category,
                brand: product.brand,
                inStock: product.inStock,
                images: product.imageUrl,
            };
        });
    }

    let columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 220 },
        { field: 'name', headerName: 'Nome', width: 220 },
        {
            field: 'price', headerName: 'Preço', width: 100, renderCell: (params) => {
                return (<div className="font-bold text-slate-800">{params.row.price}</div>)
            }
        },
        { field: 'category', headerName: 'Categoria', width: 100 },
        { field: 'brand', headerName: 'Marca', width: 100 },
        {
            field: 'inStock', headerName: 'Em estoque', width: 150, renderCell: (params) => {
                return (
                    <div className="my-1">
                        {params.row.inStock === true ? <Status text="Em estoque" icon={MdDone} bg="bg-teal-200" color="text-teal-700" /> :
                            <Status text="Fora de estoque" icon={MdClose} bg="bg-rose-200" color="text-rose-700" />}
                    </div>
                );
            }
        },
        {
            field: 'action', headerName: 'Ação', width: 200, renderCell: (params) => {
                return (
                    <div className="flex justify-between gap-4 w-full">
                        <ActionBtn icon={MdCached} onClick={() => { handleToggleStock(params.row.id, params.row.inStock) }} />
                        <ActionBtn icon={MdDelete} onClick={() => { handleDelete(params.row.id, params.row.images)}} />                       
                    </div>
                );
            }
        },
    ];
    //Função para Mudar o status do estoque
    const handleToggleStock = useCallback((id: string, inStock: boolean) => {
        axios.put('/api/product', {
            id,
            inStock: !inStock
        }).then((res) => {
            toast.success("Produto com status alterado!")
            router.refresh();
        }).catch((err) => {
            toast.error("Oops! Algo está errado!")
        });
    }, []);
    //Função para deletar o produto da tabela
    const handleDelete = useCallback((id: string, images: any[]) => {
        toast("Deletando produto, por favor espere");

        // const handleImageDelete = async() => {
        //     try{
        //         for(const item of images){
        //             if(item.image){

        //             }
        //         }
        //     } catch (error){
        //         return console.log("Erro ao deletar as imagens", err)
        //     }
        // }

        axios.delete(`/api/product/${id}`).then((res) => {
            toast.success("Produto Deletado");
            router.refresh();
        }).catch((err) => {
            toast.error("Erro ao deletar o produto!");
            console.log(err);
        });
    }, []);



    const paginationModel = { page: 0, pageSize: 9 };
    return (
        <div className="max-w-[1150px] m-auto text-xl">
            <div className="mb-4 mt-8">
                <Heading title="Gerenciar Produtos" center />
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

export default ManageProductsClient;