const Post = require('../models/Post');
const User = require('../models/User');

const postRequest = async(req,res) => {
    const { topic, description, postedBy } = req.body;

    try{
        const user = await User.findById(req.user._id);
        // console.log(user);
        if(!user) return res.status(200).json({ message: 'no user found', user: null});
        let post = new Post({topic, description, postedBy });
        console.log(post);
        await post.save();

        return res.status(200).json({ message: 'Post added successfully', post });
    } catch(e) {
        return res.status(400).json({ message : 'error while posting', post : null });
    }
}

module.exports = { postRequest };