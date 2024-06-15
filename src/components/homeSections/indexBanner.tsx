import { buttonCss } from '../../styles/button-css.tsx';
import bannerMobile from '../../assets/images/home-img-mobile.png';
import bannerTablet from '../../assets/images/home-img-tablet.png';
import bannerDesktop from '../../assets/images/home-img-desktop.png';

export function Banner() {
  return (
    <section
      id="home"
      className="flex flex-col items-center p-interface gap-4 pt-4 pb-8"
    >
      <h1 className="text-2xl font-bold sm:text-5xl lg:text-7xl">
        Encontre seu carro
      </h1>
      <picture>
        <source
          media="(max-width:639px)"
          srcSet={bannerMobile}
          type="image/png"
          width={520}
          height={146}
        />
        <source
          media="((min-width:640px) and (max-width:1023px))"
          srcSet={bannerTablet}
          type="image/png"
          width={800}
          height={224}
        />
        <img
          src={bannerDesktop}
          alt="3 carros lado a lado"
          width={1074}
          height={301}
        />
      </picture>

      <a
        href="#destaque"
        className={`${buttonCss}`}
        aria-labelledby="Explorar carros"
      >
        Explorar carros
      </a>
    </section>
  );
}
