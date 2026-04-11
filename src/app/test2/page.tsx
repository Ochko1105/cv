"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Lora } from "next/font/google";

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const SITE_URL = "https://mongoliansecrethistory.mn";
const EXTERNAL_STYLESHEETS = [
  `${SITE_URL}/_next/static/css/1c2272afa08755b1.css`,
  `${SITE_URL}/_next/static/css/e9f4fb592967765a.css`,
  `${SITE_URL}/_next/static/css/11663eb5ca3c6d95.css`,
  `${SITE_URL}/_next/static/css/014dfbd8f7502d55.css`,
  `${SITE_URL}/static/sassCss/gerege/gerege.css`,
  `${SITE_URL}/static/css/reset.css`,
  `${SITE_URL}/static/sassCss/custom.css`,
  "https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css",
  "https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap-theme.min.css",
] as const;

type SubscriptionStatus = "idle" | "success" | "duplicate" | "error";

interface TourItem {
  title: string;
  href: string;
  image: string;
  length: string;
  price: string;
}

const TOURS: TourItem[] = [
  {
    title: "10 days Highlight of Mongolia tour",
    href: `${SITE_URL}/en/tour/bestSellingTours/23U-B5ZZ6rMkOn_LOt2pF`,
    image:
      "https://mongoliansecrethistory.api.erxes.io/api/read-file?key=erxes-saas/nqobrCneGBMgAP61ZByfTf1.jpg",
    length: "10 days",
    price: "from $ per person",
  },
  {
    title: "7 days tour of Highlight of Mongolia",
    href: `${SITE_URL}/en/tour/bestSellingTours/2k7tUk4gcl5iLdhqlKBW4`,
    image:
      "https://mongoliansecrethistory.api.erxes.io/api/read-file?key=erxes-saas/WuJEAUwbQ7qpaAq9mD0YNf2.jpeg",
    length: "14 days",
    price: "from $ per person",
  },
  {
    title: "10 days tour of Naadam Festival & Altai Tavan Bogd",
    href: `${SITE_URL}/en/tour/bestSellingTours/6KSCck1lIbXOsCZ1VyQ1J`,
    image:
      "https://mongoliansecrethistory.api.erxes.io/api/read-file?key=erxes-saas/jfelpVU5rk3QvQQgWVILSf3.jpg",
    length: "14 days",
    price: "from $ per person",
  },
  {
    title: "14 days Highlight of Mongolia tour",
    href: `${SITE_URL}/en/tour/bestSellingTours/tTeicFwnCW85mqQEBb33A`,
    image:
      "https://mongoliansecrethistory.api.erxes.io/api/read-file?key=erxes-saas/9pb5pWlgL6tbhP48EW79gf4.jpg",
    length: "14 days",
    price: "from $ per person",
  },
  {
    title: "5 days tour of Gobi desert",
    href: `${SITE_URL}/en/tour/bestSellingTours/OR1moPhhIv3bVcshD2DkH`,
    image:
      "https://mongoliansecrethistory.api.erxes.io/api/read-file?key=erxes-saas/ATWvWR2g3fX9HCQLADpMif5.jpg",
    length: "10 days",
    price: "from $ per person",
  },
  {
    title: "7 days tour of Naadam festival & Golden Eagle hunters",
    href: `${SITE_URL}/en/tour/bestSellingTours/EbuBHqN6A_kX0T4xxDB1U`,
    image:
      "https://mongoliansecrethistory.api.erxes.io/api/read-file?key=erxes-saas/yh3og6YnKYoKJVcAKZAwyf6.jpg",
    length: "10 days",
    price: "from $ per person",
  },
];

export default function Test2Page() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubscriptionStatus>("idle");
  const [subscribed, setSubscribed] = useState(false);
  const [stylesReady, setStylesReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const createdLinks: HTMLLinkElement[] = [];

    const stylesheetPromises = EXTERNAL_STYLESHEETS.map((href) => {
      const existing = document.querySelector<HTMLLinkElement>(
        `link[rel="stylesheet"][href="${href}"]`,
      );

      if (existing) {
        return Promise.resolve();
      }

      return new Promise<void>((resolve) => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        link.dataset.mshCloneStyle = "true";
        link.onload = () => resolve();
        link.onerror = () => resolve();
        document.head.appendChild(link);
        createdLinks.push(link);
      });
    });

    Promise.all(stylesheetPromises).then(() => {
      if (!cancelled) {
        setStylesReady(true);
      }
    });

    return () => {
      cancelled = true;
      createdLinks.forEach((link) => link.remove());
    };
  }, []);

  const handlePlayVideo = () => {
    window.open(
      "https://www.youtube.com/user/Monsecrethistory",
      "_blank",
      "noopener,noreferrer",
    );
  };

  const handleSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = email.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus("error");
      return;
    }

    if (subscribed) {
      setStatus("duplicate");
      return;
    }

    setSubscribed(true);
    setStatus("success");
    setEmail("");
  };

  return (
    <>
      <style jsx global>{`
        html,
        body {
          min-height: 100%;
          background: #fff;
        }

        #msh-loading-screen {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff;
        }

        #msh-loading-screen .loader-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          color: #1f56a7;
        }

        #msh-loading-screen .loader-ring {
          width: 44px;
          height: 44px;
          border-radius: 999px;
          border: 2px solid rgba(31, 86, 167, 0.18);
          border-top-color: #1f56a7;
          animation: msh-spin 0.8s linear infinite;
        }

        #msh-loading-screen .loader-text {
          font-size: 12px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        @keyframes msh-spin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        #msh-clone {
          min-height: 100vh;
          background: #fff;
          color: #333;
          font-family: Lora, Arial, sans-serif;
          overflow-x: hidden;
        }

        #msh-clone a {
          text-decoration: none;
        }

        #msh-clone .build-your-trip .container,
        #msh-clone .blog .container,
        #msh-clone .tour.index .container,
        #msh-clone footer .container {
          width: 100%;
          max-width: 1030px;
        }

        @media (max-width: 1023px) {
          #msh-clone .build-your-trip .icons {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
          }

          #msh-clone .build-your-trip .icons > .pull-left,
          #msh-clone .build-your-trip .icons > .item {
            float: none !important;
          }

          #msh-clone .build-your-trip .icons .sep {
            display: none;
          }

          #msh-clone .build-your-trip p {
            width: 100%;
          }

          #msh-clone .home-video h2 {
            font-size: 28px;
            line-height: 1.25;
          }

          #msh-clone footer .container .item .pull-right {
            float: left !important;
          }

          #msh-clone footer .container .copyright {
            margin-top: 30px;
          }
        }

        @media (max-width: 767px) {
          #msh-clone .tour .tour-spec .item h2 {
            height: auto;
            min-height: 0;
          }

          #msh-clone .tour .tour-spec .item img {
            width: 100% !important;
            height: auto !important;
          }

          #msh-clone .home-video {
            height: 420px;
          }
        }
      `}</style>

      {!stylesReady ? (
        <div id="msh-loading-screen" className={lora.className}>
          <div className="loader-wrap">
            <div className="loader-ring"></div>
            <div className="loader-text">Loading</div>
          </div>
        </div>
      ) : (
        <div
          id="msh-clone"
          className={lora.className}
          style={{ fontFamily: "Lora, Arial, sans-serif" }}
        >
          <div id="content" style={{ display: "block" }}>

          <section className="build-your-trip red">
            <div className="l wing" style={{ right: "1367px" }} />
            <div className="container">
              <h1 className="text-center">Create your Dream Holiday in Mongolia</h1>
              <p className="text-center">
                Planning your Own trip is all part of the fun. Follow these
                simple steps to help you plan your Mongolian vacation of a
                lifetime.
              </p>

              <div className="icons">
                <div className="pull-left">
                  <div className="item pull-left text-center">
                    <div className="img-out">
                      <div className="table-in">
                        <div className="img img1"></div>
                      </div>
                    </div>
                    <div className="text">Sign up/ Registration</div>
                  </div>
                  <div className="sep pull-left">
                    <i className="fa fa-long-arrow-right"></i>
                  </div>
                </div>

                <div className="pull-left">
                  <div className="item pull-left text-center">
                    <div className="img-out">
                      <div className="table-in">
                        <div className="img img2"></div>
                      </div>
                    </div>
                    <div className="text">
                      Schedule your <br /> Time
                    </div>
                  </div>
                  <div className="sep pull-left">
                    <i className="fa fa-long-arrow-right"></i>
                  </div>
                </div>

                <div className="pull-left">
                  <div className="item pull-left text-center">
                    <div className="img-out">
                      <div className="table-in">
                        <div className="img img3"></div>
                      </div>
                    </div>
                    <div className="text">Discover your Destinations</div>
                  </div>
                  <div className="sep pull-left">
                    <i className="fa fa-long-arrow-right"></i>
                  </div>
                </div>

                <div className="pull-left">
                  <div className="item pull-left text-center">
                    <div className="img-out">
                      <div className="table-in">
                        <div className="img img4"></div>
                      </div>
                    </div>
                    <div className="text">
                      Plan your <br />
                      Route
                    </div>
                  </div>
                  <div className="sep pull-left">
                    <i className="fa fa-long-arrow-right"></i>
                  </div>
                </div>

                <div className="item pull-left text-center">
                  <div className="img-out">
                    <div className="table-in">
                      <div className="img img5"></div>
                    </div>
                  </div>
                  <div className="text">
                    Enjoy your <br />
                    Travel
                  </div>
                </div>
              </div>

              <div className="ready">
                <span className="pull-left">Ready to get started?</span>
                <a href={`${SITE_URL}/en/plugins/msh/plan-list/public/`} className="pull-right btn">
                  Build Your Own tour
                </a>
              </div>
            </div>
            <div className="r wing" style={{ left: "1367px" }} />
          </section>

          <div>
            <section className="home-video absolute">
              <div className="table-in">
                <button
                  id="play-video"
                  type="button"
                  className="play p-3 rounded-full items-center"
                  onClick={handlePlayVideo}
                >
                  <i className="fas fa-play text-xl"></i>
                </button>
                <p className="text-lg mt-2">Video</p>
                <h2>Explore Mongolia through the latest video news</h2>
              </div>
            </section>

            <section className="blog">
              <div className="container">
                <h3>
                  <a href={`${SITE_URL}/en/blogNews/`}>latest blog and news</a>
                </h3>
                <div className="swiper mySwiper">
                  <div className="swiper-wrapper"></div>
                  <div className="swiper-button-prev"></div>
                  <div className="swiper-button-next"></div>
                  <div className="swiper-pagination"></div>
                </div>
              </div>
            </section>
          </div>

          <section className="tour index">
            <div className="container">
              <h2 className="text-center text-primary">Featured tours</h2>
              <div className="row">
                <div className="tour-spec">
                  <div className="tlist">
                    {TOURS.map((tour) => (
                      <div key={tour.title} className="col-sm-4 col-xs-6">
                        <div className="item">
                          <a style={{ textDecoration: "none" }} href={tour.href}>
                            <h2>{tour.title}</h2>
                            <img
                              style={{ width: "400px", height: "186px" }}
                              src={tour.image}
                              alt=""
                              className="img-responsive"
                            />
                          </a>
                          <div className="same-height">
                            <div className="spec">
                              <strong>Length :</strong>
                              <span>{tour.length}</span>
                            </div>
                            <div className="spec">
                              <strong>Price : </strong>
                              <span>{tour.price}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <footer>
          <div className="container">
            <div className="item">
              <ul className="pull-left first">
                <li>
                  <a href={`${SITE_URL}/en/aboutUs/`}>About us</a>
                </li>
                <li>
                  <a href={`${SITE_URL}/en/testimonials/`}>Testimonials</a>
                </li>
                <li>
                  <a href={`${SITE_URL}/en/terms-and-conditions/`}>Terms &amp; Conditions</a>
                </li>
                <li>
                  <a href={`${SITE_URL}/en/contact-us/`}>Contact us</a>
                </li>
                <li>
                  <a href={`${SITE_URL}/en/book-online/`}>Book online</a>
                </li>
              </ul>

              <ul className="pull-right second">
                <li>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.facebook.com/mongoliansecrethistory/"
                    aria-label="Facebook"
                  >
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://twitter.com/MSHTravel"
                    aria-label="X"
                  >
                    <i className="fa-brands fa-x-twitter"></i>
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.youtube.com/user/Monsecrethistory"
                    aria-label="YouTube"
                  >
                    <i className="fa-brands fa-youtube"></i>
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="http://gb.pinterest.com/travelmongolia/"
                    aria-label="Pinterest"
                  >
                    <i className="fa-brands fa-pinterest"></i>
                  </a>
                </li>
              </ul>
            </div>

            <div className="item">
              <div id="content_gallery">
                <a href="#" aria-label="Gallery badge 1">
                  <img
                    src={`${SITE_URL}/static/images/1.png`}
                    data-description=""
                    alt=""
                  />
                </a>
                <a href="#" aria-label="Gallery badge 2">
                  <img
                    src={`${SITE_URL}/static/images/2.png`}
                    data-description=""
                    alt=""
                  />
                </a>
                <a href="#" aria-label="Gallery badge 3">
                  <img
                    src={`${SITE_URL}/static/images/3.png`}
                    data-description=""
                    alt=""
                  />
                </a>
                <a href="#" aria-label="Gallery badge 4">
                  <img
                    src={`${SITE_URL}/static/images/4.png`}
                    data-description=""
                    alt=""
                  />
                </a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.kimkim.com/o/mongolian-secret-history-travel-company"
                >
                  <img
                    src={`${SITE_URL}/static/images/recommended_on_kimkim.png`}
                    data-description="https://www.kimkim.com/o/mongolian-secret-history-travel-company"
                    alt=""
                  />
                </a>
              </div>

              <div className="pull-right">
                <div id="subscribe_form" style={{ display: "block" }}>
                  <form
                    className="noajax"
                    id="id_subscribe_form"
                    action="#"
                    method="post"
                    onSubmit={handleSubscribe}
                  >
                    <input
                      type="hidden"
                      name="csrfmiddlewaretoken"
                      value="RfZfwfIOIpoWlvIGXtkb2X7HMWKyoaXH"
                    />
                    <ul className="subscribe">
                      <li>
                        <input
                          type="text"
                          placeholder="Email"
                          name="email"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                        />
                        <span id="id_email_error" className="isa_error"></span>
                      </li>
                      <li className="hide">
                        <input
                          type="checkbox"
                          name="categories"
                          value="1"
                          readOnly
                        />
                        Blog &amp; News
                        <span
                          id="id_categories_error"
                          className="isa_error"
                        ></span>
                      </li>
                      <li>
                        <button
                          type="submit"
                          className="subscribe-btn"
                          id="id_subscribe_button"
                        >
                          Sign up for Newsletter
                        </button>
                      </li>
                    </ul>

                    <div
                      id="id_success"
                      className="subscribe-message"
                      style={{ display: status === "success" ? "block" : "none" }}
                    >
                      Thank you for signing up
                    </div>
                    <div
                      id="id_already_success"
                      className="subscribe-message"
                      style={{
                        display: status === "duplicate" ? "block" : "none",
                      }}
                    >
                      Already signing up
                    </div>
                    <div
                      id="id_subscribe_errors"
                      className="subscribe-message"
                    >
                      {status === "error" ? "Please enter a valid email" : ""}
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="copyright">
              <p className="pull-left">
                Copyright © 2026. All rights reserved. Mongolian Secret History
              </p>
              <div className="gerege-agency pull-right">
                <div className="gerege-info">
                  <span className="gerege-icon-code"></span>
                  by
                </div>
                <a
                  href="http://gerege.agency/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="gerege-icon-char-g"></span>
                  <span className="gerege-icon-char-e"></span>
                  <span className="gerege-icon-char-r"></span>
                  <span className="gerege-icon-char-e"></span>
                  <span className="gerege-icon-char-g"></span>
                  <span className="gerege-icon-char-e"></span>
                </a>
              </div>
            </div>
          </div>
          </footer>
        </div>
      )}
    </>
  );
}
