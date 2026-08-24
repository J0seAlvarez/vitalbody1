import { motion } from "framer-motion";

const ease = [0.76, 0, 0.24, 1];

export const Reveal = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ y: 40, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 1.1, ease, delay }}
    className={className}
  >
    {children}
  </motion.div>
);
