import * as models from '../models/index.js';
import Validator from 'fastest-validator';

export const index = async (req, res) => {
    try {
        const posts = await models.Post.findall();
        return res.status(200).json({ mesasge: 'Posts successfully fetched', posts });
    } catch (e) {
        return res.status(500).json({ message: 'Error fetching posts' });
    }

}

export const show = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await models.Post.findByKk(id);
        if (!post) return res.status(404).json({ message: 'The post does not exist' })
        return res.status(200).json({ message: 'Post successfully fetched', post });
    } catch (e) {
        return res.status(500).json({ message: 'Error fetching post' });
    }
}

export const store = async (req, res) => {
    // validate 
    const { title, content, imageUrl, categoryId = 1, userId = 1 } = req.body;
    const schema = {
        title: { type: 'string' },
        content: { type: 'text' },
        imageUrl: { type: 'string' },
    }
    const v = new Validator();
    v.validate({ title, content, imageUrl }, schema);

    // store
    try {
        const post = await models.Post.create({ title, content, imageUrl, categoryId, userId });
        return res.staus(201).json({ message: 'Post successfully created', post });
    } catch (e) {
        return res.status(500).json({ message: 'Error storing post' });
    }

}

export const update = async (req, res) => {
    // validate
    const { title, content, imageUrl, categoryId = 1, userId = 1, id } = req.body;
    const schema = {
        title: { type: 'string' },
        content: { type: 'text' },
        imageUrl: { type: 'string' },
    }
    const v = new Validator();
    v.validate({ title, content, imageUrl }, schema);

    // update
    try {
        const post = await models.Post.findByKk(id);
        if (!post) {
            return res.status(404).json({ message: 'Could not find the post you are looking for' });
        }
        const updatePost = await models.Post.update({ title, content, imageUrl, categoryId, where: { id, userId: 1 } })
        if (updatePost < 1) {
            throw new Exception('Error updating Post');
        }
        return res.status(201).json({ message: 'Post sucessfully updated', post });

    } catch (e) {
        return res.status(500).json({ message: 'Error updating post', error: e });
    }
}

export const destroy = async (req, res) => {
    // delete
    const { id } = req.body;
    try {
        const destroy = await models.Post.destrooy({ where: { id } });
        if (destroy < 1) {
            return res.status(500).json({ message: 'Error deleting post' });
        }
        return res.status(201).json({ message: 'Post successfully deleted' });

    } catch (e) {
        return res.status(500).json({ message: 'Error deleting post', error: e });
    }

}