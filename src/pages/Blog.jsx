import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [likedPosts, setLikedPosts] = useState({});
  const [comments, setComments] = useState({});

  // Fetch posts from backend using Axios
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=6&_page=${page}`);
        if (response.data.length === 0) {
          setHasMore(false);
          return;
        }
        const transformedPosts = response.data.map(post => ({
          id: post.id,
          title: post.title,
          excerpt: post.body.substring(0, 100) + '...',
          author: "Anonymous",
          date: new Date().toLocaleDateString(),
          category: "Technology",
          image: `https://picsum.photos/800/400?random=${post.id}`,
          content: post.body
        }));
        setPosts(prevPosts => [...prevPosts, ...transformedPosts]);
      } catch (err) {
        setError("Failed to fetch posts. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || !hasMore) return;
      setPage(prevPage => prevPage + 1);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore]);

  const handlePostSelect = (post) => {
    setSelectedPost(post);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setSelectedPost(null);
  };

  const handleLike = (postId) => {
    setLikedPosts(prevLikedPosts => ({
      ...prevLikedPosts,
      [postId]: !prevLikedPosts[postId]
    }));
  };

  const handleCommentSubmit = (postId, comment) => {
    setComments(prevComments => ({
      ...prevComments,
      [postId]: [...(prevComments[postId] || []), comment]
    }));
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Ad component
  const SidebarAd = () => (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6 border border-blue-100 shadow-sm">
      <div className="text-xs uppercase tracking-wider text-blue-600 font-semibold mb-2">Sponsored</div>
      <div className="h-40 bg-blue-100 flex items-center justify-center mb-4 rounded-lg">
        <img src="https://via.placeholder.com/300x160" alt="Advertisement" className="max-h-full rounded-lg" />
      </div>
      <h4 className="text-lg font-semibold mb-2 text-gray-800">Premium Web Development Courses</h4>
      <p className="text-sm text-gray-600 mb-4">Take your skills to the next level with our expert-led courses</p>
      <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
        Learn More
      </button>
    </div>
  );

  if (loading && page === 1) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {selectedPost ? (
        <div>
          <button
            onClick={handleBack}
            className="mb-6 text-sm text-blue-600 hover:text-blue-700 transition-colors flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Blog
          </button>
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-64 md:h-96 object-cover" />
            <div className="p-6">
              <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">{selectedPost.title}</h1>
              <div className="text-sm text-gray-600 mb-6">
                By <span className="font-semibold">{selectedPost.author}</span> &middot; {selectedPost.date} &middot; <span className="text-blue-600">{selectedPost.category}</span>
              </div>
              <p className="text-gray-700 leading-relaxed">{selectedPost.content}</p>
              <div className="mt-6 flex items-center space-x-4">
                <button
                  onClick={() => handleLike(selectedPost.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    likedPosts[selectedPost.id] ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                  <span>{likedPosts[selectedPost.id] ? 'Liked' : 'Like'}</span>
                </button>
                <button
                  onClick={() => navigator.share({ title: selectedPost.title, url: window.location.href })}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                  </svg>
                  <span>Share</span>
                </button>
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Comments</h3>
                <div className="space-y-4">
                  {(comments[selectedPost.id] || []).map((comment, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700">{comment}</p>
                    </div>
                  ))}
                </div>
                <textarea
                  placeholder="Add a comment..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.target.value.trim()) {
                      handleCommentSubmit(selectedPost.id, e.target.value.trim());
                      e.target.value = '';
                    }
                  }}
                  className="w-full p-3 mt-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 mb-8 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPosts.map(post => (
                <div
                  key={post.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => handlePostSelect(post)}
                >
                  <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-2 text-gray-900">{post.title}</h2>
                    <div className="text-sm text-gray-600 mb-4">
                      By <span className="font-semibold">{post.author}</span> &middot; {post.date} &middot; <span className="text-blue-600">{post.category}</span>
                    </div>
                    <p className="text-gray-700">{post.excerpt}</p>
                  </div>
                </div>
              ))}
            </div>
            {loading && <div className="flex justify-center mt-8">Loading more posts...</div>}
          </div>
          <div className="lg:col-span-1">
            <SidebarAd />
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPage;