import Container from "@/app/components/Container";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import getOrders from "@/actions/getOrders";
import OrdersClient from "./OrderClient";
import getOrdersByUserId from "@/actions/getOrdersByUserId";



const Orders = async() => {
  const currentUser = await getCurrentUser();

  if(!currentUser){
    return <NullData title="Oops! Acesso negado!"/>
  }

  const orders = await getOrdersByUserId(currentUser.id)

  if(!orders){
    return <NullData title="Sem pedidos aqui!"/>
  }
    return( 
        <div className="pt-8">
          <Container>
            <OrdersClient />
          </Container>  
        </div>
    )
}

export default Orders;