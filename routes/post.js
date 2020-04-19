const express = require("express");
const router = express.Router();

const {
    create,
    postById,
    read,
    remove,
    list,
    photo,
    like,
    makePost
} = require("../controllers/post");
const { requireSignin, isAuth } = require("../controllers/auth");

const { userById } = require("../controllers/auth");

//CRUD operations
router.get("/post/:postId", read);
router.post("/posts/create/:userId", requireSignin, isAuth,makePost);
router.put("/post/like/:postId/:userId", requireSignin, isAuth, like);

router.delete(
    "/post/:postId/:userId",
    requireSignin,
    isAuth,
    remove
);

//post list
router.get("/posts", list);
router.get("/posts/photo/:postId", photo);

router.param("userId", userById);
router.param("postId", postById);

module.exports = router;
