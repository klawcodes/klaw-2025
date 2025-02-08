import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRandomFlicker } from "../hooks/useRandomFlicker";
import { useEntranceAnimation } from "../hooks/useEntranceAnimation";
import { useTextTransition } from "../hooks/useTextTransition";

export default function BlogList({ posts }) {
  const { generateEntranceVariants, containerVariants } = useEntranceAnimation();
  const showEnglish = useTextTransition(4);

  // Text content untuk judul
  const textContent = {
    title: {
      japanese: "最新の投稿",
      english: "Latest Posts"
    }
  };

  // Sort posts by date
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime()
  );

  // Slice for display
  const displayedBlog = sortedPosts.slice(0, 4);
  
  // Check if has more posts
  const hasMoreBlog = sortedPosts.length > 4;

  return (
    <motion.div 
      className="h-full overflow-auto scrollbar-hide"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <motion.h2 
        className="text-xl font-bold mb-4"
        variants={generateEntranceVariants(0)}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={showEnglish ? "english-title" : "japanese-title"}
            variants={useRandomFlicker(0)()}
            initial="initial"
            animate="animate"
          >
            {showEnglish ? textContent.title.english : textContent.title.japanese}
          </motion.span>
        </AnimatePresence>
      </motion.h2>

      <motion.div 
        className="space-y-1 text-sm"
        variants={generateEntranceVariants(1)}
      >
        {displayedBlog.map((post, index) => (
          <motion.a
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block px-4 py-1 border rounded hover:bg-gray-50"
            variants={generateEntranceVariants(index + 2, {
              distance: 30,
              duration: 0.4,
            })}
          >
            <h3 className="font-medium">{post.data.title}</h3>
            <p className="text-xs text-gray-500">
              {post.data.pubDate.toLocaleDateString()}
            </p>
          </motion.a>
        ))}
        
        {hasMoreBlog && (
          <motion.a
            href="/blog"
            className="block px-4 py-1 border rounded hover:bg-gray-50 text-center"
            variants={generateEntranceVariants(displayedBlog.length + 2)}
          >
            <span className="text-gray-500">Show More</span>
          </motion.a>
        )}
      </motion.div>
    </motion.div>
  );
}