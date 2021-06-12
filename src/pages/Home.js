import React from "react";
import Navbar from "../components/Navbar";
import Product from "../components/Product";
import "../css/Home.css";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <div className="home__banner">
        <img
          src="https://images-eu.ssl-images-amazon.com/images/G/02/AmazonMusic/2021/Marketing/EvergreenQ1/Gateway/UK-EN_PODCASTS_EvergreenQ1_DMUX-3799_MP_OnS_GW_Hero_D_1500x600_CV5._CB661786784_.jpg"
          alt="amazon-banner"
        />
      </div>
      <div className="products">
        <div className="products__row">
          <Product
            id={134}
            title="Fusion4K High Speed 4K HDMI Cable (4K @ 60Hz) - Professional Series (20 Feet)"
            price={74.99}
            rating={4}
            image="https://images-na.ssl-images-amazon.com/images/I/61G7KF%2BjueL._AC_SL1025_.jpg"
          />
          <Product
            id={215}
            title="Optix 55 Anti-Fog Spray for Non - Anti Reflective Lenses | Prevents Fogging of Glass"
            price={10.55}
            rating={3}
            image="https://images-na.ssl-images-amazon.com/images/I/61r3YdzFr4L._AC_SL1500_.jpg"
          />
          <Product
            id={318}
            title="TEMI Dinosaur Toy Figure w/ Activity Play Mat and Trees"
            price={25.99}
            rating={5}
            image="https://images-na.ssl-images-amazon.com/images/I/71moBwfHEML._AC_SL1000_.jpg"
          />
        </div>
        <div className="products__row">
          <Product
            id={479}
            title="CHUWI Herobook Pro 14.1 inch Windows 10 Intel N4000 Dual Core 8GB RAM 256GB ROM Notebook,Thin and Lightweight Laptop,BT4.0 (Herobook Pro (Herobook Pro(2020))"
            price={349.0}
            rating={4}
            image="https://images-na.ssl-images-amazon.com/images/I/71ehz-npkEL._AC_SL1500_.jpg"
          />
        </div>
        <div className="products__row">
          <Product
            id={504}
            title="ASUS ROG Gaming Phone 3-6.59” FHD+ 2340x1080 HDR 144Hz Display - 6000mAh Battery - 64MP/13MP/5MP"
            price={899.99}
            rating={5}
            image="https://images-na.ssl-images-amazon.com/images/I/812-Lob-xlL._AC_SL1500_.jpg"
          />
          <Product
            id={611}
            title='Amazfit GTS 2 Smartwatch with 1.65" AMOLED Display, Built-In GPS, 3GB Music Storage, 7-Day Battery Life, Bluetooth Phone Calls'
            price={179.99}
            rating={4}
            image="https://images-na.ssl-images-amazon.com/images/I/61L%2BJ%2B4UJsL._AC_SL1500_.jpg"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
