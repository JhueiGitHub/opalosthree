'use client'

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch } from '@/redux/store';
import { 
  closeWindow, 
  focusWindow, 
  minimizeWindow, 
  maximizeWindow, 
  moveWindow, 
  resizeWindow,
  restoreWindow,
  snapWindowLeft,
  snapWindowRight,
  snapWindowTop,
  snapWindowBottom,
  snapWindowTopLeft,
  snapWindowTopRight,
  snapWindowBottomLeft,
  snapWindowBottomRight
} from '@/redux/slices/windows';
import { cn } from '@/lib/utils';
import { 
  ChevronUp, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  Maximize2, 
  Minimize2,
  CornerRightDown,
  CornerRightUp,
  CornerLeftDown,
  CornerLeftUp
} from 'lucide-react';

interface WindowProps {
  id: string;
  title: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  isMaximized: boolean;
  isActive: boolean;
  children: React.ReactNode;
  layout?: string;
}

const Window = ({
  id,
  title,
  position,
  size,
  zIndex,
  isMaximized,
  isActive,
  children,
  layout = 'floating'
}: WindowProps) => {
  const dispatch = useAppDispatch();
  const windowRef = useRef<HTMLDivElement>(null);
  const titleBarRef = useRef<HTMLDivElement>(null);
  
  // State for dragging
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
  // State for resizing
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState('');
  const [resizeStartPosition, setResizeStartPosition] = useState({ x: 0, y: 0 });
  const [resizeStartSize, setResizeStartSize] = useState({ width: 0, height: 0 });

  // Handle window click/focus
  const handleWindowClick = () => {
    dispatch(focusWindow(id));
  };

  // Handle title bar mouse down for dragging
  const handleTitleBarMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return;

    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  // Handle resize mouse down
  const handleResizeMouseDown = (direction: string, e: React.MouseEvent) => {
    if (isMaximized) return;
    
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
    setResizeStartPosition({ x: e.clientX, y: e.clientY });
    setResizeStartSize(size);
  };

  // Mouse move and mouse up event handlers for dragging and resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        dispatch(moveWindow({
          id,
          position: {
            x: Math.max(0, e.clientX - dragOffset.x),
            y: Math.max(32, e.clientY - dragOffset.y) // Account for menu bar
          }
        }));
      } else if (isResizing) {
        const deltaX = e.clientX - resizeStartPosition.x;
        const deltaY = e.clientY - resizeStartPosition.y;
        
        let newWidth = resizeStartSize.width;
        let newHeight = resizeStartSize.height;
        let newX = position.x;
        let newY = position.y;
        
        // Handle different resize directions
        if (resizeDirection.includes('e')) {
          newWidth = Math.max(300, resizeStartSize.width + deltaX);
        }
        if (resizeDirection.includes('w')) {
          const proposedWidth = Math.max(300, resizeStartSize.width - deltaX);
          if (proposedWidth !== resizeStartSize.width) {
            newWidth = proposedWidth;
            newX = Math.min(window.innerWidth - 300, position.x + deltaX);
          }
        }
        if (resizeDirection.includes('s')) {
          newHeight = Math.max(200, resizeStartSize.height + deltaY);
        }
        if (resizeDirection.includes('n')) {
          const proposedHeight = Math.max(200, resizeStartSize.height - deltaY);
          if (proposedHeight !== resizeStartSize.height) {
            newHeight = proposedHeight;
            newY = Math.min(window.innerHeight - 200, Math.max(32, position.y + deltaY));
          }
        }
        
        // Update window size
        dispatch(resizeWindow({
          id,
          size: { width: newWidth, height: newHeight }
        }));
        
        // Update position for n and w directions
        if (resizeDirection.includes('n') || resizeDirection.includes('w')) {
          dispatch(moveWindow({
            id,
            position: { x: newX, y: newY }
          }));
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [
    isDragging, 
    isResizing, 
    id, 
    dispatch, 
    dragOffset, 
    position, 
    resizeDirection, 
    resizeStartPosition, 
    resizeStartSize
  ]);

  // Window control handlers
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(closeWindow(id));
  };

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(minimizeWindow(id));
  };

  const handleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(maximizeWindow(id));
  };
  
  const handleRestore = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(restoreWindow(id));
  };

  // Window snapping handlers
  const handleSnapLeft = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(snapWindowLeft(id));
  };

  const handleSnapRight = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(snapWindowRight(id));
  };

  const handleSnapTop = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(snapWindowTop(id));
  };

  const handleSnapBottom = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(snapWindowBottom(id));
  };

  const handleSnapTopLeft = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(snapWindowTopLeft(id));
  };

  const handleSnapTopRight = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(snapWindowTopRight(id));
  };

  const handleSnapBottomLeft = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(snapWindowBottomLeft(id));
  };

  const handleSnapBottomRight = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(snapWindowBottomRight(id));
  };

  // Determine window style based on state
  const getWindowStyle = (): React.CSSProperties => {
    if (isMaximized) {
      return {
        top: 32, // Leave space for menu bar
        left: 0,
        width: '100%',
        height: 'calc(100% - 32px)', // Subtract menu bar height
        borderRadius: 0,
        transform: 'none',
        zIndex,
      };
    }

    return {
      top: position.y,
      left: position.x,
      width: size.width,
      height: size.height,
      zIndex,
    };
  };

  // Get button class for snap buttons
  const getSnapButtonClass = (snapLayout: string) => {
    return cn(
      "w-6 h-6 flex items-center justify-center transition-colors",
      layout === snapLayout
        ? "text-white opacity-100"
        : "text-white opacity-50 hover:opacity-80"
    );
  };

  // Window animation variants
  const windowVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9,
      transition: { duration: 0.15 }
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 25 
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      transition: { duration: 0.15 }
    }
  };

  return (
    <motion.div
      ref={windowRef}
      className={cn(
        "fixed bg-black bg-opacity-30 backdrop-blur-md border-[0.5px] border-white/10 shadow-xl overflow-hidden pointer-events-auto",
        isMaximized ? "rounded-none" : "rounded-lg",
        isActive ? "ring-1 ring-white/20" : ""
      )}
      style={getWindowStyle()}
      onClick={handleWindowClick}
      animate="visible"
      initial="hidden"
      exit="exit"
      variants={windowVariants}
      layoutId={`window-${id}`}
    >
      {/* Window title bar */}
      <div
        ref={titleBarRef}
        className={cn(
          "h-10 flex items-center justify-between px-3 cursor-move",
          isActive ? "bg-black/60" : "bg-black/40"
        )}
        onMouseDown={handleTitleBarMouseDown}
        onDoubleClick={handleMaximize}
      >
        {/* Left: Window controls */}
        <div className="flex space-x-2">
          <button
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
            onClick={handleClose}
          />
          <button
            className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"
            onClick={handleMinimize}
          />
          <button
            className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"
            onClick={isMaximized ? handleRestore : handleMaximize}
          />
        </div>
        
        {/* Center: Window title */}
        <div className="absolute inset-x-0 flex justify-center pointer-events-none">
          <h2 className="text-xs font-medium text-white/70 truncate max-w-[60%]">
            {title}
          </h2>
        </div>
        
        {/* Right: Snap controls */}
        <div className="flex items-center space-x-1">
          {/* Half-window snap controls */}
          <div className="flex space-x-1 mr-1">
            <button
              className={getSnapButtonClass('snap-left')}
              onClick={handleSnapLeft}
              title="Snap to left half"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              className={getSnapButtonClass('snap-right')}
              onClick={handleSnapRight}
              title="Snap to right half"
            >
              <ChevronRight size={14} />
            </button>
            <button
              className={getSnapButtonClass('snap-top')}
              onClick={handleSnapTop}
              title="Snap to top half"
            >
              <ChevronUp size={14} />
            </button>
            <button
              className={getSnapButtonClass('snap-bottom')}
              onClick={handleSnapBottom}
              title="Snap to bottom half"
            >
              <ChevronDown size={14} />
            </button>
          </div>

          {/* Quarter-window snap controls */}
          <div className="flex space-x-1">
            <button
              className={getSnapButtonClass('snap-top-left')}
              onClick={handleSnapTopLeft}
              title="Snap to top-left quarter"
            >
              <CornerLeftUp size={14} />
            </button>
            <button
              className={getSnapButtonClass('snap-top-right')}
              onClick={handleSnapTopRight}
              title="Snap to top-right quarter"
            >
              <CornerRightUp size={14} />
            </button>
            <button
              className={getSnapButtonClass('snap-bottom-left')}
              onClick={handleSnapBottomLeft}
              title="Snap to bottom-left quarter"
            >
              <CornerLeftDown size={14} />
            </button>
            <button
              className={getSnapButtonClass('snap-bottom-right')}
              onClick={handleSnapBottomRight}
              title="Snap to bottom-right quarter"
            >
              <CornerRightDown size={14} />
            </button>
          </div>
          
          {/* Maximize/Restore button */}
          <button
            className="w-6 h-6 flex items-center justify-center ml-1 text-white opacity-70 hover:opacity-100 transition-colors"
            onClick={isMaximized ? handleRestore : handleMaximize}
            title={isMaximized ? "Restore window" : "Maximize window"}
          >
            {isMaximized ? (
              <Minimize2 size={14} />
            ) : (
              <Maximize2 size={14} />
            )}
          </button>
        </div>
      </div>
      
      {/* Window content */}
      <div className="h-[calc(100%-40px)] overflow-auto">
        {children}
      </div>
      
      {/* Resize handles - only visible when not maximized */}
      {!isMaximized && (
        <>
          <div
            className="absolute top-0 left-0 w-3 h-3 cursor-nwse-resize z-20"
            onMouseDown={(e) => handleResizeMouseDown('nw', e)}
          />
          <div
            className="absolute top-0 right-0 w-3 h-3 cursor-nesw-resize z-20"
            onMouseDown={(e) => handleResizeMouseDown('ne', e)}
          />
          <div
            className="absolute bottom-0 left-0 w-3 h-3 cursor-nesw-resize z-20"
            onMouseDown={(e) => handleResizeMouseDown('sw', e)}
          />
          <div
            className="absolute bottom-0 right-0 w-3 h-3 cursor-nwse-resize z-20"
            onMouseDown={(e) => handleResizeMouseDown('se', e)}
          />
          <div
            className="absolute top-0 left-4 right-4 h-2 cursor-ns-resize z-20"
            onMouseDown={(e) => handleResizeMouseDown('n', e)}
          />
          <div
            className="absolute bottom-0 left-4 right-4 h-2 cursor-ns-resize z-20"
            onMouseDown={(e) => handleResizeMouseDown('s', e)}
          />
          <div
            className="absolute left-0 top-10 bottom-4 w-2 cursor-ew-resize z-20"
            onMouseDown={(e) => handleResizeMouseDown('w', e)}
          />
          <div
            className="absolute right-0 top-10 bottom-4 w-2 cursor-ew-resize z-20"
            onMouseDown={(e) => handleResizeMouseDown('e', e)}
          />
        </>
      )}
    </motion.div>
  );
};

export default Window;