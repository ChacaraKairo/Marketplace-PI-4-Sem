'use client'
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { products } from "@/utils/products";
import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import TextArea from "../components/inputs/TextArea";
import CustomCheckBox from "../components/inputs/CustomCheckBox";
import CategoryInput from "../components/inputs/CategoryInput";
import { FieldValues, useForm } from "react-hook-form";
import { MdCreditCard, MdOutlinePix } from "react-icons/md";
import { AiOutlineBarcode } from "react-icons/ai";
import InputAddress from "../components/inputs/InputAddress";
import Button from "../components/Button";

const CheckoutClient = () => {
    const router = useRouter();
    const {cartProducts, paymentIntent, handleSetPaymentIntent} = useCart();
    const [isSelected, setIsSelected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [clientSecret, setClientSecret] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
            defaultValues: {
                name: "",
                city: "",
                country: ""
            },
        });
    const [cep, setCep] = useState('');
    const [address, setAddress] = useState({
    logradouro: '',
    bairro: '',
    localidade: '',
    uf: '',
    });

    const [frete, setFrete] = useState<number | null>(null);

    const calcularFrete = () => {
        // Gera valor aleatório entre 5 e 15
        const valor = (Math.random() * (15 - 5) + 5).toFixed(2);
        setFrete(parseFloat(valor));
    };

  useEffect(() => {
    const fetchAddress = async () => {
      if (cep.length === 8) {
        try {
          const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
          const data = await response.json();

          if (!data.erro) {
            setAddress({
              logradouro: data.logradouro || '',
              bairro: data.bairro || '',
              localidade: data.localidade || '',
              uf: data.uf || '',
            });
          }
        } catch (error) {
          console.error('Erro ao buscar endereço:', error);
        }
      }
    };

    fetchAddress();
  }, [cep]);


    // useEffect(() => {
    //     if(cartProducts){
    //         setIsLoading(true);
    //         setError(false);

    //         fetch("/api/create-payment-intent", {
    //             method: "POST",
    //             headers: {"Content-Type": "aplication/json"},
    //             body: JSON.stringify({
    //                 items: cartProducts,
    //                 payment_intent_id: paymentIntent,
    //             })
    //         }).then((res) => {
    //             setIsLoading(false);
    //             if(res.status === 401){
    //                 return router.push('/login')
    //             }
    //             return res.json()
                
    //         }).then((data) => {
    //             setClientSecret(data.paymentIntent.client_secret);
    //             handleSetPaymentIntent(data.paymentIntent.id)
    //         }).catch((error) => {
    //             setError(true);
    //             console.log("Error", error)
    //             toast.error("Algo está errado!")
    //         })
    //     }

    // }, [cartProducts, paymentIntent]);

    return(
        <>
            <Heading title="Checkout" center/>
            <InputAddress id="name" label="Nome Completo" disabled={isLoading} errors={errors} required/>
            <input
                type="text"
                placeholder="Digite o CEP (somente números)"
                value={cep}
                onChange={(e) => setCep(e.target.value.replace(/\D/g, ''))}
                className={`peer w-full p-4 pt-6 outline-none bg-white font-light border-2 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed`}
                maxLength={8}
            />
            <InputAddress id="line1" label="Rua" disabled={isLoading}  errors={errors} children= {address.logradouro} required></InputAddress>
            <InputAddress id="line2" label="Bairro" disabled={isLoading} errors={errors}children= {address.bairro} required></InputAddress>
            <InputAddress id="city" label="Cidade" disabled={isLoading}  errors={errors} children={address.localidade} required></InputAddress>
            <InputAddress id="state" label="Estado" disabled={isLoading} errors={errors} required children= {address.uf}></InputAddress>
            <div className="max-w-full w-full p-4 bg-white shadow-lg rounded-2xl text-center">
            <h2 className="font-semibold mt-4 mb-2">Calcule seu frete aqui!</h2>

            <button
                onClick={calcularFrete}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
            >
                 Calcular Frete
            </button>

            {frete !== null && (
                <p className="mt-4 text-lg text-green-600 font-semibold">
                Frete estimado: R$ {frete.toFixed(2)}
                </p>
            )}
            </div>
            <h2 className="font-semibold mt-4 mb-2">Forma de Pagamento</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h[50vh] overflow-y-auto">
                <CategoryInput label="PIX" icon={MdOutlinePix} onClick={() => {}} />
                <CategoryInput label="Cartão de Crédito" icon={MdCreditCard} onClick={() => {}} />
                <CategoryInput label="Boleto Bancário" icon={AiOutlineBarcode} onClick={() => {}} />
            </div>
            <Button label={isLoading ? 'Carregando...' : 'Finalizar Checkout'} onClick={()=> {}}/>
        </>
    )
}

export default CheckoutClient;