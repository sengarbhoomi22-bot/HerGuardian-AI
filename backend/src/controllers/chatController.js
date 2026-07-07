import Chat from '../models/Chat.js';

export const getChat = async (req, res, next) => {
  try {
    let chat = await Chat.findOne({ user: req.user._id });
    if (!chat) {
      chat = { messages: [] };
    }
    res.status(200).json({ success: true, messages: chat.messages || [] });
  } catch (error) {
    next(error);
  }
};

export const saveMessage = async (req, res, next) => {
  try {
    const { id, role, content } = req.body;

    if (!id || !role || !content) {
      return res.status(400).json({ success: false, message: 'Message data is required' });
    }

    let chat = await Chat.findOne({ user: req.user._id });
    if (!chat) {
      chat = new Chat({ user: req.user._id, messages: [] });
    }

    chat.messages.push({
      id,
      role,
      content,
      timestamp: new Date(),
    });

    await chat.save();

    res.status(201).json({ success: true, message: { id, role, content } });
  } catch (error) {
    next(error);
  }
};

export const clearChat = async (req, res, next) => {
  try {
    await Chat.findOneAndDelete({ user: req.user._id });
    res.status(200).json({ success: true, message: 'Chat cleared' });
  } catch (error) {
    next(error);
  }
};

export const deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params;

    const chat = await Chat.findOne({ user: req.user._id });
    if (!chat) {
      return res.status(404).json({ success: false, message: 'Chat not found' });
    }

    chat.messages = chat.messages.filter((msg) => msg.id !== id);

    if (chat.messages.length === 0) {
      await Chat.findOneAndDelete({ user: req.user._id });
    } else {
      await chat.save();
    }

    res.status(200).json({ success: true, message: 'Message deleted' });
  } catch (error) {
    next(error);
  }
};
