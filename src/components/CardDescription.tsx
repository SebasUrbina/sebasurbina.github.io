import UserAvatar from "./UserAvatar";
import { motion } from "framer-motion";

type Props = {};

function CardDescription({}: Props) {
  return (
    <motion.div
      className="container mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-2xl mx-auto px-8 py-3 shadow-2xl shadow-blue-800 roun">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex items-center justify-center">
            <UserAvatar size={128} />
          </div>
          <div className="flex flex-col space-y-4">
            <h1 className="text-5xl font-bold">Hey! 🤓</h1>
            <h2 className="text-xl text-text-secondary">
              My name is <b>Sebastián Urbina</b>, Data Scientist & Software
              Engineer
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed">
              Welcome to my personal website. I'm passionate about data science,
              machine learning, and software development. Here you can find my
              projects, achievements, and thoughts on technology.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default CardDescription;
