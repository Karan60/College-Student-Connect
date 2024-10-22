import User from "../model/user.js";

export const signupuser = async (request, response) => {
  try {
    const { name, username, password } = request.body;

    if (!name || !username || !password) {
      return response.status(400).json({ msg: "All fields are required." });
    }

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return response.status(400).json({
        msg: "Username already exists. Please choose a different one.",
      });
    }

    const newUser = new User({ name, username, password });

    await newUser.save();

    return response.status(201).json({ msg: "Signup successful!" });
  } catch (error) {
    console.error("Signup error:", error);
    return response
      .status(500)
      .json({ msg: "Error while signing up the user." });
  }
};
