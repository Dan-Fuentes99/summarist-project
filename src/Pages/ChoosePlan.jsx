import React, { useState } from "react";
import "../styles/ChoosePlan.css";
import { getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import Pricing from "../assets/pricing-top.png";
import { useNavigate } from "react-router-dom";
import {
  FaHandshake,
  FaFileAlt,
  FaSeedling,
  FaChevronDown,
} from "react-icons/fa";

function ChoosePlan() {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [openIdx, setOpenIdx] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState("yearly");
  const navigate = useNavigate();

  const handleUpgrade = async () => {
    try {
      const user = getAuth().currentUser;
      if (!user) {
        alert("Please log in first.");
        return;
      }
      await setDoc(
        doc(db, "users", user.uid),
        {
          subscription: "premium",
          plan: selectedPlan,
          upgradedAt: new Date().toISOString(),
        },
        { merge: true }
      );
      alert("Success! You are now a premium member.");
      navigate("/for-you");
    } catch (err) {
      alert("Error upgrading to premium: " + err.message);
    }
  };

  const plans = [
    {
      id: "yearly",
      title: "Premium Plus Yearly",
      price: "$99.99/year",
      text: "7-day free trial included",
    },
    {
      id: "monthly",
      title: "Premium Monthly",
      price: "$9.99/month",
      text: "No trial included",
    },
  ];

  let buttonText, disclaimerText;

  if (selectedPlan === "yearly") {
    buttonText = "Start your 7-day free trial";
    disclaimerText =
      "Cancel your trial at any time before it ends, and you won’t be charged.";
  } else if (selectedPlan === "monthly") {
    buttonText = "Start your first month";
    disclaimerText = "30-day money back guarantee, no questions asked.";
  }

  const faqs = [
    {
      question: "How does the free 7-day trial work?",
      answer:
        "Begin your complimentary 7-day trial with a Summarist annual membership. You are under no obligation to continue your subscription, and you will only be billed when the trial period expires. With Premium access, you can learn at your own pace and as frequently as you desire, and you may terminate your subscription prior to the conclusion of the 7-day free trial.",
    },
    {
      question:
        "Can I switch subscriptions from monthly to yearly, or yearly to monthly?",
      answer:
        "While an annual plan is active, it is not feasible to switch to a monthly plan. However, once the current month ends, transitioning from a monthly plan to an annual plan is an option.",
    },
    {
      question: "What's included in the Premium plan?",
      answer:
        "Premium membership provides you with the ultimate Summarist experience, including unrestricted entry to many best-selling books high-quality audio, the ability to download titles for offline reading, and the option to send your reads to your Kindle.",
    },
    {
      question: "Can I cancel during my trial or subscription?",
      answer:
        "You will not be charged if you cancel your trial before its conclusion. While you will not have complete access to the entire Summarist library, you can still expand your knowledge with one curated book per day.",
    },
  ];

  return (
    <div className="wrapper wrapper__full">
      <div className="plan">
        <div className="plan__header--wrapper">
          <div className="plan__header">
            <div className="plan__title">
              Get unlimited access to many amazing books to read
            </div>
            <div className="plan__sub--title">
              Turn ordinary moments into amazing learning opportunities
            </div>
            <figure className="plan__img--mask">
              <img src={Pricing} alt="pricing" />
            </figure>
          </div>
        </div>
        <div className="row">
          <div className="container">
            <div className="plan__features--wrapper">
              <div className="plan__features">
                <figure className="plan__features--icon">
                  <FaFileAlt />
                </figure>
                <div className="plan__features--text">
                  <b>Key ideas in few min</b> with many books to read
                </div>
              </div>
              <div className="plan__features">
                <figure className="plan__features--icon">
                  <FaSeedling />
                </figure>
                <div className="plan__features--text">
                  <b>3 million</b> people growing with Summarist everyday
                </div>
              </div>
              <div className="plan__features">
                <figure className="plan__features--icon">
                  <FaHandshake />
                </figure>
                <div className="plan__features--text">
                  <b>Precise recommendations</b> collections curated by experts
                </div>
              </div>
            </div>
            <div className="section__title">Choose the plan that fits you</div>
            {plans.map((plan, idx) => (
              <React.Fragment key={plan.id}>
                <div
                  className={`plan__card${
                    selectedPlan === plan.id ? " plan__card--active" : ""
                  }`}
                  onClick={() => setSelectedPlan(plan.id)}
                  tabIndex={0}
                  role="button"
                  aria-pressed={selectedPlan === plan.id}
                >
                  <div className="plan__card--circle">
                    {selectedPlan === plan.id && (
                      <span className="plan__card--dot" />
                    )}
                  </div>
                  <div className="plan__card--content">
                    <div className="plan__card--title">{plan.title}</div>
                    <div className="plan__card--price">{plan.price}</div>
                    <div className="plan__card--text">{plan.text}</div>
                  </div>
                </div>
                {idx === 0 && (
                  <div className="or-divider">
                    <span className="line"></span>
                    <span className="or-text">or</span>
                    <span className="line"></span>
                  </div>
                )}
              </React.Fragment>
            ))}
            <div className="plan__card--cta">
              <span className="btn--wrapper">
                <button className="btn" onClick={handleUpgrade}>
                  <span>{buttonText}</span>
                </button>
              </span>
              <div className="plan__disclaimer">{disclaimerText}</div>
            </div>

            <div className="faq__wrapper">
              {faqs.map((faq, idx) => (
                <div className="accordion__card" key={faq.question}>
                  <div
                    className="accordion__header"
                    onClick={() => setOpenIdx(idx === openIdx ? null : idx)}
                  >
                    <div className="accordion__title">{faq.question}</div>
                    <FaChevronDown
                      className={`accordion__icon${
                        openIdx === idx ? " accordion__icon--rotate" : ""
                      }`}
                    />
                  </div>
                  <div className={`collapse${openIdx === idx ? " show" : ""}`}>
                    <div className="accordion__body">{faq.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <section id="footer">
          <div className="container">
            <div className="row">
              <div className="footer__top--wrapper">
                <div className="footer__block">
                  <div className="footer__link--title">Actions</div>
                  <div>
                    <div className="footer__link--wrapper">
                      <a className="footer__link">Summarist Magazine</a>
                    </div>
                    <div className="footer__link--wrapper">
                      <a className="footer__link">Cancel Subscription</a>
                    </div>
                    <div className="footer__link--wrapper">
                      <a className="footer__link">Help</a>
                    </div>
                    <div className="footer__link--wrapper">
                      <a className="footer__link">Contact Us</a>
                    </div>
                  </div>
                </div>
                <div className="footer__block">
                  <div className="footer__link--title">Useful Links</div>
                  <div>
                    <div className="footer__link--wrapper">
                      <a className="footer__link">Pricing</a>
                    </div>
                    <div className="footer__link--wrapper">
                      <a className="footer__link">Summarist Business</a>
                    </div>
                    <div className="footer__link--wrapper">
                      <a className="footer__link">Gift Cards</a>
                    </div>
                    <div className="footer__link--wrapper">
                      <a className="footer__link">Authors & Publishers</a>
                    </div>
                  </div>
                </div>
                <div className="footer__block">
                  <div className="footer__link--title">Company</div>
                  <div>
                    <div className="footer__link--wrapper">
                      <a className="footer__link">About</a>
                    </div>
                    <div className="footer__link--wrapper">
                      <a className="footer__link">Careers</a>
                    </div>
                    <div className="footer__link--wrapper">
                      <a className="footer__link">Partners</a>
                    </div>
                    <div className="footer__link--wrapper">
                      <a className="footer__link">Code of Conduct</a>
                    </div>
                  </div>
                </div>
                <div className="footer__block">
                  <div className="footer__link--title">Other</div>
                  <div>
                    <div className="footer__link--wrapper">
                      <a className="footer__link">Sitemap</a>
                    </div>
                    <div className="footer__link--wrapper">
                      <a className="footer__link">Legal Notice</a>
                    </div>
                    <div className="footer__link--wrapper">
                      <a className="footer__link">Terms of Service</a>
                    </div>
                    <div className="footer__link--wrapper">
                      <a className="footer__link">Privacy Policies</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="footer__copyright--wrapper">
                <div className="footer__copyright">
                  Copyright &copy; 2023 Summarist
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ChoosePlan;
