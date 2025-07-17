import EnvioGratis from "@/components/EnvioGratis/enviogratis";
import SliderPrincipal from "@/components/sliderPrincipal/sliderPrincipal";
import ShopNow from "@/components/ShopNow/ShopNow";
import { SliderCategories } from "@/components/sliderCategories/SliderCategories";
import { SeccionPerrosYGatos } from "@/components/seccionPerrosYGatos/seccionPerrosYGatos";
import InstagramFeed from "@/components/redes/redes";
import RedesSociales from "@/components/RedesSociales/RedesSociales";
import SliderProductosDestacados from "@/components/sliderProductosDestacados/sliderProductosDestacados";
import LogicaSearchbar from "@/components/LogicaSearchbar/LogicaSearchbar";

export default function Home() {
  return (
    <main>
      <section className="min-h-screen flex flex-col items-center justify-start ">

      <LogicaSearchbar />

      <div className="my-1"></div> {/* Separation between sections */}


      <SliderPrincipal />

      
      <div className="my-1"></div> {/* Separation between sections */}
      
        <EnvioGratis />

        <div className="my-1"></div> {/* Separation between sections */}

        <ShopNow />

      <div className="my-1"></div>  {/* Separation between sections */}

        <SliderCategories />

      <div className="my-2"></div>  {/* Separation between sections */}

    <SeccionPerrosYGatos />

      <div className="my-2"></div>  {/* Separation between sections */}

    <SliderProductosDestacados />

      <div className="my-2"></div>  {/* Separation between sections */}

        <RedesSociales />

      <div className="my-1"></div>  {/* Separation between sections */}


      <InstagramFeed />
      </section>
    </main>
  );
}
