import { User } from "../models/User.js";

export const deleteExpiredUsers = async () => {
  const now = new Date();

  const result = await User.deleteMany({
    isDeleted: true,
    deletionScheduledFor: { $lt: now },
  });

  console.log("Hard deleted users:", result.deletedCount);
};
