
import PromosMobileSlider from "@/components/EnvioGratis/PromosMobileSlider";

import  SliderSelector  from "@/components/sliderPrincipal/SliderSelector";
import ShopNow from "@/components/ShopNow/ShopNow";
import SliderCategoriesSelector from "@/components/sliderCategories/SliderCategoriesSelector";
import {SeccionPerrosYGatosSelector} from "@/components/seccionPerrosYGatos/SeccionPerrosYGatosSelector";
// import InstagramFeed from "@/components/redes/redes";
import RedesSociales from "@/components/RedesSociales/RedesSociales";
import SliderProductosDestacados from "@/components/sliderProductosDestacados/sliderProductosDestacados";
import WhatsappLink from "@/components/WhatsappLink/WhatsappLink";
import RedesSocialesDesktop from "@/components/RedesSociales/RedesSocialesDesktop";
import PromosBanner from "@/components/PromosBanner/PromosBanner";
export default function Home() {
  return (
    <main>
      <section className="flex flex-col items-center justify-start ">


      <div className="my-1"></div> {/* Separation between sections */}

        <SliderSelector />
      
      <div className="my-1"></div> {/* Separation between sections */}
      
        <div className="md:hidden">
          <PromosMobileSlider />
        </div>


        <div className="my-1"></div> {/* Separation between sections */}

        <ShopNow />

      <div className="my-1"></div>  {/* Separation between sections */}

        <SliderCategoriesSelector />

      <div className="my-2"></div>  {/* Separation between sections */}

      <SeccionPerrosYGatosSelector />

      <div className="my-2"></div>  {/* Separation between sections */}
        
        <div className="hidden md:block">
          <PromosBanner />
        </div>

      <div className="my-2"></div>  {/* Separation between sections */}

    <SliderProductosDestacados />

      <div className="my-2"></div>  {/* Separation between sections */}

        <>
          <div className="block md:hidden">
            <RedesSociales />
          </div>
          <div className="hidden md:block">
            <RedesSocialesDesktop />
          </div>
        </>



      </section>
              <WhatsappLink />
      
    </main>
  );
}
