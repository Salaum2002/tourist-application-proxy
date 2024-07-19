import Comment from '../models/comment.js'; // Ensure this path is correct

const postComment = async (req, res) => {
  const { username, commentText } = req.body;

  if (!username || !commentText) {
    return res.status(400).send({ msg: "Username and comment text are required." });
  }

  const newComment = new Comment({
    username,
    commentText,
  });

  try {
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    console.error("Error saving comment: ", error);
    res.status(500).send({ msg: "Server error" });
  }
};

const getComments = async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error retrieving comments: ", error);
    res.status(500).send({ msg: "Server error" });
  }
};

export { postComment, getComments };
