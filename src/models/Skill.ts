import mongoose, { Document, Schema } from 'mongoose';

export interface Skill {
  name: string;
  description: string;
}

export interface ISkill extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  description: string;
}

const SkillSchema = new mongoose.Schema<ISkill>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: false  }
});

export default mongoose.models.Skill || mongoose.model<ISkill>('Skill', SkillSchema);
