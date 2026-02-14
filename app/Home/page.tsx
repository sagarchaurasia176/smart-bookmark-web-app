"use client";

import { motion } from "motion/react";

export default function HeroSection() {
  return (
    <div className="relative mx-auto my-6 sm:my-10 flex max-w-7xl flex-col items-center justify-center px-4">
      <div className="hidden md:block absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="hidden md:block absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="hidden md:block absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="px-2 sm:px-4 py-6 sm:py-10 md:py-20 w-full">
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-xl sm:text-2xl md:text-4xl lg:text-6xl xl:text-7xl font-bold text-slate-700 dark:text-slate-300">
          {"All-In-One Bookmark Manager".split(" ").map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
                ease: "easeInOut",
              }}
              className="mr-2 inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 0.8,
          }}
          className="relative z-10 mx-auto max-w-xl py-3 sm:py-4 text-center text-sm sm:text-base md:text-lg font-normal text-neutral-600 dark:text-neutral-400 px-4"
        >
          Organize, discover, and access your bookmarks intelligently.
        </motion.p>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 1,
          }}
          className="relative z-10 mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-4 px-4"
        >
          <button className="w-full sm:w-60 cursor-pointer transform rounded-lg bg-gradient-to-r from-blue-500 to-green-500 px-4 sm:px-6 py-2.5 sm:py-2 font-medium text-sm sm:text-base text-white transition-all duration-300 hover:-translate-y-0.5 hover:from-blue-600 hover:to-green-600 flex items-center justify-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16l-6.222 6.222a.749.749 0 01-1.06 0L7.432 11.54a.75.75 0 111.061-1.061l2.323 2.323L16.507 7.1a.75.75 0 111.061 1.06z" />
            </svg>
            Download Smart Bookmarks
          </button>
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
            delay: 1.2,
          }}
          className="relative z-10 mt-10 sm:mt-16 md:mt-20 rounded-2xl sm:rounded-3xl border border-neutral-200 bg-neutral-100 p-2 sm:p-3 md:p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900 w-full max-w-5xl mx-auto"
        >
          <div className="w-full overflow-hidden rounded-lg sm:rounded-xl border border-gray-300 dark:border-gray-700">
            <img
              src="https://res.cloudinary.com/dc3mdr2ol/image/upload/v1770974819/gemini-2.5-flash-image_-_make_a_good_template_-_look_attractive_image_to_the_users-0_xkv5lo.jpg"
              alt="Landing page preview"
              className="aspect-[16/9] h-auto w-full object-cover"
              height={1000}
              width={1000}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
