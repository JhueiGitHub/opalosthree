// "use client";

// import { motion, AnimatePresence } from "framer-motion";
// import React from "react";

// type WindowProps = {
//   isOpen: boolean;
//   onClose: () => void;
//   children: React.ReactNode;
// };

// const Window = ({ isOpen, onClose, children }: WindowProps) => {
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           className="fixed inset-0 bg-[#171717] flex flex-col z-40"
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.95 }}
//           transition={{ type: "spring", stiffness: 300, damping: 30 }}
//         >
//           {/* Window Header */}
//           <div className="bg-black text-white p-2 flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <div className="flex space-x-2 ml-2">
//                 <button
//                   onClick={onClose}
//                   className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
//                 />
//                 <button className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors" />
//                 <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors" />
//               </div>
//               <h3 className="text-sm font-medium ml-2">Opal</h3>
//             </div>
//           </div>

//           {/* Window Content */}
//           <div className="flex-1 overflow-hidden">{children}</div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default Window;
