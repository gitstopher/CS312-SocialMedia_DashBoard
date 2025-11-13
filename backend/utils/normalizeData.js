// normalizeData.js

/**
 * Normalize posts or activities into a consistent feed format
 * @param {Array} items - Array of posts or activities
 * @param {string} platform - Platform name (facebook, twitter, instagram, activity, etc.)
 * @returns {Array} normalized items
 */
export const normalizeData = (items, platform) => {
  if (!Array.isArray(items)) return [];

  return items.map((item) => {
    // Check if item is an activity (from activities table)
    if (item.source === "activity" || platform === "activity") {
      return {
        id: item.id,
        platform: item.platform || "activity",
        content: item.content,
        type: item.type || "activity",
        timestamp: item.timestamp || item.created_at,
        source: "activity",
      };
    }

    // Normalize social posts
    return {
      id: item.id,
      platform: platform.toLowerCase(),
      content: item.text || item.caption || item.message || "",
      author: item.author || item.name || "unknown",
      timestamp: item.timestamp || item.created_time || item.created_at || Date.now(),
      source: "social",
    };
  });
};
