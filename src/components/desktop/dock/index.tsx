// "use client";

// import { motion } from "framer-motion";
// import Image from "next/image";
// import React from "react";

// type DockProps = {
//   onOpenApp: () => void;
// };

// const Dock = ({ onOpenApp }: DockProps) => {
//   return (
//     <motion.div
//       className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex items-end gap-4 px-6 py-3 rounded-3xl bg-black/30 backdrop-blur-lg z-50 border border-white/10"
//       initial={{ y: 100, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ type: "spring", stiffness: 300, damping: 25 }}
//     >
//       <DockItem icon="/system/stallion.png" label="Opal" onClick={onOpenApp} />
//     </motion.div>
//   );
// };

// interface DockItemProps {
//   icon: string;
//   label: string;
//   onClick: () => void;
// }

// const DockItem = ({ icon, label, onClick }: DockItemProps) => {
//   return (
//     <motion.div
//       className="flex flex-col items-center group relative cursor-pointer"
//       whileHover={{ scale: 1.2, y: -10 }}
//       whileTap={{ scale: 0.95 }}
//       onClick={onClick}
//     >
//       <motion.div className="w-16 h-16 rounded-xl overflow-hidden bg-white/10 backdrop-blur-md shadow-lg flex items-center justify-center">
//         <Image src={icon} alt={label} width={48} height={48} />
//       </motion.div>
//       <motion.span className="absolute -bottom-8 px-2 py-1 bg-black/70 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
//         {label}
//       </motion.span>
//     </motion.div>
//   );
// };

// export default Dock;
