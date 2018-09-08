export const getStoryCopy = (story) => {
    return { 
        story_id: story.story_id,
        title: story.title,
        author: story.author,
        created_at: story.created_at,
        url: story.url
    }
};