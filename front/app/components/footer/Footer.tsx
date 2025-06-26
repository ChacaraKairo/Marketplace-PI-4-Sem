import Link from "next/link";
import Container from "../Container";
import FooterList from "./FooterList";

const Footer = () => {
    return (
        <footer className="bg-slate-600 text-slate-200 text-sm mt-16">
            <Container>
                <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
                    <FooterList>
                        <h3 className="text-xbase font-bold mb-2">Categorias</h3>
                        <Link href='#'>Celulares</Link>
                        <Link href='#'>Laptops</Link>
                        <Link href='#'>Computadores</Link>
                        <Link href='#'>Relógios</Link>
                        <Link href='#'>Tvs</Link>
                        <Link href='#'>Acessórios</Link>
                    </FooterList>
                    <FooterList>
                        <h3 className="text-xbase font-bold mb-2">Atendimento ao Cliente</h3>
                        <Link href='#'>Contate-nos</Link>
                        <Link href='#'>Políticas de Privacidade</Link>
                        <Link href='#'>Computadores</Link>
                        <Link href='#'>Relógios</Link>
                        <Link href='#'>Tvs</Link>
                        <Link href='#'>Acessórios</Link>
                    </FooterList>
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                    <h3 className="text-xbase font-bold mb-2">Sobre Nós</h3>
                    <p className="mb-2">Na KLP, somos apaixonados por tecnologia e inovação. Oferecemos uma seleção rigorosa de peças de hardware de alta qualidade para atender tanto entusiastas quanto profissionais. Nosso compromisso é garantir produtos confiáveis, suporte especializado e uma experiência de compra simples e segura.</p>
                    <p>&copy; {new Date().getFullYear()} KLP Shop. Todos os direitos reservados</p>
                    </div>
                </div>
            </Container>
        </footer>
    );
}

export default Footer;