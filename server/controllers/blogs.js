const User = require('../models/User')

const updateBlog = async(req,res)=>{
    try {
        const {blogId,email,title,content} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            const blog = existingUser.blogs.find(blog =>blog.blogId === blogId);
            if(blog){
                blog.title = title.split('\n')[0];
                blog.content = content; 
                blog.updatedAt  = new Date();
                await existingUser.save();
                return res.status(200).send("Blog updated successfully!");
            }
            else{
                existingUser.blogs.push({
                    blogId,
                    title,
                    content
                });
                await existingUser.save();
                return res.status(200).send("Blog updated successfully!");
            }
        }
        return res.status(404).send("User not found!");
    } catch (error) {
        return res.status(400).send(`Error: ${error}`);
    }
}

const getBlogs = async(req,res)=>{
    try {
        const {email} = req.body;
        const data = await User.findOne({email});
        // console.log(data);
        return res.status(200).send(data.blogs);
    } catch (error) {
        return res.status(400).send(`Error: ${error}`); 
    }
}

const updateProfileAndSlug = async(req,res)=>{
    try {
        const {email,fullName,slug,linkedin,twitter,bio} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            existingUser.fullName = fullName;
            existingUser.slug = slug;
            if(linkedin) existingUser.linkedin = linkedin;
            if(twitter) existingUser.twitter = twitter;
            if(bio) existingUser.bio = bio;
            await existingUser.save();
            return res.status(200).send({msg:"Profile updated successfully!",slug:existingUser.slug});
        }
        else{
            return res.status(404).send("User not found!");
        }
    } catch (error) {
        return res.status(400).send(`Error: ${error}`); 
    }
}


module.exports = {updateBlog,getBlogs,updateProfileAndSlug};