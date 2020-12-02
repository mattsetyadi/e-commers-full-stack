import React from "react";
import "./Home.css";
import HeroImg from "../../assets/images/Hero.jpg";
import Product from "./Product";
import Strato from "../../assets/images/stratocaster.jpg";
import Moslion from "../../assets/images/moslion.jpg";
import Mustang from "../../assets/images/mustang.jpg";
import Kabel from "../../assets/images/kabel.jpg";
import Bass from "../../assets/images/bass.jpg";
import Samsung from "../../assets/images/samsung.jpg";

const Home = () => {
  return (
    <div className="home">
      <div className="home__container">
        <img className="home__image" src={HeroImg} alt="banner" />

        <div className="home__row">
          <Product
            id="00011"
            title="Fender Player Stratocaster Electric Guitar - Maple Fingerboard - Tidepool"
            price={1999.99}
            image={Strato}
            rating={5}
            alt="stratocaster"
          />
          <Product
            id="00012"
            title="Fender Mustang LT-25 - Digital Guitar Amplifier"
            price={117.36}
            image={Mustang}
            rating={5}
            alt="amp"
          />
        </div>
        <div className="home__row">
          <Product
            id="00013"
            title="Moslion Guitar Mouse Pad Bass Music Musical Instruments Strings Cool Thick Mousepad 9.5x7.9 Inch"
            price={7.36}
            image={Moslion}
            rating={4}
            alt="mouse pad"
          />
          <Product
            id="00014"
            title="GLS Audio 20 Foot Guitar Instrument Cable - Right Angle 1/4 Inch TS to Straight 1/4 Inch TS 20 FT Brown Yellow Tweed Cloth Jacket - 20 Feet Pro Cord 20' Phono 6.3mm - Single"
            price={19.97}
            image={Kabel}
            rating={5}
            alt="Cable"
          />
          <Product
            id="00014"
            title="Traveler Guitar Redlands Concert 4 String Acoustic-Electric Bass Guitar, Right, Koa (RCB KE)"
            price={549.97}
            image={Bass}
            rating={5}
            alt="bass"
          />
        </div>
        <div className="home__row">
          <Product
            id="00015"
            title="SAMSUNG 49-inch Odyssey G9 Gaming Monitor | QHD, 240hz, 1000R Curved, QLED, NVIDIA G-SYNC & FreeSync | LC49G95TSSNXZA Model"
            price={2492.0}
            image={Samsung}
            rating={5}
            alt="Samsung Odessey"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
