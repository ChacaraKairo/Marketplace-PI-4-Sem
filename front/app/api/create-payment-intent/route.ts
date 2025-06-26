import Stripe from "stripe";
import { prisma } from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { products } from "@/utils/products";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2025-04-30.basil'
});

const calculateOrderAmount = (items:  CartProductType[]) => {
    const totalPrice = items.reduce((acc, item) => {
        const itemTotal =  item.price * item.quantity;
        return acc + itemTotal;
    }, 0);
    return totalPrice;
};

export async function POST(request: Request){
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    const body = await request.json()
    const {items, payment_intent_id} = body
    const total = calculateOrderAmount(items) * 100
    const orderData = {
        user: {connect: {id: currentUser.id}},
        amount: total,
        currency: 'brl',
        status: "pendente",
        deliveryStatus: "pendente",
        paymentIntentId: payment_intent_id,
        products: items,
    };

    if(payment_intent_id){
        const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id);

        if(current_intent){
            const updated_intent = await stripe.paymentIntents.update(payment_intent_id, {amount: total});
            //Atualizar o pedido
    
            const[existing_order, update_order] = await Promise.all([
                prisma.order.findFirst({
                    where: {paymentIntentId: payment_intent_id}
                }),
                prisma.order.update({
                    where: {paymentIntentId: payment_intent_id},
                    data: {
                        amount: total,
                        products: items,
                    },
                }),
            ]);
            if(!existing_order){
                return NextResponse.json(
                    {error: 'Intensão de pagamento inválido'},
                    {status: 400}
                );
            }
            return NextResponse.json({paymentIntent: updated_intent});
        }
    }else{
        //Criar a intenção
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: "brl",
            automatic_payment_methods: {enabled: true},
        });
        //Criar o pedido
        orderData.paymentIntentId = paymentIntent.id;

        await prisma.order.create({
            data: orderData,
        });
        return NextResponse.json({paymentIntent});
    }
}