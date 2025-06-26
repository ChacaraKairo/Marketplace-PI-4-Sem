'use client'

import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import CustomCheckBox from "@/app/components/inputs/CustomCheckBox";
import Input from "@/app/components/inputs/Input";
import SelectColor from "@/app/components/inputs/SelectColor";
import TextArea from "@/app/components/inputs/TextArea";
import { categories } from "@/utils/Categories";
import { colors } from "@/utils/Colors";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";


export type ImageType = {
    color: string;
    colorCode: string;
    image: File| null
}

export type UploadImageType = {
    color: string;
    colorCode: string;
    image: File| null
}



const AddProductForm = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages] = useState<ImageType[] | null>(null);
    const [isProductCreated, setIsProductCreated] = useState(false);
    
    const {register, handleSubmit, setValue,watch,reset,formState:{errors}} = useForm<FieldValues>({
        defaultValues:{
            name: '',
            description: '',
            brand: '',
            category: '',
            inStock: false,
            color: '',
            colorCode: '',
            imageUrl: '',
            price: '',
        }
    });
    useEffect(() => {
        setCustomValue('images', images)
    }, [images]);

    useEffect(() => {
        if(isProductCreated){
            reset();
            setImages(null);
            setIsProductCreated(false);
        }
    }, [isProductCreated]);

    const onSubmit: SubmitHandler<FieldValues> = async(data) => {
        console.log("Product Data", data);
        setIsLoading(true)
        let uploadedImages: UploadImageType[] = []

        if(!data.category){
            setIsLoading(false)
            return toast.error('Categoria não selecionada!')
        }
        if(!data.images || data.images.length === 0){
            setIsLoading(false)
            return toast.error('Nenhuma imagem selecionada!')
        }
        //Enviando as imagens para o
        const handleImageUploads = async () => {
            toast("Enviando imagens para o Cloudinary...");
            try {
                const uploaded: UploadImageType[] = [];

                for (const item of data.images) {
                    if (item.image) {
                        const formData = new FormData();
                        formData.append("file", item.image);

                        const response = await fetch("/api/upload", {
                            method: "POST",
                            body: formData,
                        });
                        
                        if (!response.ok) {
                            throw new Error("Erro ao fazer upload de uma imagem.");
                        }

                        const result = await response.json();

                        if (result?.data?.secure_url) {
                            uploaded.push({
                                color: item.color,
                                colorCode: item.colorCode,
                                image: result.data.secure_url, // Agora é uma URL
                            });
                        }
                    }
                }
                return uploaded;
            } catch (error) {
                setIsLoading(false)
                console.error("Erro no upload:", error);
                toast.error("Erro ao enviar imagens");
                return [];
            }
        };

        const uploaded = await handleImageUploads();
        uploadedImages = uploaded;
        const productData = {...data, images: uploadedImages}

        //Enviando Produto para o Banco de Dados
        axios.post('/api/product', productData).then(() => {
            toast.success("Produto criado!");
            setIsProductCreated(true);
            router.refresh();
        }).catch((error) => {
            toast.error("Algo está errado quando o produto é salvo no banco de dados")
        }).finally(() => {
            setIsLoading(false);
        })
        
        // const uploaded = await handleImageUploads();
        // uploadedImages = uploaded;  
    };
    
    const category = watch("category");
    const setCustomValue = (id: string, value: any) => {
        setValue(id, value,{
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        });
    };

    const addImageToState = useCallback((value: ImageType) => {
        setImages((prev) => {
            if(!prev){
                return [value]
            }
            return [...prev, value]
        })
    },[]);

    const removeImageFromState = useCallback((value: ImageType) => {
        setImages((prev) => {
            if(prev){  
                const filteredImages = prev.filter((item) => item.color !== value.color)
                return filteredImages;
            }
            return prev
        });
    },[]);

    return( 
        <>
          <Heading title="Adicione um Produto" center/>
          <Input id="name" label="Nome" disabled={isLoading} register={register} errors={errors} required/>
          <Input id="price" label="Preço" disabled={isLoading} register={register} errors={errors} type="number" required/>
          <Input id="brand" label="Marca" disabled={isLoading} register={register} errors={errors} required/>
          <TextArea id="description" label="Descrição" disabled={isLoading} register={register} errors={errors} required/>
          <CustomCheckBox id="inStock" register={register} label="Esse produto está no estoque"/>
            <div className="w-full font-medium">
                <div className="mb-2 font-semibold">Escolha uma Categoria</div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h[50vh] overflow-y-auto">
                    {categories.map((item) => {
                        if(item.label === 'Todos'){
                            return null;
                        }
                        return(
                            <div key={item.label} className="col-span">
                                <CategoryInput onClick={(category) => setCustomValue("category", category)} selected={category === item.label}
                                    label={item.label} icon={item.icon}/>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="w-full flex flex-col flex-wrap gap-4">
                <div>
                    <div className="font-bold">
                        Selecione a cor do produto disponivel e faça o upload das imagens.
                    </div>
                    <div className="text-sm">
                        Você deve upar uma iamgem para que a cor possa ser selecionada, caso contrario a seleção de cor será ignorada.
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    {colors.map((item, index) => {
                        return <SelectColor
                        key={index}
                        item={item}
                        addImageToState={addImageToState}
                        removeImageFromState={removeImageFromState}
                        isProductCreated={isProductCreated}/>;
                    })}
                </div>
            </div>
            <Button label={isLoading ? 'Carregando...' : 'Adicionar Produto'} onClick={handleSubmit(onSubmit)}/>
        </>
    );
};

export default AddProductForm;