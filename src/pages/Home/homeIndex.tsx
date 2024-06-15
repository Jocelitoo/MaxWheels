import { Contato } from '../../components/homeSections/indexcontato.tsx';
import { FeaturedCars } from '../../components/homeSections/indexFeatured.tsx';
import { Banner } from '../../components/homeSections/indexBanner.tsx';
import { Info } from '../../components/homeSections/indexInfo.tsx';
import { Services } from '../../components/homeSections/indexServices.tsx';
import { PopularVehicles } from '../../components/homeSections/indexNovos.tsx';
import { Review } from '../../components/homeSections/indexReview.tsx';
import { useEffect } from 'react';

export function Home() {
  // Remove o scrollY quando a página é aberta
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="mt-16">
      <Banner />
      <Info />
      <PopularVehicles />
      <Services />
      <FeaturedCars />
      <Review />
      <Contato />
    </main>
  );
}
