const formidable = require("formidable");
//const _ = require("lodash");
const fs = require("fs");
const Post = require("../models/post");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.postById = (req, res, next, id) => {
    Post.findById(id).populate("author").exec((err, post) => {
        if (err || !post) {
            return res.status(400).json({
                error: "post not found",
            });
        }
        req.post = post;
        next();
    });
};

exports.read = (req, res) => {
    req.post.photo = undefined;
    return res.json(req.post);
};

exports.create = (req, res) => {
	console.log(req.body)
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err)
            return res.status(400).json({
                error: "Image could not be uploaded",
            });
        let post = new Post(fields);

        //1kb - 1000
        //1mb - 1000000

        const { title, description, author } = fields;

        if (!title || !description || !author) {
            return res.status(400).json({
                error: "All fields are required",
            });
        }

        if (files.photo) {
            if (files.photo.size > 1000000)
                return res.status(400).json({
                    error: "Image should be less than 1 MB",
                });
            post.photo.data = fs.readFileSync(files.photo.path);
            post.photo.contentType = files.photo.type;
        }

        post.save((err, result) => {
            if (err)
                return res.status(400).json({
                    error: errorHandler(err),
                });
            res.json(result);
        });
    });
};

exports.remove = (req, res) => {
    let post = req.post;
    post.remove((err, deletedpost) => {
        if (err)
            return res.status(400).json({
                error: errorHandler(err),
            });
        res.json({
            message: "Deleted successfully",
        });
    });
};


exports.list = (req, res) => {
    //since photo size is huge, we are not gonna bring all the photos now, so we deselect photo

    Post.find()
        .select("-photo")
        .populate("author")
        .exec((err, posts) => {
            if (err)
                return res.status(400).json({
                    error: "posts not found",
                });
            res.json(posts);
        });
};


exports.photo = (req, res, next) => {
    if (req.post.photo.data) {
        res.set(("Content-Type", req.post.contentType));
        return res.send(req.post.photo.data);
    }
    next();
};

exports.like = (req, res) =>{
    let post = req.post;
    post.likes += 1;
    //post.photo = undefined;
    post.save((err, result) => {
        if (err)
            return res.status(400).json({
                error: errorHandler(err),
            });
        result.photo = undefined
        res.json(result);
    })
}