import React from "react";
import { motion } from "framer-motion";
import { RiTwitterXFill } from "react-icons/ri";

interface TwitterCardProps {
  username: string;
  name: string;
  profileImage: string;
  tweet: string;
  organization: string;
}

const TwitterCard: React.FC<TwitterCardProps> = ({
  username,
  name,
  profileImage,
  tweet,
  organization,
}) => {
  return (
    <motion.div

      className="p-6 md:p-8 bg-[#282829] dark:bg-customDark rounded-lg shadow-md w-75 max-w-md lg:w-[30vw]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
     
      <div className="flex items-center justify-between mb-4">
       
        <div className="flex items-center">
          <motion.img
            src={profileImage}
            alt={name}
            className="w-12 h-12 rounded-full"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <div className="ml-3"> 
            <div className="flex flex-col items-start">
             
              <p className="font-bold text-lg text-gray-900 dark:text-white">
                @{username}
              </p>
              <p className="text-gray-600 text-xs dark:text-gray-400">
                {organization}
              </p>
            </div>
          </div>
        </div>

        
        <div>
          <RiTwitterXFill className="h-6 w-6 text-gray-900 dark:text-gray-300" />
        </div>
      </div>

     
      <p className="text-base md:text-lg font-medium text-gray-900 dark:text-white wrap-break-words">
        {tweet}
      </p>
    </motion.div>
  );
};

export default TwitterCard;