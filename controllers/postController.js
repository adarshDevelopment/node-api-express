import category from '../models/category.js';
import * as models from '../models/index.js';
import Validator from 'fastest-validator';

export const index = async (req, res) => {
    console.log('models: ', models);
    try {
        const posts = await models.default.Post.findAll();
        return res.status(200).json({ mesasge: 'Posts successfully fetched', posts });
    } catch (e) {
        return res.status(500).json({ message: 'Error fetching posts' });
    }
}

export const show = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await models.default.Post.findByPk(id);
        if (!post) return res.status(404).json({ message: 'The post does not exist' })
        return res.status(200).json({ message: 'Post successfully fetched', post });
    } catch (e) {
        return res.status(500).json({ message: 'Error fetching post', error: e.message });
    }
}

export const store = async (req, res) => {
    // console.log('user: ', req.user);
    // validate 
    const { title, content, imageUrl, categoryId } = req.body;
    const schema = {
        title: { type: 'string' },
        content: { type: 'string' },
        imageUrl: { type: 'string', optional: false },
    }
    const v = new Validator();
    const errors = v.validate({ title, content, imageUrl }, schema);

    const catId = models.default.Category.findByPk(categoryId);
    if (!catId) {
        return res.staus(400).json({ message: 'Invalid category Id' });
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    // store
    try {
        const post = await models.default.Post.create({ title, content, imageUrl, categoryId, userId: req.user.id });
        return res.status(201).json({ message: 'Post successfully created', post });
    } catch (e) {
        return res.status(500).json({ message: 'Error storing post', error: e.message });
    }
}

export const update = async (req, res) => {
    // validate
    const { title, content, imageUrl, categoryId, id } = req.body;
    const schema = {
        title: { type: 'string' },
        content: { type: 'string' },
        imageUrl: { type: 'string' },
    }
    const v = new Validator();
    const errors = v.validate({ title, content, imageUrl }, schema);
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    const catId = models.default.Category.findByPk(categoryId);
    if (!catId) {
        return res.status(400).json({ message: 'Invalid category Id' })
    }

    console.log('userID: ', req.user.id, ' post id: ', id)
    // update
    try {
        const post = await models.default.Post.findByPk(id);
        if (!post) {
            return res.status(404).json({ message: 'Could not find the post you are looking for' });
        }
        if (post.userId !== req.user.id) {
            return res.status(401).json({ message: 'Unauthorized user' });
        }

        const updatePost = await models.default.Post.update({ title, content, imageUrl, categoryId }, { where: { id, userId: req.user.id } })
        if (updatePost < 1) {
            throw new Error('Error updating Post');
        }
        return res.status(201).json({ message: 'Post sucessfully updated', post });

    } catch (e) {
        return res.status(500).json({ message: 'Error updating post', error: e.message });
    }
}

export const destroy = async (req, res) => {
    // delete
    const { id } = req.body;
    try {
        const post = await models.default.Post.findByPk(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        if (post.userId !== req.user.id) {
            return res.status(401).json({ message: 'Unauthorized user' });
        }
        const destroy = await models.default.Post.destroy({ where: { id } });
        if (destroy < 1) {
            return res.status(500).json({ message: 'Error deleting post' });
        }
        return res.status(201).json({ message: 'Post successfully deleted' });

    } catch (e) {
        return res.status(500).json({ message: 'Error deleting post', error: e.message });
    }

}

// const demo1 = (req, res, next)=>{
//     console.log('middleware execute');
//     next();
// }

// const actualFunc = (req, res)=>{
//     console.log('actual code');
// }

// demo1(req, res, actualFunc);
// demo1(req, res, )