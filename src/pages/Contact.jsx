import React, { useEffect, useRef, useState } from "react";
import LocationSection from "../components/LocationSection";
import CTC from "../components/CTC";
import { supabase } from "../supabase";

const useScrollReveal = () => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
};

const Contact = () => {
    
        const heroRef = useScrollReveal();
        const formRef = useScrollReveal();
        const infoRef = useScrollReveal();
        const whyRef = useScrollReveal();

    const [submitted, setSubmitted] = useState(false);

    // Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.from("contact_messages").insert([
            {
            full_name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            subject: formData.subject,
            message: formData.message,
            },
        ]);

        setLoading(false);

        if (!error) {
            setSubmitted(true);
            setFormData({
            fullName: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
            });

            // auto hide success after 6 sec
            setTimeout(() => setSubmitted(false), 6000);
        } else {
            console.error(error);
            alert("Failed to send message. Please try again.");
        }
        };


    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // LIVE validation
        if (name === "email") {
            setErrors((prev) => ({
            ...prev,
            email:
                value === ""
                ? ""
                : validateEmail(value)
                ? ""
                : "Please enter a valid email address",
            }));
        }

        if (name === "phone") {
            setErrors((prev) => ({
            ...prev,
            phone:
                value === ""
                ? ""
                : validatePhone(value)
                ? ""
                : "Please enter a valid 10-digit mobile number",
            }));
        }
    };

    const [errors, setErrors] = useState({
    email: "",
    phone: "",
    });
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePhone = (phone) => {
        if (!phone) return true; // optional field
        const regex = /^[6-9]\d{9}$/; // Indian mobile number
        return regex.test(phone);
    };

    return (
        <>
        <section
            className="
                relative
                min-h-[85vh] md:min-h-[100vh]
                flex items-center
                overflow-hidden
            "
            style={{
                backgroundImage:
                "url('c886ab74654425.5c3637472caaf.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
            >
            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>

            {/* CONTENT */}
            <div className="relative z-10 w-full">
                <div
                className="
                    max-w-7xl mx-auto
                    px-6
                    py-24 md:py-32
                "
                >
                <div className="max-w-3xl">

                    <p className="text-lime-500 text-xs tracking-[0.35em] uppercase font-bold mb-4">
                    Contact Us
                    </p>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif leading-tight text-white">
                    Let’s Start a  <br />
                    <span className="italic font-light text-white/70">
                        Conversation
                    </span>
                    </h1>

                    <p className="mt-5 md:mt-6 text-white/85 leading-relaxed max-w-xl text-sm sm:text-base">
                    Have a project in mind, a question, or just want to connect?
                    We’re here to help you move forward with clarity.
                    </p>
                    <p className="mt-4 text-sm text-gray-400">
                    We usually respond within 24 hours
                    </p>

                    {/* CTA */}
                    <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-5 sm:gap-6">
                    <a
                        href="/contact"
                        className="
                        bg-lime-500 text-black
                        px-10 py-4
                        rounded-full
                        font-bold uppercase tracking-widest text-xs
                        hover:bg-white transition-all
                        text-center
                        "
                    >
                        Get a Quote
                    </a>

                    <a
                        href="/product"
                        className="
                        border border-white/40 text-white
                        px-10 py-4
                        rounded-full
                        font-bold uppercase tracking-widest text-xs
                        hover:bg-white hover:text-black transition-all
                        text-center
                        "
                    >
                        View Collections
                    </a>
                    </div>

                </div>
                </div>
            </div>
        </section>
        {/* ================= CONTACT FORM ================= */}
      <section
        ref={formRef} 
        className="relative bg-white py-28 overflow-hidden contact-form-section"
      >
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT */}
          <div className="content space-y-6">
            <p className="text-lime-500 text-xs tracking-[0.35em] uppercase font-bold">
              Get In Touch
            </p>

            <h2 className="text-4xl md:text-5xl font-serif leading-tight text-gray-900">
              Tell Us About <br />
              <span className="italic text-neutral-400 font-light">
                Your Project
              </span>
            </h2>

            <p className="text-gray-600 max-w-md">
              Share your requirements and our team will get back to you with
              the right guidance and next steps.
            </p>

            <ul className="space-y-3 text-gray-600 text-sm">
              <li>✔ Response within 24 hours</li>
              <li>✔ Transparent communication</li>
              <li>✔ No obligation discussion</li>
            </ul>
          </div>

          {/* FORM CARD */}
          <div className="relative">
            {submitted ? (
              <div className="success-box">
                <div className="checkmark">✓</div>
                <h3>Thank You for Getting in Touch</h3>
                <p>
                    Your message has been successfully received.
                    Our team will carefully review your requirements and
                    get back to you within <strong>24 hours</strong> with the next steps.
                </p>
                </div>

            ) : (
              <form
                onSubmit={handleSubmit}
                className="form bg-white shadow-2xl rounded-2xl p-10 md:p-14 space-y-8"
                >
                {/* Full Name */}
                <div className="group">
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="input"
                        placeholder=" "
                    />

                    <label className="label">Full Name</label>
                </div>

                {/* Email */}
                <div className="group">
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={`input ${
                        errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder=" "
                    />
                    <label className="label">Email Address</label>

                    {errors.email && (
                        <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                    )}
                </div>


                {/* Phone */}
                <div className="group">
                    <input
                        type="tel"
                        name="phone"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={10}
                        value={formData.phone}
                        onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, ""); // remove non-digits

                        if (value.length <= 10) {
                            setFormData((prev) => ({
                            ...prev,
                            phone: value,
                            }));
                        }
                        }}
                        className={`input ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder=" "
                    />

                    <label className="label">Phone</label>

                    {errors.phone && (
                        <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                    )}
                    </div>



                {/* Subject / Service */}
                <div className="group">
                <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    data-empty={formData.subject === "" ? "true" : "false"}
                    className="input select-field custom-select"
                    >
                    <option value="" disabled hidden></option>
                    <option value="general">General Inquiry</option>
                    <option value="consultation">Product Consultation</option>
                    <option value="project">Project Discussion</option>
                    <option value="pricing">Pricing Request</option>
                    <option value="other">Other</option>
                    </select>


                <label className="label">Subject / Service</label>
                </div>



                {/* Message */}
                <div className="group">
                    <textarea
                        rows="4"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="input resize-none"
                        placeholder=" "
                    ></textarea>

                    <label className="label">Message</label>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="
                        w-full bg-lime-500 text-black
                        py-4 rounded-full
                        font-bold uppercase tracking-widest text-xs
                        hover:bg-black hover:text-white
                        transition-all
                        disabled:opacity-60
                    "
                    >
                    {loading ? "Sending..." : "Send Message"}
                </button>

                </form>

            )}
          </div>
        </div>
      </section>
      {/* ================= CONTACT INFO ================= */}
        <section
            ref={infoRef}
            className="relative bg-neutral-50 py-24 reveal"
            >
            <div className="max-w-7xl mx-auto px-6">

                {/* HEADER */}
                <div className="max-w-3xl mb-20 header">
                <p className="text-lime-500 text-xs tracking-[0.35em] uppercase font-bold mb-4">
                    Contact Information
                </p>

                <h2 className="text-4xl md:text-5xl font-serif leading-tight text-gray-900">
                    Reach Us <br />
                    <span className="italic text-neutral-400 font-light">
                    Directly
                    </span>
                </h2>

                <p className="mt-6 text-gray-600 max-w-xl leading-relaxed">
                    Prefer direct communication? Visit, call, or email us — our team is
                    always ready to assist you with clarity and care.
                </p>
                </div>

                {/* INFO CARDS */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

                {/* CARD */}
                {[
                    {
                    title: "Visit Us",
                    content: (
                        <>
                        Shivdhara Marble Hub <br />
                        Surat, Gujarat <br />
                        India
                        </>
                    ),
                    },
                    {
                    title: "Call Us",
                    content: (
                        <a href="tel:+919999999999" className="hover:text-lime-500">
                        +91 99999 99999
                        </a>
                    ),
                    },
                    {
                    title: "Email Us",
                    content: (
                        <a
                        href="mailto:info@shivdharamarble.com"
                        className="hover:text-lime-500"
                        >
                        info@shivdharamarble.com
                        </a>
                    ),
                    },
                    {
                    title: "Business Hours",
                    content: (
                        <>
                        Mon – Sat <br />
                        9:00 AM – 7:00 PM
                        </>
                    ),
                    },
                ].map((item, i) => (
                    <div
                    key={i}
                    className={`group relative overflow-hidden rounded-2xl bg-white p-8 shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-xl card card-${i + 1}`}
                    >
                    {/* HOVER ACCENT */}
                    <span
                        className="
                        absolute inset-0 rounded-2xl
                        bg-gradient-to-br from-lime-400/15 to-transparent
                        opacity-0 group-hover:opacity-100
                        transition-opacity duration-500
                        "
                    />

                    {/* CONTENT */}
                    <div className="relative z-10">
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">
                        {item.title}
                        </h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                        {item.content}
                        </p>
                    </div>
                    </div>
                ))}
                </div>
            </div>
            </section>

        <LocationSection />
        <section
            ref={whyRef} 
            className="relative bg-white py-28 why-contact-section"
            >
            <div className="max-w-7xl mx-auto px-6">

                {/* HEADER */}
                <div className="max-w-3xl mb-20 header">
                <p className="text-lime-500 text-xs tracking-[0.35em] uppercase font-bold mb-4">
                    Why Contact Us
                </p>

                <h2 className="text-4xl md:text-5xl font-serif leading-tight text-gray-900">
                    Experience Support <br />
                    <span className="italic font-light text-neutral-400">
                    That Truly Cares
                    </span>
                </h2>

                <p className="mt-6 text-gray-600 max-w-xl leading-relaxed">
                    We don’t just respond — we listen, understand your needs,
                    and guide you with clarity and expertise.
                </p>
                </div>

                {/* CARDS */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">

                {[
                    {
                    title: "Fast Response",
                    desc: "Get a reply within 24 hours with clear next steps."
                    },
                    {
                    title: "Expert Guidance",
                    desc: "Professional advice tailored to your project needs."
                    },
                    {
                    title: "Transparent Communication",
                    desc: "Clear pricing, honest timelines, no hidden surprises."
                    },
                    {
                    title: "No Obligation Discussion",
                    desc: "Talk to us freely — no pressure, no commitment."
                    }
                ].map((item, i) => (
                    <div
                    key={i}
                    className={`
                        group relative overflow-hidden
                        bg-white rounded-2xl
                        p-8 lg:p-10
                        shadow-md
                        transition-all duration-500
                        hover:-translate-y-2 hover:shadow-xl
                        card card-${i + 1}
                    `}
                    >
                    {/* HOVER ACCENT */}
                    <span
                        className="
                        absolute inset-0 rounded-2xl
                        bg-gradient-to-br from-lime-400/15 to-transparent
                        opacity-0 group-hover:opacity-100
                        transition-opacity duration-500
                        "
                    />

                    {/* CONTENT */}
                    <div className="relative z-10">
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">
                        {item.title}
                        </h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                        {item.desc}
                        </p>
                    </div>
                    </div>
                ))}

                </div>

            </div>
        </section>
        <CTC/>
        </>
    );
}

export default Contact;
