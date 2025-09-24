import mongoose, { Document, Schema } from 'mongoose';

export interface TaskSkill {
  skill: mongoose.Types.ObjectId;
  required: number;
  reward: number;
}

export interface ITaskSkill extends Document {
  _id: Schema.Types.ObjectId;
  skill: mongoose.Types.ObjectId;
  required: number;
  reward: number;
}

export interface Task {
  name: string;
  description: string;
  requiredLevel: number;
  experience: number;
  coins: number;
  skill: TaskSkill;
  achievement?: mongoose.Types.ObjectId;
}

export interface ITask extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  description: string;
  requiredLevel: number;
  experience: number;
  coins: number;
  skill: TaskSkill;
  achievement?: mongoose.Types.ObjectId;
}

const TaskSkillSchema = new mongoose.Schema<ITaskSkill>({
  skill: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true },
  required: { type: Number, required: true },
  reward: { type: Number, required: true }
})

const TaskSchema = new mongoose.Schema<ITask>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  requiredLevel: { type: Number, required: true },
  experience: { type: Number, required: true },
  coins: { type: Number, required: true },
  skill: TaskSkillSchema,
  achievement: { type: mongoose.Schema.Types.ObjectId, ref: 'Achiement', required: false },
});

export default mongoose.models.Task || mongoose.model<ITask>('Task', TaskSchema);
