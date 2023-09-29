import {Link} from "react-router-dom";
import React from "react";

function Main(){
    return(
        <main>
            <section className="home-head">
                <h1 className="ss-name-home">STEAM studio - Elevating Podcasting Experiences </h1>
            </section>
            <section className="container content-section">
                <section className="text-image-block">
                <section className="desc">
                    <h2 className="section-name">Explore Our Range:</h2>
                    <aside>
                        Discover a range of meticulously designed microphones
                        and headphones that cater to beginners and seasoned
                        podcasters alike. Whether you're delving into podcasting
                        for the first time or looking to upgrade your setup,
                        STEAM studio has the perfect solution for you.
                    </aside>
                    <section className="form-btns">
                    <Link to="/products" className="btn btn-primary ">Explore</Link>
                    </section>
                </section>
                <figure>
                    <img src="/img/val1.jpeg" alt="a computer and a microphone"/>
                </figure>
                </section>
                <section className="text-image-block">
                    <figure>
                        <img src="/img/val2.png" alt="man holding a microphone"/>
                    </figure>
                    <section className="desc">
                        <h2 className="section-name">Our Values:</h2>
                        <aside>
                            At STEAM studio, we are driven by a profound commitment
                            to excellence and a passion for enhancing the podcasting experience.
                            Our values are the bedrock of our identity, shaping every aspect of
                            our journey in the dynamic world of podcast equipment.Born out of a
                            shared passion for podcasting...
                        </aside>
                        <section className="form-btns">
                            <Link to="/ourValues" className="btn btn-primary ">Read more</Link>
                        </section>
                    </section>
                </section>
            </section>
        </main>
    );
}
export default Main