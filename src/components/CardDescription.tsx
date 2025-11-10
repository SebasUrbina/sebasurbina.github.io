import UserAvatar from "./UserAvatar";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

type Props = {};

function CardDescription({}: Props) {
  return (
    <motion.div
      className="container mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto relative">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 dark:from-blue-600/20 dark:via-purple-600/20 dark:to-blue-600/20 rounded-3xl blur-3xl -z-10" />

        {/* Main card */}
        <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar with animated border */}
            <motion.div
              className="relative flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full blur-lg opacity-50 animate-pulse" />
              <div className="relative p-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full">
                <div className="bg-white dark:bg-gray-900 rounded-full p-1">
                  <UserAvatar size={140} />
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <div className="flex flex-col space-y-5 flex-grow text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                  <Sparkles className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                  <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                    ¡Hola! 👋
                  </h1>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h2 className="text-2xl md:text-3xl font-semibold text-text-primary dark:text-white mb-2">
                  I'm{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent font-bold">
                    Sebastián Urbina
                  </span>
                </h2>
                <p className="text-lg md:text-xl text-blue-600 dark:text-blue-400 font-medium mb-4">
                  Machine Learning Engineer / AI Engineer
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <p className="text-base md:text-lg text-text-secondary dark:text-gray-300 leading-relaxed max-w-2xl">
                Welcome to my personal website. I'm passionate about data science,
              machine learning, and software development. Here you can find my
              projects, achievements, and thoughts on technology.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default CardDescription;
