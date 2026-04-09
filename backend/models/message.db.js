const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: String, 
      required: true
    },
    senderType: {
      type: String,
      enum: ["teacher", "student"],
      required: true
    },

    receiverId: {
      type: String,
      required: true
    },
    receiverType: {
      type: String,
      enum: ["teacher", "student"],
      required: true
    },

    message: {
      type: String,
      required: true,
      trim: true
    },

    delivered: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const messageModel = mongoose.model("messages", messageSchema);

module.exports = messageModel;