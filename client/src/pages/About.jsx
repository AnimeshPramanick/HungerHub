import React from "react";
import { Link } from "react-router-dom";
import {
  FaLeaf,
  FaUtensils,
  FaHeart,
  FaShieldAlt,
  FaAward,
  FaSmile,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Value Card Component
const ValueCard = ({ icon, title, description, delay = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="group"
    >
      <motion.div
        whileHover={{ y: -10 }}
        className="flow-root rounded-xl bg-white px-6 pb-8 pt-12 shadow-md transition-all duration-300 hover:shadow-xl border border-gray-100 hover:border-red-200 relative h-full"
      >
        <div className="absolute top-0 inset-x-0 -translate-y-1/2 flex justify-center">
          <motion.div
            whileHover={{ scale: 1.2, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-red-600 to-orange-500 p-3 shadow-lg ring-2 ring-white group-hover:scale-110 transition-transform duration-200"
          >
            {icon}
          </motion.div>
        </div>
        <motion.h3 className="mt-2 text-lg font-semibold tracking-tight text-gray-900 group-hover:text-red-600 transition-colors duration-300">
          {title}
        </motion.h3>
        <div className="mt-1 h-1 w-10 bg-red-600 rounded-full mx-auto group-hover:w-20 transition-all duration-300"></div>
        <p className="mt-4 text-base text-gray-500">{description}</p>
      </motion.div>
    </motion.div>
  );
};

// Team Member Component
const TeamMember = ({ image, name, role, description, delay = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="group relative"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className="relative mx-auto h-64 w-64 rounded-2xl overflow-hidden shadow-lg transform transition-transform duration-300 group-hover:-translate-y-2"
      >
        <img className="h-full w-full object-cover" src={image} alt={name} />
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6"
        >
          <div className="flex gap-3 mt-4">
            <motion.a
              whileHover={{ y: -3, color: "#f87171" }}
              transition={{ type: "spring", stiffness: 400 }}
              href="#"
              className="text-white transition-colors"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.a>
            <motion.a
              whileHover={{ y: -3, color: "#f87171" }}
              transition={{ type: "spring", stiffness: 400 }}
              href="#"
              className="text-white transition-colors"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </motion.a>
            <motion.a
              whileHover={{ y: -3, color: "#f87171" }}
              transition={{ type: "spring", stiffness: 400 }}
              href="#"
              className="text-white transition-colors"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772a4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        className="mt-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
      >
        <h3 className="text-xl font-bold text-gray-900">{name}</h3>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "40px" }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: delay + 0.3 }}
          className="mt-1 h-1 bg-red-600 rounded-full mx-auto"
        ></motion.div>
        <p className="mt-2 text-sm font-semibold text-red-600">{role}</p>
        <p className="mt-2 text-sm text-gray-600">{description}</p>
      </motion.div>
    </motion.div>
  );
};

// Story Section Component
const StoryTextSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref}>
      <motion.span
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="inline-block text-sm font-semibold text-red-600 uppercase tracking-wider"
      >
        Since 2020
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
      >
        Our Story
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={inView ? { opacity: 1, width: "6rem" } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-4 h-1.5 bg-gradient-to-r from-red-600 to-orange-500 rounded-full"
      ></motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-8 text-lg leading-8 text-gray-600"
      >
        <span className="font-semibold text-red-600 hover:text-red-500 transition-colors">
          HungerHub
        </span>{" "}
        was born from a simple idea: everyone deserves access to great food,
        delivered fast and fresh. What started as a small service connecting
        local restaurants with hungry customers has grown into a nationwide
        platform that champions both food quality and customer satisfaction.
      </motion.p>
    </div>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ rating, quote, author, role, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{
        y: -10,
        boxShadow: "0 25px 50px -12px rgba(239, 68, 68, 0.15)",
      }}
      className="relative rounded-2xl bg-white p-8 shadow-lg border border-red-100"
    >
      <div className="absolute top-0 right-0 -mt-4 -mr-4">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 10,
            delay: delay + 0.2,
          }}
          whileHover={{ rotate: 10 }}
          className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-red-600 to-orange-500 text-white text-xl font-bold"
        >
          {rating}
        </motion.div>
      </div>
      <motion.svg
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay + 0.1 }}
        className="h-10 w-10 text-red-400 mb-4"
        fill="currentColor"
        viewBox="0 0 32 32"
      >
        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
      </motion.svg>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay + 0.3 }}
        className="mt-4 text-lg italic font-medium text-gray-700"
      >
        {quote}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay + 0.4 }}
        className="mt-6 flex items-center"
      >
        <div>
          <p className="font-semibold text-gray-900">{author}</p>
          <p className="text-sm text-red-600">{role}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const About = () => {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden pt-14">
        <motion.div
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 -z-10 bg-gradient-to-b from-red-50 to-white"
        ></motion.div>

        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:flex lg:items-center lg:gap-x-10 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0">
            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
            >
              Bringing <span className="text-red-600">Good Food</span> To Your
              Doorstep
            </motion.h1>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "10rem" }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-4 h-1.5 bg-gradient-to-r from-red-600 to-orange-500 rounded-full"
            ></motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 text-lg leading-8 text-gray-600"
            >
              At HungerHub, we're more than just a food delivery service. We're
              your bridge to delightful culinary experiences from local
              restaurants you love, delivered right to your door.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-10 flex items-center gap-x-6"
            >
              <Link
                to="/menu"
                className="rounded-md bg-gradient-to-r from-red-600 to-orange-500 px-6 py-3 text-base font-semibold text-white shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
              >
                Explore Menu
              </Link>
              <Link
                to="/signup"
                className="text-base font-semibold leading-6 text-red-600 hover:text-red-500"
              >
                Sign Up <span aria-hidden="true">→</span>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-16 sm:mt-24 lg:mt-0 lg:flex-1"
          >
            <div className="relative aspect-[4/3] lg:aspect-[16/9]">
              <img
                className="absolute left-0 top-0 w-[40rem] max-w-none rounded-2xl bg-white/5 ring-1 ring-white/10 shadow-2xl"
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                alt="Food from HungerHub"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Our Story section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div>
              <StoryTextSection />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:pr-4"
            >
              <div className="relative overflow-hidden rounded-3xl bg-gray-900 px-6 pb-9 pt-48 sm:px-12 lg:max-w-lg lg:px-8 lg:pb-8 xl:px-10 xl:pb-10">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    className="absolute inset-0 h-full w-full object-cover brightness-125 saturate-0"
                    src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                    alt=""
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-red-600 via-red-600/40"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12 lg:p-8 xl:p-10">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-6 text-xl font-semibold leading-8 text-white"
                  >
                    "Food is not just fuel, it's information. It talks to your
                    DNA and tells it what to do."
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="mt-1 text-base text-red-200"
                  >
                    Our Founding Philosophy
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mission and Values */}
      <div className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block px-3 py-1 text-sm font-semibold text-red-600 bg-red-100 rounded-full"
            >
              Our Passion
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
            >
              Mission & Values
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "8rem" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 h-1.5 bg-gradient-to-r from-red-600 to-orange-500 rounded-full mx-auto"
            ></motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-12"
            >
              <motion.div
                whileHover={{
                  y: -5,
                  boxShadow: "0 25px 50px -12px rgba(217, 70, 70, 0.25)",
                }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-lg p-10 border border-red-100"
              >
                <h3 className="text-2xl font-bold text-gray-900">
                  Our Mission
                </h3>
                <p className="mt-4 text-lg text-gray-600">
                  To connect people with the food they love from their favorite
                  restaurants, delivered fresh and on time, while supporting
                  local businesses and communities.
                </p>
              </motion.div>
            </motion.div>

            <div className="mt-20 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {/* Value Cards Component - Created as reusable component */}
              <ValueCard
                icon={<FaUtensils className="h-6 w-6 text-white" />}
                title="Quality Food"
                description="We partner only with restaurants that meet our strict quality standards, ensuring every meal is delicious and satisfies your cravings."
                delay={0}
              />

              <ValueCard
                icon={<FaHeart className="h-6 w-6 text-white" />}
                title="Community Support"
                description="We champion local restaurants and give back to the communities we serve through various initiatives and partnerships."
                delay={0.1}
              />

              <ValueCard
                icon={<FaLeaf className="h-6 w-6 text-white" />}
                title="Sustainability"
                description="We're committed to eco-friendly packaging and reducing our carbon footprint through innovative solutions and partnerships."
                delay={0.2}
              />

              <ValueCard
                icon={<FaShieldAlt className="h-6 w-6 text-white" />}
                title="Food Safety"
                description="We maintain the highest standards of food safety and hygiene throughout the delivery process for your peace of mind."
                delay={0.3}
              />

              <ValueCard
                icon={<FaAward className="h-6 w-6 text-white" />}
                title="Excellence"
                description="We strive for excellence in every aspect of our service, from app experience to delivery timing and customer support."
                delay={0.4}
              />

              <ValueCard
                icon={<FaSmile className="h-6 w-6 text-white" />}
                title="Customer Happiness"
                description="Your satisfaction is our top priority, and we go above and beyond to ensure a delightful experience with every order."
                delay={0.5}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gradient-to-b from-white to-red-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block px-3 py-1 text-sm font-semibold text-red-600 bg-red-100 rounded-full"
            >
              Our Leadership
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
            >
              Meet Our Team
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-gray-600"
            >
              Passionate food lovers dedicated to bringing the best culinary
              experiences to your doorstep.
            </motion.p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {/* Using our new TeamMember component */}
            <TeamMember
              image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
              name="Michael Johnson"
              role="Founder & CEO"
              description="Former chef turned entrepreneur with a passion for connecting people through food."
              delay={0}
            />

            <TeamMember
              image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
              name="Sarah Williams"
              role="COO"
              description="Operations expert with a background in restaurant management and customer service excellence."
              delay={0.2}
            />

            <TeamMember
              image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
              name="David Chen"
              role="Chief Technology Officer"
              description="Tech visionary behind our seamless ordering and delivery platform."
              delay={0.4}
            />
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gradient-to-b from-white to-red-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block px-3 py-1 text-sm font-semibold text-red-600 bg-red-100 rounded-full"
            >
              Testimonials
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
            >
              What People Say
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-gray-600"
            >
              Don't just take our word for it. Here's what our satisfied
              customers and partners have to say.
            </motion.p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <TestimonialCard
              rating="5.0"
              quote="HungerHub has transformed our restaurant's reach. Their platform brought us new customers and their delivery service is always on time!"
              author="Alex Martinez"
              role="Restaurant Owner"
              delay={0}
            />

            <TestimonialCard
              rating="4.9"
              quote="I use HungerHub at least twice a week. The food is always hot and fresh, and their customer service is exceptional when you need help."
              author="Jenny Rodriguez"
              role="Regular Customer"
              delay={0.2}
            />

            <TestimonialCard
              rating="4.8"
              quote="As someone with dietary restrictions, I appreciate how HungerHub makes it easy to find suitable options with accurate menu information."
              author="Sam Thompson"
              role="Food Blogger"
              delay={0.4}
            />
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-b from-white to-red-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block px-3 py-1 text-sm font-semibold text-red-600 bg-red-100 rounded-full"
            >
              Get In Touch
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
            >
              Contact Us
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-gray-600"
            >
              Have questions or feedback? We'd love to hear from you. Our team
              is ready to assist.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-16 rounded-2xl bg-white shadow-lg border border-red-100 overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 sm:p-12">
                <h3 className="text-2xl font-bold text-gray-900">
                  Send us a message
                </h3>
                <form className="mt-6 space-y-6">
                  <motion.div
                    initial={{ x: -30, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ x: -30, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ x: -30, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                    ></textarea>
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="pt-4"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                      type="submit"
                      className="w-full rounded-md bg-gradient-to-r from-red-600 to-orange-500 px-6 py-3 text-base font-semibold text-white shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                      Send Message
                    </motion.button>
                  </motion.div>
                </form>
              </div>
              <div className="bg-gradient-to-br from-red-500 to-orange-600 p-8 sm:p-12 text-white">
                <h3 className="text-2xl font-bold">Get in touch</h3>
                <p className="mt-4 max-w-xl text-red-100">
                  We'd love to hear from you! Reach out with questions,
                  suggestions, or partnership opportunities.
                </p>
                <motion.ul
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ staggerChildren: 0.1, delayChildren: 0.4 }}
                  className="mt-8 space-y-6"
                >
                  <motion.li
                    initial={{ x: 30, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <div className="flex-shrink-0">
                      <FaMapMarkerAlt className="h-6 w-6 text-red-200" />
                    </div>
                    <div className="ml-3 text-base">
                      <p>123 Food Street, Culinary District</p>
                      <p className="mt-1">Flavor City, FC 12345</p>
                    </div>
                  </motion.li>

                  <motion.li
                    initial={{ x: 30, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <div className="flex-shrink-0">
                      <FaPhoneAlt className="h-6 w-6 text-red-200" />
                    </div>
                    <div className="ml-3 text-base">
                      <p>+1 (555) 123-4567</p>
                      <p className="mt-1">Mon-Fri 9AM to 6PM</p>
                    </div>
                  </motion.li>

                  <motion.li
                    initial={{ x: 30, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <div className="flex-shrink-0">
                      <FaEnvelope className="h-6 w-6 text-red-200" />
                    </div>
                    <div className="ml-3 text-base">
                      <p>support@hungerhub.com</p>
                      <p className="mt-1">For customer support</p>
                    </div>
                  </motion.li>
                </motion.ul>
              </div>
            </div>
          </motion.div>

          <div className="mt-16 flex justify-center">
            <Link
              to="/contact"
              className="rounded-md bg-gradient-to-r from-red-600 to-orange-500 px-8 py-4 text-base font-semibold text-white shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
