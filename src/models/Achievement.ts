import mongoose, { Document, Schema } from 'mongoose';

import { Rarity } from '@/shared/types';

export interface Achievement {
  icon: string;
  name: string;
  description: string;
  rarity: Rarity;
}

export interface IAchievement extends Document {
  _id: Schema.Types.ObjectId;
  icon: string;
  name: string;
  description: string;
  rarity: Rarity;
}

const AchievementSchema = new mongoose.Schema<IAchievement>({
  icon: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  description: { type: String, required: false  },
  rarity: { type: String, enum: Object.values(Rarity), default: Rarity.Common}
});

export default mongoose.models.Achievement || mongoose.model<IAchievement>('Achievement', AchievementSchema);
