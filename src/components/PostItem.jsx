import { Button } from "antd"

import likeIcon from "../assets/icons8-like-16.png";
import likeBlueIcon from "../assets/icons8-like-blue-16.png";

const renderPostImages = (post) => {
    console.log(post.images)
    //check for file
    if (!post.images || post.images.length === 0) return null
    return (
        <div className={`grid gap-1 mt-2 ${post.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`} >
            {post.images.map((imgUrl, index) =>
                <img
                    key={index}
                    src={imgUrl}
                    className="w-full h-48 object-cover rounded-lg"
                    alt="Post image."
                    loading="lazy"
                />
            )}
        </div>
    )
}

const PostItem = ({ post, user, handleLike }) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="flex p-4 gap-2">
                <img src="src/assets/avatar-colorful-48.png" className="w-12 h-12 rounded-full" alt="Profile" />
                <div>
                    <p className="font-semibold text-sm">{post.author?.name}</p>
                    <p className="text-xs text-gray-500">Software Developer | Technical Writer</p>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                        <span>
                            {new Date(post.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </span>
                        <img src="src/assets/earth-black-24.png" className="w-3 h-3" alt="Public" />
                    </div>
                </div>
            </div>
            <div className="px-4 pb-2 text-sm">
                <p>{post.content}</p>
            </div>
            {renderPostImages(post)}
            <div className="flex justify-around border-t border-gray-100 py-1 mt-2">
                <Button
                    type="text"
                    className="font-semibold text-gray-500 flex items-center gap-1"
                    onClick={() => handleLike(post._id, post.likes || [])}
                >
                    <img
                        src={post.likes?.includes(user?._id) ? likeBlueIcon : likeIcon}
                        alt="like"
                        className="w-4 h-4"
                    />
                    <span style={{ color: post.likes?.includes(user?._id) ? '#0a66c2' : 'inherit' }}>
                        Like {post.likes?.length > 0 && post.likes.length}
                    </span>
                </Button>
                <Button type="text" className="font-semibold text-gray-500">Comment</Button>
                <Button type="text" className="font-semibold text-gray-500">Repost</Button>
                <Button type="text" className="font-semibold text-gray-500">Send</Button>
            </div>
        </div>
    )
}

export default PostItem;