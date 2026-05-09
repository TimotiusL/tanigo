import { motion } from "framer-motion";
import logo from "../assets/tanigo-logo.png";

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 z-[999] bg-base-100 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1,
        }}
        className="flex flex-col items-center"
      >
        <img src={logo} alt="TaniGo Logo" className="w-48 object-contain" />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{
            delay: 0.5,
          }}
          className="mt-5 text-base-content/60 text-sm tracking-wide"
        >
          Smart Farming Assistant
        </motion.p>
      </motion.div>
    </div>
  );
}
