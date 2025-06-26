import { prisma } from "@/libs/prismadb";

export interface IProductParams{
    category?: string | null;
    searchTerm?: string | null;
}

export default async function getOrders() {
    try{
        const orders = await prisma.order.findMany({
            include:{
                user: true
            },
            orderBy: {
                createDate: 'desc'
            }
        })
        return orders
    } catch(error: any){
        throw new Error(error)
    }
}